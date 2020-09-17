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

let john = { image:'edwards.jpg', size:178, name:'John Edwards', bio:"John Edwards is an Assistant Professor at Utah State University. After receiving his Bachelor's Degree in Computer Science from USU he worked in the industry as a Software and Research Engineer doing high performance graphics applications. While working he earned a Master's of Computer Science from Brigham Young University. He later earned a PhD from the University of Texas where he worked on nanoscale geometric modeling of hippocampal brain neurons. He was advised by Chandrajit Bajaj. He followed his PhD with a two-year postdoc at the Scientific Computing and Imaging Institute at the University of Utah mentored by Valerio Pascucci and Christopher Johnson. He started his independent research career at Idaho State University and, after three years, joined the Computer Science faculty at Utah State University.<br /><br />Dr. Edwards has interests in visualization, Computer Science education, and scientific computing. He has published in venues as diverse as Computers and Graphics, Neuroinformatics, and Precision Agriculture. He teaches courses in Data Visualization, Data Science, and lots of other fun things.<br /><br />Dr. Edwards has a beautiful and extremely talented wife and six intelligent and well-adjusted children. He enjoys backpacking, running, woodworking, longboarding, singing barbershop, and way too many other hobbies. He is currently undefeated in ping pong against his students.", cv:"https://edwardsjohnmartin.github.io/cv/cv.pdf" };

let grads = [
  { image:'ghimire.jpg', size:165, name:'Aashish Ghimire (PhD)', bio:"Aashish has always been fascinated with computers and enjoys all things technology. Aashish was born and raised in Nepal before moving to the United States a decade ago. He received his B.S. in computer science from Coppin State University in Baltimore, Maryland. He is currently pursuing a Master's degree at Utah State University, developing a career recommendation system using large-scale mined data and machine learning techniques. While not in front of the screen, Aashish enjoys exploring Utah's hiking trails, making cross-country road trips, playing or cheering for his favorite soccer team, listening to podcasts, or reading books."},
  { image:'hart-kaden.jpg', size:165, name:'Kaden Hart (PhD)', bio:"Kaden is researching the psychology of learning computer programming, specifically relating to the mental representations beginning CS students have of their programs. He is also studying pedagogies, including backtrack debugging and playback exploration, that take advantage of these mental models. He is an all-around great guy."},
  { image:'bagley-eric.jpg', size:165, name:'Eric Bagley (Masters)', bio:"Eric grew up in a small town in Idaho. He graduated from Brigham Young University-Idaho with a Bachelor's in Software Engineering. He and his family moved to Cache Valley after graduating and being offered a job as a software developer. Eric loves learning and he is grateful for the many resources and opportunities education has brought to his life. One of the fundamental purposes of going to school is to prepare students to be productive, intelligent adults that understand the world around them. Considering the great impact computer science and similar topics have made to society, he believes that understanding topics in computer science assists in developing vital skills that prove useful in everyday life. He hopes to determine different ways this can be done at an elementary school level. Apart from school and work, he loves spending time hiking, gardening, playing music, watching movies, and playing games with his wife and kids."},
  { image:'johnson-marina.jpg', size:165, name:'Marina Johnson (Masters)', bio:"Marina graduated from The University of a Utah with a Bachelor's in Software Engineering EAE emphasis. After finishing her bachelor's degree she wanted to dig deeper into the research side of cs. She has always been fascinated with trying different things and loves to dive into any challenge. She hopes that one day she can use her computer science skills to help others find their passion for learning. In her spare time she loves to travel, find new delicious eateries, watch movies, and hang out with friends."},
  { image:'shrestha.jpg', size:165, name:'Raj Shrestha (Masters)', bio:"Raj completed his Bachelors in Computer Engineering from Pulchowk Engineering Campus, Nepal. He is interested in Distributed Systems and Data Science. With a motto to expand his knowledge and research extensively in those fields, he is planning to join USU as soon as travel restrictions are lifted. He is an introvert. He loves reading books, listening to music and table tennis."},
  { image:'gonzales-stephanie.jpg', size:165, name:'Stephanie Gonzales (Masters)', bio:"Stephanie is doing research into the psychology of beginning computer science students in syntax exercises. Her empirical research using qualitative methods is helping us understand what students think as they learn computer language syntax. Her insights into the brain of beginning students and her incomparable work ethic make her ideal for this line of research."},
  { image:'khanal-uttam.jpg', size:165, name:'Uttam Khanal (Masters)', bio:"Uttam is working on browser-based simulations of the Coriolis force on an ellipsoidal earth, parametrized by eccentricity. He is very much fond of games, simulations and algorithmic problem solving."},
  { image:'', size:165, name:'Andres Imperial (Masters)', bio:""},
  // { image:'ditton.jpg', size:165, name:'Joseph Ditton', bio:"Joseph started working as a software engineer building educational applications during the sophomore year of his undergraduate degree. He finds working with educators rewarding so when he decided to go back and get his Master's degree he found that researching computer science education was a natural progression from his current experience. He is excited to join Dr. Edwards's team to help discover a better computer science curriculum. During his free time Joseph likes to play guitar, hike and save the galaxy with his beautiful wife, Catelyn." },
  // { image:'marsden.jpg', size:165, name:'Daniel Marsden', bio:"Daniel has been developing software professionally since the beginning of 2016. He currently works at the Space Dynamics Laboratory in Logan, Utah. He earned his undergraduate degree in computer science from Brigham Young University - Idaho and is now pursuing a Master's degree at Utah State University. Daniel is fascinated by geometric shapes and objects. While studying for his undergraduate degree he developed his own Ray Tracing Engine. While not at home spending time with his toddler son and wife you can often find him writing equations and graphs on a whiteboard. He is deathly afraid of spiders, xenomorphs, and developing software on a Windows machine. Hobbies include hiking, spike ball, volleyball, camping, and cycling." },
//  { image:'sainju.jpg', size:165, name:'Bishal Sainju (Masters)', bio:"Bishal has been working on data science projects since the final year of his undergraduate degree. He earned his Bachelor's degree from Pulchowk Engineering Campus back in his home country of Nepal. He came to Utah State University to further expand his knowledge on machine learning and big data analytics by pursuing a Master's degree. He is currently working on a Human Resource research project, where he is analyzing the employee reviews on Indeed in order to explore factors responsible for employee satisfaction. He likes playing soccer, basketball, cricket, table tennis...actually, everything. He also loves hiking and traveling around the world on his motorbike."},

  // { image:'yearsley.png', size:165, name:'Caleb Yearsley', bio:"Caleb has been happily employed at Space Dynamics Laboratory for the last four years developing internal and external applications.  By the time of earning his Bachelor's Degree in Computer Science at Utah State University in 2017 Caleb's passion for learning had only grown, and thus his journey to pursue his Master's Degree at USU had begun. He is looking forward to working with, and being advised by Dr. Edwards in exploring solutions for human pose estimations via neural networks. He takes high interests in database management systems, image processing, and as of recently machine learning. Caleb's hobbies include snowboarding, playing board games, drinking coffee/tea, and listening/composing music. Above all, however, he enjoys spending time with his beautiful wife and three amazing children." },
  { image:'placeholder.jpg', size:165, name:'[Your name here]', bio:'Creative, intelligent, curious, and hard-working, [your name here] recently joined EdwardsLab and is progressing swimmingly towards a truly ground-breaking PhD thesis. [See the <a href="../contact/index.html">contact page</a> if you would like your name here.]' },
];

let undergrads = [
  // { image:'johnson-bo.jpg', size:140, name:'Bo Johnson', bio:"Bo is a Physics major with a Computer Science minor at Utah State University where he works on understanding the topographical and topological structure of dynamic magnet interactions. He is co-advised by Dr. John Edwards and Dr. Boyd Edwards (yep, they're brothers). Bo finds immense satisfaction out of learning something new. That can be a new physics principle, a fun trick in Linux, or traditions of people from other cultures. He also would prefer to spend time with his wife and new baby daughter, but knows he should probably do well in school also." },

  { image:'scott-steven.jpg', size:140, name:'Steven Scott', bio:"Steven graduated from Utah State University with majors in Computer Science and Economics and minors in Mathematics and Anticipatory Intelligence. He works on data visualization research with EdwardsLab. He recently started a job as a software engineer at Northrop Grumman. Outside of school and work, Steven enjoys rock climbing, skiing, kayaking, running, and reading."},
  { image:'willard-jaxon.jpg', size:140, name:'Jaxon Willard', bio:"Jaxon has been working on his bachelor's in computer science since January 2018. He enjoys problem-solving and studying algorithms. In his spare time, he builds games like a version of Snake that uses artificial intelligence to play by itself. He loves exploring technology. At EdwardsLab, he works on high dimensional data visualization, providing data structures for data analytics. His hobbies include skiing, guitar, camping, hunting, and hiking."}
];


let alumni = [
  { image:'sainju.jpg', size:125, name:'Bishal Sainju (M.S. 2020)', bio:"Bishal used topic discovery techniques to analyze employee reviews on indeed.com. Want to know what employees in high-tech care about? Work-life balance. Want to know what employees in the retail sector care about? Long breaks and free lunch! Bishal co-authored a paper presented at the i-ETC conference."},
  { image:'', size:125, name:'Shelsey Sullivan (M.S. 2020)', bio:"Shelsey performed the first qualitative study in EdwardsLab. She coded free responses from students on syntax exercises and analyzed them, controlling for student background and other factors. She co-authored a paper on syntax exercises published at the ICER conference." },
  { image:'ditton.jpg', size:125, name:'Joseph Ditton (M.S. 2020)', bio:"Joseph engineered a re-implementation of Phanon that is starting to be used throughout the world. He also designed and executed an empirical study looking at external imagery in computer programming. His work resulted in publications at the i-ETC  and ICER conferences." },
  { image:'marsden.jpg', size:125, name:'Daniel Marsden (M.S. 2020)', bio:"Daniel developed a JavaScript implementation of Fortune's Voronoi Diagram algorithm with modifications to support polygonal sites. The app is the only one of its kind that is publicly available on the internet, and his algorithm compares favorably in computational complexity with less general methods." },
  { image:'johnson-bo.jpg', size:125, name:'Bo Johnson (B.S. 2020)', bio:"Bo was co-advised by Physics professor Boyd Edwards and, during his Junior and Senior years, worked on JavaScript, Python, and C++ code discovering interesting behaviors of pairs of magnetized spheres. Bo was a Dean's Scholar and recipient of the O. Harry Ottesen Award, an honor given to the student achieving the highest score in general physics. He co-authored two papers published in the journal Chaos." },
  { image:'valentin.jpg', size:125, name:'Joseph Valentin (2017)', bio:"Joe has worked with Dr. Edwards his Sophomore, Junior and Senior years at Idaho State University where he implemented a novel linear regression algorithm and was the lead developer on the Phanon project. His work on Phanon resulted in a paper at the 2018 IEEE Frontiers in Education conference." },
  { image:'morrical.jpg', size:125, name:'Nathan Morrical (B.S. 2017)', bio:"Nathan worked with Dr. Edwards during his Junior and Senior years at Idaho State University. He developed a parallel algorithm for generating the Generalized Voronoi Diagram and implemented it in OpenCL. His worked resulted in a presentation at the Shape Modeling International conference in 2017 and a publication in Computers and Graphics. After graduating from ISU Nathan began work on a PhD at the University of Utah." }
];

addPerson(john);

text += `<br><h3>Graduate Students</h3><hr/>`;
grads.forEach(addPerson);

text += `<br><h3>Undergraduate Students</h3><hr/>`;
undergrads.forEach(addPerson);

text += `<br><h3>Alumni</h3><hr/>`;
alumni.forEach(addPerson);

document.getElementById("people-div").innerHTML = text;
