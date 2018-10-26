let text = "";

let pubs = [
  { title:"1", authors:"a, b, c", venue:"journal", link:"edwards2010topologically", month:"January", year:"1999" }
];

pubs.forEach(p => {
  text += "<tr><td>image</td>";
  text += `<td>${p.authors}<br>${p.title}<br>${p.venue}<br>${p.month}, ${p.year}</td>`;
});
let e = document.getElementById("table-body");
e.innerHTML = text;
