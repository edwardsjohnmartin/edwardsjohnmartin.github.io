var loadingWidget = document.getElementById('loading');
loadingWidget.style.visibility = 'hidden';

var subjectsWidget = document.getElementById('subjects');
var assignmentsWidget = document.getElementById('assignments');
var filesWidget = document.getElementById('files');

var table = document.getElementById('table');
var slider = document.getElementById('slider');
var editNumWidget = document.getElementById('edit-num');
var eventNumWidget = document.getElementById('event-num');
var textarea = document.getElementById('textarea');
editNumWidget.innerHTML = slider.value; // Display the default slider value

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// function pypChanged(event) {
//   // console.log('here');
//   const fileList = event.target.files;
//   if (fileList.length > 0) {
//     ET_EDIT = 'e';
//     const file = fileList[0];
//     let header = 'EventType,InsertText,DeleteText,CodeStateSection,ClientTimestamp,X-File,Version,X-Session\n'
//     readFile(file, header);
//   }
// }

// function sywChanged(event) {
//   pypChanged(event);
// }

function ps2Changed(event) {
  const fileList = event.target.files;
  if (fileList.length > 0) {
    const file = fileList[0];
    readFile(file, '');
  }
}

function onload() {
  document.getElementById('ps2-selector').addEventListener('change', ps2Changed);

  // Load a file automatically for testing
  $.ajax({
    async:true,
    // url: 'deident.csv',
    url: 'test.csv',
    dataType: 'text',
    success: function(data) 
    {
      parseCSV(data);
    }
  });
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

  let maxSize = 30000000;
  if (data.length > maxSize) {
    window.alert('Max size exceeded. Truncating data. '+
                 'If data was not sorted by timestamp then unexpected behavior may occur.');
    data = data.slice(0, maxSize);
  }

  dfall = $.csv.toObjects(data);

  // Sort the original file
  dfall.sort((a,b) => {
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
    files.add(row['X-File']);
  });

  removeAllChildNodes(filesWidget);
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

  df = dfAssign.filter(row => row['X-File'] == file);
  slider.max = df.length-1;
  slider.value = slider.max;
  // slider.value = 0;
  editNumWidget.innerHTML = slider.value;
  reconstruct(df);
  loadingWidget.style.visibility = 'hidden';
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
      let j = +row.CodeStateSection;
      if (row.DeleteText && row.DeleteText.length > 0) {
        s = s.slice(0,j) + s.slice(j+row.DeleteText.length);
      }
      if (row.InsertText && row.InsertText.length > 0) {
        s = s.slice(0,j) + row.InsertText + s.slice(j);
      }
    }
  }

  textarea.value = s;
  
  eventNum = df[slider.value].EventIdx;
  eventNumWidget.innerHTML = eventNum;

  // Update the table
  s = ''+
    '<tr>'+
    ' <th>File</th>'+
    ' <th>Event</th>'+
    ' <th>EventType</th>'+
    ' <th>InsertText</th>'+
    ' <th>DeleteText</th>'+
    ' <th>i</th>'+
    ' <th>Time</th>'+
    ' <th>X-Session</th>';
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
    s += `<tr ${selected}> <td>${row['X-File']}</td> <td>${row.EventIdx}</td> <td>${row.EventType}</td> <td>${insert}</td> <td>${del}</td> <td>${row.CodeStateSection}</td> <td>${row.ClientTimestamp}</td> <td>${row.Session}</td>\n`;
  }

  table.innerHTML = s;
}

function readFile(file, header) {
  loadingWidget.style.visibility = 'visible';
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    const data = event.target.result;
    parseCSV(header+data);
  });
  reader.readAsText(file);
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  editNumWidget.innerHTML = this.value;
  reconstruct(df);
}


