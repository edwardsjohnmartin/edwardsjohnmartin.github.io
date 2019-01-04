var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "Aug";
month[8] = "Sept";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

// var Topic = function(reading, desc, video) {
//   this.reading = reading;
//   this.desc = desc;
//   if (video == undefined) {
//     this.video = "&nbsp;";
//   } else {
//     this.video = video;
//   }
// }

var Topic = function(desc) {
  this.desc = desc;
}

var dates = [ "January 7", "January 9", "January 11",
              "January 14", "January 16", "January 18",
              "January 23", "January 25",
              "January 28", "January 30", "February 1",
              "February 4", "February 6", "February 8",
              "February 11", "February 13", "February 15",
              "February 20", "February 22",
              "February 25", "Feb 27", "March 1",
              "March 4", "March 6", "March 8",
              "March 18", "March 20", "March 22",
              "March 25", "March 27", "March 29",
              "April 1", "April 3", "April 5",
              "April 8", "April 10", "April 12",
              "April 15", "April 17", "April 19",
              "April 22" ];

for (var i = 0; i < dates.length; ++i) {
  dates[i] += ", 2019";
}

var hdue = Array(dates.length).fill("&nbsp;");
var pdue = Array(dates.length).fill("&nbsp;");
function addHomework(idx, num, link) {
  // due[dates.indexOf(date)] = "<a href=\"./hw" + num + ".pdf?2\">hw" +
  //   num + "</a> (due in class)";
  if (link) {
    hdue[idx-1] = "<a href=\"./hw" + num + ".pdf\">hw" +
      num + "</a>";// (due in class)";
  } else {
    hdue[idx-1] = "hw" + num;// + " (due in class)";
  }
}

// function urlExists(url)
// {
//     var http = new XMLHttpRequest();
//     http.open('HEAD', url, false);
//     http.send();
//     return http.status!=404;
// }

function addProject(idx, num, link) {
  // fn = "./p" + num + ".zip";
  // link = urlExists(fn)
  // if (link) {
  //   pdue[idx-1] = "<a href=\"./p" + num + ".zip\">project" +
  //     num + "</a>";
  // } else {
    pdue[idx-1] = "project" + num + "";
  // }
}

// addHomework(6, "1", true);
// addHomework(7, "2", true);
// addHomework(9, "3", true);
// addHomework(11, "4", true);
// addHomework(13, "5", true);
// addHomework(15, "6", true);
// addHomework(17, "7", true);
// addHomework(20, "8", true);
// addHomework(24, "9", true);
// addHomework(28, "10", true);
// addHomework(31, "11", true);
// addHomework(33, "12", true);
// addHomework(35, "13", true);
// addHomework(38, "14", true);
// addHomework(40, "15", true);
// addHomework(43, "16", true);

addProject(4, "1", true);
addProject(7, "2", true);
// addProject(4, "34", true);
// addProject(8, "72", true);
// addProject(13, "157", true);
// addProject(15, "164", true);
// addProject(17, "171", true);
// addProject(19, "246", true);
// addProject(21, "257", true);
// addProject(25, "307", true);
// addProject(27, "363", true);
// addProject(30, "431", true);
// addProject(36, "565", true);
// addProject(40, "595", false);
// addProject(43, "658", false);

// Everything after the "watch?v="
function ref(link, name) {
  return "<a href=\"https://www.youtube.com/watch?v=" + link + "\" target=\"algorithms\">" + name + "</a>";
}

function ref2(link, name) {
  return "<a href=\"https://" + link + "\" target=\"algorithms\">" + name + "</a>";
}

var topics = [
  new Topic("Data Science, Python, and Jupyter Notebooks"),
  new Topic("Data"),
  new Topic("Visualization"),
  new Topic("Statistics I"),
  new Topic("Statistics II"),
  new Topic("Probability I"),
  new Topic("Probability II"),
  new Topic("Hypothesis and Inference I"),
  new Topic("Hypothesis and Inference II"),
  new Topic("Gradient Descent I"),
  new Topic("Gradient Descent II"),
  new Topic("Machine Learning I"),
  new Topic("Machine Learning II"),
  new Topic("K-nearest neighbors"),
  new Topic("Simple Linear Regression"),
  new Topic("Multiple Regression I"),
  new Topic("Multiple Regression II"),
  new Topic("Logistic Regression I"),
  new Topic("Logistic Regression II"),
  new Topic("Decision Trees I"),
  new Topic("Decision Trees II"),
  new Topic("Neural Networks I"),
  new Topic("Neural Networks II"),
  new Topic("Clustering I"),
  new Topic("Clustering II"),
  new Topic("Natural Language Processing I"),
  new Topic("Natural Language Processing II"),
  new Topic("Network Analysis I"),
  new Topic("Network Analysis II"),
  new Topic("Recommender Systems I"),
  new Topic("Recommender Systems II"),
  new Topic("Project"),
  new Topic("Project"),
  new Topic("Project"),
  new Topic("Project"),
  new Topic("Project"),
  new Topic("Project"),
  new Topic("Project"),
  new Topic("Project"),
  new Topic("Project presentations"),
  new Topic("Project presentations"),
];

for (var i=0; i<dates.length; i++) {
  var d = new Date();
  d.setTime(Date.parse(dates[i]));
  d.setHours(23);
  d.setMinutes(0);
  d.setSeconds(0);
  // var date = d;//new Date(d);
  if (d < Date.now()) {
    document.write("<tr style=\"color:#A0A0A0;\">");
  } else {
    document.write("<tr>");
  }
  document.write("<td>" + (i+1) + "</td>");
  // document.write("<td>" + dates[i] + "</td>");
  document.write("<td>" + month[d.getMonth()] + " " + d.getDate() + "</td>");
  // document.write("<td>" + topics[i].reading + "</td>");
  if (topics[i]) {
    document.write("<td>" + topics[i].desc + "</td>");
  } else {
    document.write("<td>&nbsp;</td>");
  }
  // document.write("<td>" + topics[i].video + "</td>");
  document.write("<td>" + pdue[i] + "</td>");
  // document.write("<td>" + hdue[i] + "</td>");
  document.write("</tr>");
}
