let text = "";

function addPerson(person) {
  text += `<div class="w3-cell-row">`;

  // left column - picture and CV
  text += `<div class="w3-quarter w3-container w3-cell w3-cell-top" style="width:200px">`;
  if (person.image != '') {
    text += `<img src="images/${person.image}" width=${person.size} class="people-pic"></img>`;
  } else {
    // text += `<img src="images/${person.image}" width=${person.size} class="people-pic"></img>`;
  }
  if (person.cv) {
    text += `<br><a href=${person.cv} target="_blank">CV</a>`;
  }
  text += `<br><br></div>`;

  // right column - bio
  text += `<div class="w3-threequarter w3-container w3-cell">`;
  text += `<h3 style="margin-top: 0px;">${person.name}</h3>`;
  text += `${person.bio}`;
  text += `<br><br></div>`;

  text += `</div>`; // row
}

function addAlum(person) {
  text += `<div style="line-height:12px;">`;

  // left column - picture and CV
  text += `<div class="w3-quarter w3-container w3-cell w3-cell-top" style="width:145px">`;
  // text += `<table><tr><td>`;
  if (person.image != '') {
    text += `<img src="images/${person.image}" style="width:145px" class="people-pic"></img>`;
  } else {
    text += `<img src="images/empty.jpg" width=145px class="people-pic"></img>`;
  }
  text += `</div>`;
  // text += `</td></tr><tr><td>`;

  // right column - bio
  // text += `<div class="w3-threequarter w3-container w3-cell">`;
  text += `<div class="w3-rest w3-container w3-cell">`;
  // text += `<h3 style="margin-top: 0px;">${person.name}</h3>`;

  // text += `${person.name}`;
  text += `<small>${person.name}<br>${person.year}</small>`;

  // text += `${person.bio}`;
  text += `<br><br></div>`;
  // text += `</td></tr></table>`;

  // text += `<span class="tooltiptext">Tooltip text</span>`;
    // <div class="tooltip">Hover over me
    // <span class="tooltiptext">Tooltip text</span>
    // </div>

  text += `</div>`;
}

let john = { image:'edwards.jpg', size:178, name:'John Edwards', bio:"John Edwards is an Associate Professor at Utah State University. After receiving his Bachelor's Degree in Computer Science from USU he worked in the industry as a Software and Research Engineer doing high performance graphics applications. While working he earned a Master's of Computer Science from Brigham Young University. He later earned a PhD from the University of Texas where he worked on nanoscale geometric modeling of hippocampal brain neurons. He was advised by Chandrajit Bajaj. He followed his PhD with a two-year postdoc at the Scientific Computing and Imaging Institute at the University of Utah mentored by Valerio Pascucci and Christopher Johnson. He started his independent research career at Idaho State University and, after three years, joined the Computer Science faculty at Utah State University.<br /><br />Dr. Edwards has interests in visualization, educational psychology, and scientific computing. He has published in venues as diverse as Computers and Graphics, Neuroinformatics, and Precision Agriculture. He teaches courses in Data Visualization, Data Science, and lots of other fun things. His work is supported by the National Science Foundation under grants <a href=\"https://www.nsf.gov/awardsearch/showAward?AWD_ID=2235569&HistoricalAwards=false\" target=\"_blank\">#2235569</a> and <a href=\"https://www.nsf.gov/awardsearch/showAward?AWD_ID=2315783&HistoricalAwards=false\" target=\"_blank\">#2315783</a>. He is the 2025 USU College of Science Graduate Mentor of the Year.<br /><br />Dr. Edwards has a beautiful and extremely talented wife and six intelligent and well-adjusted children. He is a member of the Church of Jesus Christ of Latter-day Saints. He enjoys backpacking, trail running, gardening, woodworking, longboarding, mountain biking, skiing, hockey, singing barbershop, directing the Cache Valley Good Times Marching Band, and way too many other hobbies. He is currently undefeated in ping pong against his students.", cv:"https://edwardsjohnmartin.github.io/cv/cv.pdf" };

let grads = [
  { image:'ditton.jpg', size:165, name:'Joseph Ditton (PhD)', bio:"Joseph started working as a software engineer building educational applications during the sophomore year of his undergraduate degree. He finds working with educators rewarding so when he decided to go back and get his Master's degree he found that researching computer science education was a natural progression from his current experience. He is excited to join Dr. Edwards's team to help discover a better computer science curriculum. During his free time Joseph likes to play guitar, hike, and save the galaxy with his beautiful wife, Catelyn." },
  { image:'ghalehkohneh-sadra.jpg', size:165, name:'Sadra Jafari Ghalehkohneh (PhD)', bio:"Sadra is a PhD student in Computer Science, currently part of Dr. Edwards's lab, focusing on physics simulations. He holds a Bachelor's degree in Computer Engineering from Yazd University, Iran, and has prior experience as a front-end developer. Sadra is excited to be working on physics simulations and contributing to cutting-edge scientific discoveries." },
  { image:'harding-chelsea.jpg', size:165, name:'Chelsea Harding (PhD)', bio:'Chelsea is an instructor in the Data Analytics and Information Systems department of Utah State University. She enjoys teaching and learning, and she loves to mentor students in programming and data visualization. Chelsea has been running Utah’s largest collegiate hackathon, HackUSU, through USU campus since 2019. She is looking forward to studying hackathons along with the motivations, effect, and sense of belonging that the participants of hackathons experience.' },
  { image:'rau-matt.jpg', size:165, name:'Matt Rau (M.S.)', bio:'Matt is a Masters student in Computer Science. He got his undergraduate in computer science from Utah State University.  Through years of teaching both in computer science and music, he has grown very passionate about education and educational research. He is excited to be working with Dr. Edwards to gain a better understanding how amateur students program, and how we can leverage that understanding to support student learning.' },
  { image:'burns-matt.jpg', size:165, name:'Matt Burns (M.S.)', bio:'Matt Burns is a Master student pursuing a degree in Data Science. He has an undergraduate degree in Biology from BYU - Idaho and discovered his love for data while working in an analytical chemistry lab.  He is looking forward to experiencing every step of the Data Science process, from collection to analysis, as he explores innovative methods of teaching problem decomposition in a CS1 context.' },
  { image:'eddington-gavin.jpg', size:165, name:'Gavin Eddington (M.S.)', bio:"Gavin is a Master's student in Computer Science and a software engineer at Space Dynamics Laboratory, where they work with Synthetic Aperture Radar. They earned Bachelor's degrees in Computer Science and Mathematics/Statistics from USU. He is excited to explore how students engage with their work through technology and uncover insights to improve learning outcomes. Outside of work, Gavin enjoys drumming, having led USU's drumline and pep bands, and continues to perform at community events."},
//  { image:'placeholder.jpg', size:165, name:'Gavin Eddington (M.S.)', bio:'Matt is investigating student behaviors while programming.' },
//  { image:'staley-bridget.jpg', size:165, name:'Bridget Staley (M.S.)', bio:'Bridget Staley received a B.S. in computer science from USU in 2018. She has worked as a software engineer since then. She is working full-time while pursuing her masters in computer science. Her passion is in encouraging more women in technology. She is researching how to increase the diversity in CS through curriculum. During her free time, you will often find her training her dogs, sewing, gardening, or playing/coaching soccer.' },
  { image:'placeholder.jpg', size:165, name:'[Your name here]', bio:'Creative, intelligent, curious, and hard-working, [your name here] recently joined EdwardsLab and is progressing swimmingly towards a truly ground-breaking PhD thesis. [See the <a href="../contact/index.html">contact page</a> if you would like your name here.]' },
];

let undergrads = [
  { image:'hart-kaden-2.jpg', size:140, name:'Kaden Hart', bio:'Kaden is one of the principal software engineers of the DynamicsLab physics simulation suite.' },
  // { image:'placeholder.jpg', size:140, name:'Elsa Schutfort', bio:'Elsa is looking at student effort, frustration, and progress while programming.' },
];


let alumni = [
  { image:'ghimire.jpg', size:125, name:'Dr. Aashish Ghimire', year:'(PhD 2024)', bio:"Aashish studied all things AI relating to computing education, including the first study measuring student interactions with their code when they have access to ChatGPT. He has publications in AIED and i-ETC."},
  { image:'hart-kaden.jpg', size:125, name:'Dr. Kaden Hart', year:'(PhD 2024)', bio:"Kaden studied student behavior while computer programming, including an elegant study comparing behavior with and without cell phone notifications. He has publications in SIGCSE and JEDM."},

  { image:'urry-josh.jpg', size:125, name:'Josh Urry', year:'(M.S. 2024)', bio:"Josh studied cognitive load measured by pauses in keystrokes. He published in SIGCSE 2024." }, 
  { image:'syndergaard-caleb.jpg', size:125, name:'Caleb Syndergaard', year:'(M.S. 2024)', bio:'Caleb studied interventions to improve student perception of usage data being used for plagiarism detetction. He published in i-ETC 2024.' },
  { image:'winder-jaxton.jpg', size:125, name:'Jaxton Winder', year:'(M.S. 2024)', bio:'Jaxton built the brilliant Shell Tutor. He has publications at ACE, ITiCSE, and i-ETC.' },
  { image:'brown-chris.jpg', size:125, name:'Chris Brown', year:'(M.S. 2023)', bio:"Chris worked on understanding of the processes students use while writing computer programs." },
//  { image:'hendricks-logan.jpg', size:165, name:'Logan Hendricks', year:'(M.S.)', bio:'Logan completed a B.A. in Art History in 2013 from BYU-Idaho. He worked professionally in that field as a stained glass and glassblowing manager before making a transition to computer science. He graduated from the MTECH Web Development and Design certificate program in 2016. He worked professionally as a Full Stack Software Engineer and DevOps engineer for multiple years before starting the MS in Computer Science program in 2019. He is interested in the rise of Coding Bootcamps and is researching the difference in long term benefits of a traditional university degree when compared to a coding bootcamp.' },
  { image:'hendricks-logan.jpg', size:125, name:'Logan Hendricks', year:'(M.S. 2023)', bio:'Logan studied the rise of coding bootcamps, their long-term benefits, white-label bootcamps, and the differences in perception of bootcamps vs traditional university degrees. He has two publications in the i-ETC conference.' },
  { image:'bagley-eric.jpg', size:125, name:'Eric Bagley', year:'(M.S. 2022)', bio:"Eric studied how using visual programming can help second grade students learn multiplication through iteration rather than algorithms typically taught in elementary school. Students loved the software! His work was published in ACE 2022."},
  { image:'shrestha.jpg', size:125, name:'Raj Shrestha', year:'(M.S. 2022)', bio:"Raj authored papers presented in ICSE 2021, 2022, and ACE 2022. He did a number of analyses of keystroke data looking at Circadian rhythms, pauses while programming, and the process of writing code."},
  { image:'johnson-marina.jpg', size:125, name:'Marina Johnson', year:'(M.S. 2022)', bio:"Marina first-authored a paper in the i-ETC conference looking at precision of thought between individuals who had been exposed to CS principles and those who had not."},
  { image:'', size:165, name:'Andres Imperial', year:'(M.S. 2021)', bio:"Andres attacked the problem of nonuniform noise in natural images. He designed and implemented a novel algorithm that clusters pixels in intensity space in order to compute meaningful statistics to determine correction offsets. He also created the first standard dataset that will be a great help in the field."},
  { image:'gonzales-stephanie.jpg', size:125, name:'Stephanie Gonzales', year:'(M.S. 2020)', bio:"Stephanie did research into the psychology of beginning computer science students in syntax exercises. Her empirical research using qualitative methods helps us understand what students think as they learn computer language syntax. She is currently preparing a paper for a submission to an international conference."},
  { image:'sainju.jpg', size:125, name:'Bishal Sainju', year:'(M.S. 2020)', bio:"Bishal used topic discovery techniques to analyze employee reviews on indeed.com. Want to know what employees in high-tech care about? Work-life balance. Want to know what employees in the retail sector care about? Long breaks and free lunch! Bishal co-authored a paper presented at the i-ETC conference and is preparing a paper for journal submission."},
  { image:'', size:125, name:'Shelsey Sullivan', year:'(M.S. 2020)', bio:"Shelsey performed the first qualitative study in EdwardsLab. She coded free responses from students on syntax exercises and analyzed them, controlling for student background and other factors, resulting in a 2021 paper in SIGCSE. She also co-authored a paper on syntax exercises published at the ICER conference." },
  { image:'ditton.jpg', size:125, name:'Joseph Ditton', year:'(M.S. 2020)', bio:"Joseph engineered a re-implementation of Phanon that is starting to be used throughout the world. He also designed and executed an empirical study looking at external imagery in computer programming. His work resulted in publications at the SIGCSE, ICER, and i-ETC conferences." },
  { image:'marsden.jpg', size:125, name:'Daniel Marsden', year:'(M.S. 2020)', bio:"Daniel developed a JavaScript implementation of Fortune's Voronoi Diagram algorithm with modifications to support polygonal sites. The app is the only one of its kind that is publicly available on the internet, and his algorithm compares favorably in computational complexity with less general methods." },

  { image:'willard-jaxon.jpg', size:125, name:'Jaxon Willard', year:'(B.S. 2022)', bio:"Jaxon did some excellent work looking at visualization strategies for complex, high-dimensional event data. He implemented the Needleman-Wunsch algorithm and designed other useful visualizations and algorithms for understanding various types of data."},
  { image:'scott-steven.jpg', size:125, name:'Steven Scott', year:'(B.S. 2022)', bio:"Steven graduated with majors in Computer Science and Economics and minors in Mathematics and Anticipatory Intelligence. His work on compilable state was published in ICSE SEET 2023."},
  { image:'devitry-sally.jpg', size:125, name:'Sally Devitry', year:'(B.S. 2021)', bio:"Sally is an URCO (Undergraduate Research & Creative Opportunities) grant recipient and developed a mobile application as a vehicle for reinforcing positive social-emotional skills in children. Her mobile book is an absolute delight. Ask her about Opto sometime."},
  { image:'johnson-bo.jpg', size:125, name:'Bo Johnson', year:'(B.S. 2020)', bio:"Bo was co-advised by Physics professor Boyd Edwards and, during his Junior and Senior years, worked on JavaScript, Python, and C++ code discovering interesting behaviors of pairs of magnetized spheres. Bo was a Dean's Scholar and recipient of the O. Harry Ottesen Award, an honor given to the student achieving the highest score in general physics. He co-authored two papers published in the journal Chaos." },
  { image:'valentin.jpg', size:125, name:'Joseph Valentin', year:'(2017)', bio:"Joe has worked with Dr. Edwards his Sophomore, Junior and Senior years at Idaho State University where he implemented a novel linear regression algorithm and was the lead developer on the Phanon project. His work on Phanon resulted in a paper at the 2018 IEEE Frontiers in Education conference." },
  { image:'morrical.jpg', size:125, name:'Nathan Morrical', year:'(B.S. 2017)', bio:"Nathan worked with Dr. Edwards during his Junior and Senior years at Idaho State University. He developed a parallel algorithm for generating the Generalized Voronoi Diagram and implemented it in OpenCL. His worked resulted in a presentation at the Shape Modeling International conference in 2017 and a publication in Computers and Graphics. After graduating from ISU Nathan began work on a PhD at the University of Utah." }
];

addPerson(john);

text += `<br><h3>Graduate Students</h3><hr/>`;
grads.forEach(addPerson);

text += `<br><h3>Undergraduate Students</h3><hr/>`;
undergrads.forEach(addPerson);

text += `<br><h3>Alumni</h3><hr/>`;
// alumni.forEach(addPerson);
text += `<div class="grid">`;
// alumni.forEach(addPerson);
alumni.forEach(addAlum);
text += `</div>`;

// text += `<br><h3>Alumni</h3><hr/>`;
// text += `<div class="w3-cell-row">`;
// text += `<div class="w3-quarter w3-container w3-cell w3-cell-top" style="width:30%">`;
// text += `Test 123`;
// alumni.forEach(addPerson);
// text += `</div>`;
// text += `<div class="w3-quarter w3-container w3-cell w3-cell-top" style="width:30%">`;
// text += `Test 123`;
// text += `</div>`;
// text += `<div class="w3-quarter w3-container w3-cell w3-cell-top" style="width:30%">`;
// text += `Test 123`;
// text += `</div>`;
// text += `</div>`;
// // alumni.forEach(addPerson);

document.getElementById("people-div").innerHTML = text;
