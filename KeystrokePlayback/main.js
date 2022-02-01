var dropdown = document.getElementById('files');
var table = document.getElementById('table');
var slider = document.getElementById('slider');
var editNumWidget = document.getElementById('edit-num');
var eventNumWidget = document.getElementById('event-num');
// var filepathWidget = document.getElementById('filepath');
var textarea = document.getElementById('textarea');
editNumWidget.innerHTML = slider.value; // Display the default slider value

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function onload() {
  // testSpreadsheet();
  
  const fileSelector = document.getElementById('file-selector');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      // filepathWidget.innerHTML = file;
      readFile(file);
    }
  });

  // Load a file automatically for testing
  // $.ajax({
  //   async:true,
  //   url: 'deident.csv',
  //   // url: 'spencer.csv',
  //   dataType: 'text',
  //   success: function(data) 
  //   {
  //     let header = 'EventType,InsertText,DeleteText,CodeStateSection,ClientTimestamp,X-File,Version,Session,2,3\n'
  //     parseCSV(header+data);
  //   }
  // });
}

let dfall = null;
let df = null;
let editNum2rowNum = null;
let file = null;

function parseCSV(data) {
  dfall = $.csv.toObjects(data);
  dfall.forEach(row => {
    if (row.Session) {
      row.Session = +row.Session;
    } else {
      row.Session == null;
    }
    row.ClientTimestamp = +row.ClientTimestamp;
  });

  // // Sort the original file
  // dfall.sort((a,b) => {
  //   if (a.Session == null || a.Session == b.Session) {
  //     return a.ClientTimestamp - b.ClientTimestamp;
  //   }
  //   return 0;//a.Session - b.Session;
  // });

  // Get files
  let files = new Set();
  dfall.forEach(row => {
    files.add(row['X-File']);
  });
  removeAllChildNodes(dropdown);
  files.forEach(file => {
    var element = document.createElement("option");
    element.innerText = file;
    dropdown.append(element);
  });

  file = dropdown.value;
  fileChanged();
}

function fileChanged() {
  file = dropdown.value;
  updateEditNum2RowNum(dfall, file);

  df = dfall.filter(row => row.EventType == 'e' && row['X-File'] == file);
  slider.max = df.length-1;
  slider.value = slider.max;
  editNumWidget.innerHTML = slider.value;
  reconstruct(df);

}

function updateEditNum2RowNum(dfall, file) {
  editNum2rowNum = new Array(dfall.length);
  let nextEditNum = 0;
  for (let i = 0; i < dfall.length; ++i) {
    let row = dfall[i];
    if (row.EventType && row.EventType == 'e' && row['X-File'] == file) {
      editNum2rowNum[nextEditNum] = i;
      nextEditNum++;
    }
  }
}

function reconstruct(df) {
  let s = '';
  if (df.length > 0) {
    for (let i = 0; i <= slider.value; ++i) {
      let row = df[i];
      let j = +row.CodeStateSection;
      if (row.DeleteText && row.DeleteText.length > 0) {
        s = s.slice(0,j) + s.slice(j+row.DeleteText.length);
      } else if (row.InsertText && row.InsertText.length > 0) {
        s = s.slice(0,j) + row.InsertText + s.slice(j);
      }
    }
  }
  textarea.value = s;
  eventNum = editNum2rowNum[slider.value];
  eventNumWidget.innerHTML = eventNum;

  // Update the table
  s = ''+
    '<tr>'+
    ' <th>Event</th>'+
    ' <th>EventType</th>'+
    ' <th>Insert</th>'+
    ' <th>Delete</th>'+
    ' <th>i</th>'+
    ' <th>Time</th>'+
    ' <th>Session</th>';
  const n = 5;
  let start = eventNum >= n ? eventNum-n : 0;
  let end = eventNum <= dfall.length-n ? eventNum+n : dfall.length;
  for (let i = start; i < end; ++i) {
    let row = dfall[i];
    let selected = i == eventNum ? 'class=selected' : '';
    // s += `<tr ${selected}> <td>${i}</td> <td>${row.EventType}</td> <td>${row.InsertText}</td> <td>${row.DeleteText}</td> <td>${row.CodeStateSection}</td>\n`;
    s += `<tr ${selected}> <td>${i}</td> <td>${row.EventType}</td> <td>${row.InsertText}</td> <td>${row.DeleteText}</td> <td>${row.CodeStateSection}</td> <td>${row.ClientTimestamp}</td> <td>${row.Session}</td>\n`;
  }

  table.innerHTML = s;
}

function readFile(file) {
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    const data = event.target.result;
    // console.log(data);
    let header = 'EventType,InsertText,DeleteText,CodeStateSection,ClientTimestamp,X-File,Version,Session,2,3\n'
    parseCSV(header+data);
  });
  reader.readAsText(file);
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  editNumWidget.innerHTML = this.value;
  reconstruct(df);
}


