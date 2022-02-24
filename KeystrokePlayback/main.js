var errorWidget = document.getElementById('compileError');
errorWidget.style.visibility = 'hidden';
var loadingWidget = document.getElementById('loading');
loadingWidget.style.visibility = 'hidden';

var subjectsWidget = document.getElementById('subjects');
var assignmentsWidget = document.getElementById('assignments');
var filesWidget = document.getElementById('files');

var table = document.getElementById('table');
var slider = document.getElementById('slider');
var editNumWidget = document.getElementById('edit-num');
var eventNumWidget = null;//document.getElementById('event-num');
var textarea = document.getElementById('textarea');
editNumWidget.innerHTML = slider.value; // Display the default slider value

var findStringWidget = document.getElementById('findString');


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Read files in chunks of 16 Mb
const CHUNK_SIZE = 2**24;

function ps2Changed(event) {
  const fileList = event.target.files;
  if (fileList.length > 0) {
    const file = fileList[0];
    if (file.size < CHUNK_SIZE) {
      readFileFull(file, '');
    } else {
      readFilePartial(file, '');
    }
  }
}

function incFile(inc) {
  if (inc == 1) {
    if (filesWidget.selectedIndex < filesWidget.options.length-1) {
      filesWidget.selectedIndex += 1;
      fileChanged();
    } else if (assignmentsWidget.selectedIndex < assignmentsWidget.options.length-1) {
      assignmentsWidget.selectedIndex += 1;
      assignmentChanged();
    } else if (subjectsWidget.selectedIndex < subjectsWidget.options.length-1) {
      subjectsWidget.selectedIndex += 1;
      subjectChanged();
    } else {
      return false;
    }
  } else {
    if (filesWidget.selectedIndex > 0) {
      filesWidget.selectedIndex -= 1;
      fileChanged();
    } else if (assignmentsWidget.selectedIndex > 0) {
      assignmentsWidget.selectedIndex -= 1;
      assignmentChanged();
    } else if (subjectsWidget.selectedIndex > 0) {
      subjectsWidget.selectedIndex -= 1;
      subjectChanged();
    } else {
      return false;
    }
  }
  return true;
}

let controlKey = false;
function onload() {
  // let msg = document.getDocumentById('#message');

  document.addEventListener("keydown", (event) => {
    // console.log(event.key);

    if (event.key == 'ArrowRight') {
      let i = findString(findStringWidget.value);
      if (i > -1) {
        slider.value = i;
        sliderChanged(slider);
        return;
      }
    }    
  });
  document.addEventListener("keyup", (event) => {
  });
  document.addEventListener("keypress", (event) => {
    // console.log(event.key);

    let inc = 'f'
    let dec = 'd'
    let inc10 = 'F'
    let dec10 = 'D'
    let incCheck = 'g'
    let decCheck = 's'
    
    if (event.key == incCheck) {
      if (slider.value == slider.max) {
        if (incFile(1)) {
          slider.value = 0;
          sliderChanged(slider);
        }
      } else {
        slider.value = getNextCheckpoint();
        sliderChanged(slider);
      }
    } else if (event.key == decCheck) {
      if (slider.value == 0) {
        incFile(-1);
      } else {
        slider.value = getPrevCheckpoint();
        sliderChanged(slider);
      }
    } else if (event.key == 'j') {
      incFile(1);
    } else if (event.key == 'k') {
      incFile(0);
    } else if (event.key == 'a') {
      slider.value = 0;
      sliderChanged(slider);
    } else if (event.key == 'e') {
      slider.value = slider.max;
      sliderChanged(slider);
    } else if (event.key == dec) {
      slider.value = +slider.value - 1;
      sliderChanged(slider);
    } else if (event.key == inc) {
      slider.value = +slider.value + 1;
      sliderChanged(slider);
    } else if (event.key == dec10) {
      slider.value = +slider.value - 10;
      sliderChanged(slider);
    } else if (event.key == inc10) {
      slider.value = +slider.value + 10;
      sliderChanged(slider);
    }
  });

  document.getElementById('ps2-selector').addEventListener('change', ps2Changed);

  // // Load a file automatically for testing
  // $.ajax({
  //   async:true,
  //   // url: 'deident.csv',
  //   url: 'test.csv',
  //   dataType: 'text',
  //   success: function(data) 
  //   {
  //     parseCSV(data);
  //   }
  // });
}

// All data
let dfall = null;
// Data for the selected subject
let dfSubject = null;
// Data for the selected subject/assignment
let dfAssign = null;
// Data for the selected subject/assignment/file
let df = null;
let editNum2rowNum = null;
let file = null;

function parseCSV(data) {
  loadingWidget.style.visibility = 'visible';

  // let maxSize = 30000000;
  // if (data.length > maxSize) {
  //   window.alert('Max size exceeded. Truncating data. '+
  //                'If data was not sorted by subject then timestamp then unexpected behavior may occur.');
  //   data = data.slice(0, maxSize);
  // }

  dfall = $.csv.toObjects(data);

  // Sort the original file
  dfall.sort((a,b) => {
    if (a.SubjectID != b.SubjectID) {
      return ('' + a.SubjectID).localeCompare(b.SubjectID)
      // return a.SubjectID - b.SubjectID
    }
    if (a.AssignmentID != b.AssignmentID) {
      return ('' + a.AssignmentID).localeCompare(b.AssignmentID)
      // return a.AssignmentID - b.AssignmentID
    }
    return a.ClientTimestamp - b.ClientTimestamp;
  });


  let i = 0;
  dfall.forEach(row => {
    if (row['X-Session']) {
      row['X-Session'] = +row['X-Session'];
    } else {
      row['X-Session'] == null;
    }
    row.ClientTimestamp = +row.ClientTimestamp;
    row['EventIdx'] = i;
    i++;
  });

  updateSubjectWidget();
  loadingWidget.style.visibility = 'hidden';
}

function updateSubjectWidget() {
  let subjects = new Set();
  dfall.forEach(row => {
    subjects.add(row['SubjectID']);
  });

  removeAllChildNodes(subjectsWidget);
  subjects = Array.from(subjects).sort()
  subjects.forEach(file => {
    var element = document.createElement("option");
    element.innerText = file;
    subjectsWidget.append(element);
  });

  subjectChanged();
}

function subjectChanged() {
  subject = subjectsWidget.value;
  dfSubject = dfall.filter(row => row.EventType == 'File.Edit' && row['SubjectID'] == subject);
  updateAssignmentWidget();
}

function updateAssignmentWidget() {
  let assignments = new Set();
  dfSubject.forEach(row => {
    assignments.add(row['AssignmentID']);
  });

  removeAllChildNodes(assignmentsWidget);
  assignments = Array.from(assignments).sort()
  assignments.forEach(file => {
    var element = document.createElement("option");
    element.innerText = file;
    assignmentsWidget.append(element);
  });

  assignmentChanged();
}

function assignmentChanged() {
  assignment = assignmentsWidget.value;
  dfAssign = dfSubject.filter(row => row['AssignmentID'] == assignment);
  updateFileWidget();
}

function updateFileWidget() {
  let files = new Set();
  dfAssign.forEach(row => {
    files.add(row['CodeStateSection']);
  });

  removeAllChildNodes(filesWidget);
  files = Array.from(files).sort()
  files.forEach(file => {
    var element = document.createElement("option");
    element.innerText = file;
    filesWidget.append(element);
  });

  file = filesWidget.value;
  fileChanged();
}

function fileChanged() {
  loadingWidget.style.visibility = 'visible';
  file = filesWidget.value;

  df = dfAssign.filter(row => row['CodeStateSection'] == file);
  slider.max = df.length-1;
  slider.value = slider.max;
  // slider.value = 0;
  editNumWidget.innerHTML = slider.value;
  reconstruct(df);
  loadingWidget.style.visibility = 'hidden';
}

function getNextCheckpoint() {
  if (slider.value == slider.max) return slider.max;
  for (let i = +slider.value+1; i <= +slider.max; ++i) {
    let row = df[i];
    if (row.EditType == 'X-Checkpoint') {
      return i;
    }
  }
  return slider.max;
}

function getPrevCheckpoint() {
  if (slider.value == 0) return 0;
  for (let i = slider.value-1; i > 0; --i) {
    let row = df[i];
    if (row.EditType == 'X-Checkpoint') {
      return i;
    }
  }
  return 0;
}

function findString(toFind) {
  if (df.length == 0) {
    return -1;
  }
  
  // Reconstruct the file
  let s = '';
  for (let i = 0; i <= slider.max; ++i) {
    let row = df[i];
    let j = +row.SourceLocation;
    if (row.DeleteText && row.DeleteText.length > 0) {
      s = s.slice(0,j) + s.slice(j+row.DeleteText.length);
    }
    if (row.InsertText && row.InsertText.length > 0) {
      s = s.slice(0,j) + row.InsertText + s.slice(j);
    }

    if (s.indexOf(toFind) > -1) {
      return i;
    }
  }
  return -1;
}

function reconstruct(df) {
  table.innerHTML = '';
  textarea.value = '';

  // console.log(df);
  if (df.length == 0) {
    return;
  }

  let s = '';
  // Reconstruct the file
  if (df.length > 0) {
    for (let i = 0; i <= slider.value; ++i) {
      let row = df[i];
      let j = +row.SourceLocation;
      if (row.DeleteText && row.DeleteText.length > 0) {
        s = s.slice(0,j) + s.slice(j+row.DeleteText.length);
      }
      if (row.InsertText && row.InsertText.length > 0) {
        s = s.slice(0,j) + row.InsertText + s.slice(j);
      }
    }
  }

  textarea.value = s;
  
  try {
    filbert.parse(s);
    errorWidget.style.visibility = 'hidden';
  } catch(e) {
    errorWidget.style.visibility = 'visible';
  }



  eventNum = df[slider.value].EventIdx;
  if (eventNumWidget != null) {
    eventNumWidget.innerHTML = eventNum;
  }

  // Update the table
  s = ''+
    '<tr>'+
    ' <th>Assn</th>'+
    ' <th>File</th>'+
    ' <th>Event</th>'+
    ' <th>EventType</th>'+
    ' <th>InsertText</th>'+
    ' <th>DeleteText</th>'+
    ' <th>i</th>'+
    ' <th>Time</th>'+
    ' <th>EditType</th>';
    // ' <th>X-Session</th>';
  const n = 5;
  let start = eventNum >= n ? eventNum-n : 0;
  let end = eventNum <= dfall.length-n ? eventNum+n : dfall.length;
  const m = 15; // Number of characters to show on each side of ellipses in abbreviated string
  for (let i = start; i < end; ++i) {
    let row = dfall[i];
    let selected = i == eventNum ? 'class=selected' : '';
    let insert = row.InsertText.length<20 ? row.InsertText :
        `<b>${row.InsertText.slice(0,m)}...${row.InsertText.slice(-m)}[${row.InsertText.length}]</b>`;
    insert = insert.replace(' ', '&bull;');
    let del = row.DeleteText.length<20 ? row.DeleteText :
        `<b>${row.DeleteText.slice(0,m)}...${row.DeleteText.slice(-m)}[${row.DeleteText.length}]</b>`;
    del = del.replace(' ', '&bull;');
    let last = row.Session;
    last = row.EditType;
    s += `<tr ${selected}> <td>${row.AssignmentID}</td> <td>${row['CodeStateSection']}</td> <td>${row.EventIdx}</td> <td>${row.EventType}</td> <td>${insert}</td> <td>${del}</td> <td>${row.SourceLocation}</td> <td>${row.ClientTimestamp}</td> <td>${last}</td>\n`;
  }

  table.innerHTML = s;
}

function readFileFull(file, header) {
  loadingWidget.style.visibility = 'visible';
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    const data = event.target.result;
    parseCSV(header+data);
  });
  reader.readAsText(file);
}

function readFilePartial(file, header) {
  // loadingWidget.style.visibility = 'visible';
  // const reader = new FileReader();
  // reader.addEventListener('load', (event) => {
  //   const data = event.target.result;
  //   // parseCSV(header+data);
  //   console.log(data);
  // });
  // console.log(file.size);
  // let blob = file.slice(0, 100);
  // reader.readAsText(blob);
  readChunks(file, (x) => {console.log('callback');});
}

let key2chunks = {};

function readChunks(file, callback) {
  Papa.parse(file, {
    delimiter: ",",
    newline: "\n",
    header: true,
    // dynamicTyping: false,
    worker: false,
    chunk: function(results) {
      // rows = rows.concat(results.data);
      console.log('chunk', results.data[0]);
      // console.log(results);
      console.log(results.meta.cursor);

      let rows = results.data;
      let cursor = results.meta.cursor;

      // Get the first row and add to existing list of cursor positions.
      let curKey = rows[0].SubjectID +
          rows[0].AssignmentID +
          rows[0].CodeStateSection;
      if (curKey in key2chunks) {
        key2chunks[curKey].push(cursor);
      } else {
          key2chunks[curKey] = [cursor];
      }
      
      rows.forEach(row => {
        let key = row.SubjectID+row.AssignmentID+row.CodeStateSection;
        if (key != curKey) {
          key2chunks[key] = [cursor];
          curKey = key;
        }
      });
    },
    complete: function() {
      console.log('complete');
      console.log(key2chunks);
      // var list = new VirtualList({
      //   h: 300,
      //   itemHeight: 30,
      //   totalRows: rows.length,
      //   generatorFn: function(row) {
      //     var el = document.createElement("div");
      //     el.innerHTML = "<p>ITEM " + row + ' -> ' + rows[row].join(' - ') + "</p>";
      //     return el;
      //   }
      // });
      // document.body.appendChild(list.container)
    }
  });

}

function readChunksBak(file, callback) {
  // 1 KB at a time, because we expect that the column will probably small.
  // var CHUNK_SIZE = 1024;
  var offset = 0;
  var fr = new FileReader();
  var header = '';
  var subjectIdx = -1;
  var assignIdx = -1;
  var fileIdx = -1;
  
  // // signals to only parse rows 3 and 4
  // var rowRange = function(entry, state) {
  //   var start = 3;
  //   var end = 4;
  //   if(state.rowNum >= start && state.rowNum <= end) {
  //     return entry;
  //   }
  //   return false;
  // }  
  // $.csv.toArrays(testHook3, { onParseEntry: rowRange });

  fr.onload = function() {
    let data = event.target.result;
    {
      var istart = Date.now();

      // let rows = $.csv.toArrays(data);

      // signals to only parse rows 3 and 4
      var rowRange = function(entry, state) {
        console.log(entry);
        console.log(state);
        // var start = 3;
        // var end = 4;
        // if(state.rowNum >= start && state.rowNum <= end) {
        //   return entry;
        // }
        // return false;
        return true;
      }  
      let rows = $.csv.toArrays(data, { onParseEntry: rowRange });

      
      if (data.length == CHUNK_SIZE) {
        // Don't read the last line if we're not at the last read since
        // the last line will likely not be completely read.
        rows = rows.slice(0,-1);
      }
      if (offset == 0) {
        header = rows[0];
        // Remove header
        rows = rows.slice(1);

        subjectIdx = header.findIndex((e) => e=='SubjectID');
        assignIdx = header.findIndex((e) => e=='AssignmentID');
        fileIdx = header.findIndex((e) => e=='CodeStateSection');
      }

      let istartRow = 0;
      for (let i = 0; i < rows.length-1; ++i) {
        let irow = rows[i];
        let jrow = rows[i+1];

        let isubject = irow[subjectIdx];
        let iassign = irow[assignIdx];
        let icodeFile = irow[fileIdx];

        let jsubject = jrow[subjectIdx];
        let jassign = jrow[assignIdx];
        let jcodeFile = jrow[fileIdx];

        if (isubject != jsubject ||
            iassign != jassign ||
            icodeFile != jcodeFile) {
          console.log(istartRow, isubject, iassign, icodeFile);
          iStartRow = i+1;
        }
      }


      console.log(Date.now() - istart);

      istart = Date.now();
      let lines = $.csv.parsers.splitLines(data);
      console.log(Date.now() - istart);
    }
    
    // // let data = event.target.result;
    // let lines = $.csv.parsers.splitLines(data);
    // if (data.length == CHUNK_SIZE) {
    //   // Don't read the last line if we're not at the last read since
    //   // the last line will likely not be completely read.
    //   lines = lines.slice(0,-1);
    // }
    // if (offset == 0) {
    //   // Get header array
    //   // header = data.slice(0, data.indexOf('\n')).split(',');
    //   header = lines[0].split(',');
    //   // Remove header
    //   // data = data.slice(data.indexOf('\n')+1);
    //   data = lines.slice(1);

    //   subjectIdx = header.findIndex((e) => e=='SubjectID');
    //   assignIdx = header.findIndex((e) => e=='AssignmentID');
    //   fileIdx = header.findIndex((e) => e=='CodeStateSection');
    // }

    // var start = Date.now();

    // // const rows = data.split('\n');
    // const rows = lines;
    // let k = 0;
    // let reachedEnd = false;
    
    // while (!reachedEnd) {
    //   const row = $.csv.toArray(rows[k]);
    //   const subject = row[subjectIdx];
    //   const assign = row[assignIdx];
    //   const codeFile = row[fileIdx];

    //   // Now do a binary search for the last entry for this
    //   // subject, assignment, and file
    //   const n = rows.length;
    //   let imin = k;
    //   let imax = rows.length-1;
    //   let i = Math.floor((imin+imax)/2);
    //   let found = false;
    //   while (!found) {
    //     let irow = $.csv.toArray(rows[i]);
    //     let isubject = irow[subjectIdx];
    //     let iassign = irow[assignIdx];
    //     let icodeFile = irow[fileIdx];
    //     // console.log(i, isubject, iassign, icodeFile);
    //     if (isubject == subject && iassign == assign && icodeFile == codeFile) {
    //       if (i == rows.length - 1) {
    //         console.log('reached the end');
    //         reachedEnd = true;
    //         found = true;
    //       } else {
    //         let jrow = $.csv.toArray(rows[i+1]);
    //         let jsubject = jrow[subjectIdx];
    //         let jassign = jrow[assignIdx];
    //         let jcodeFile = jrow[fileIdx];
    //         found = (isubject != jsubject || iassign != jassign ||
    //                  icodeFile != jcodeFile);
    //         if (!found) {
    //           imin = i+1;
    //         }
    //       }
    //     } else {
    //       imax = i-1;
    //     }
    //     if (!found) {
    //       i = Math.floor((imin+imax)/2);
    //     }
    //   }
    //   console.log(i, subject, assign, codeFile);
    //   k = i+1;
    // }

    // console.log(rows.length);
    
    // var view = new Uint8Array(fr.result);
    // for (var i = 0; i < view.length; ++i) {
    //   if (view[i] === 10 || view[i] === 13) {
    //     // \n = 10 and \r = 13
    //     // column length = offset + position of \r or \n
    //     callback(offset + i);
    //     return;
    //   }
    // }

    console.log('reading chunk');
    // \r or \n not found, continue seeking.
    offset += CHUNK_SIZE;
    // seek();

    // var end = Date.now();
    // console.log(end-start);
  };
  fr.onerror = function() {
    // Cannot read file... Do something, e.g. assume column size = 0.
    callback(0);
  };
  seek();

  function seek() {
    if (offset >= file.size) {
      // No \r or \n found. The column size is equal to the full
      // file size
      callback(file.size);
      return;
    }
    var slice = file.slice(offset, offset + CHUNK_SIZE);
    // fr.readAsArrayBuffer(slice);
    fr.readAsText(slice);
  }
}

function sliderChanged(slider) {
  editNumWidget.innerHTML = slider.value;//this.value;
  reconstruct(df);
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  sliderChanged(this);
}


