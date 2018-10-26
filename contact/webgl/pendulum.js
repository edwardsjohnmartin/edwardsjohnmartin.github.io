//------------------------------------------------------------
// This code simulates and was inspired by a video showing
// pendulums at different string lengths. The video can be
// seen here:
//      https://www.facebook.com/photo.php?v=10200793511697524
//------------------------------------------------------------

var gl;

function initGL(canvas) {
  try {
    gl = canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch (e) {
  }
  if (!gl) {
    alert("Could not initialise WebGL, sorry :-(");
  }
}


function getShader(gl, id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }
  
  var str = "";
  var k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType == 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
  }
  
  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }
  
  gl.shaderSource(shader, str);
  gl.compileShader(shader);
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }
  
  return shader;
}


var shaderProgram;
var lshaderProgram;

function initShaders() {
  { // circle shader
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");
    
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
    }
    
    //gl.useProgram(shaderProgram);
    
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    
    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  }
  { // line shader
    var fragmentShader = getShader(gl, "lshader-fs");
    var vertexShader = getShader(gl, "lshader-vs");
    
    lshaderProgram = gl.createProgram();
    gl.attachShader(lshaderProgram, vertexShader);
    gl.attachShader(lshaderProgram, fragmentShader);
    gl.linkProgram(lshaderProgram);
    
    if (!gl.getProgramParameter(lshaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
    }
    
    //gl.useProgram(shaderProgram);
    
    lshaderProgram.vertexPositionAttribute = gl.getAttribLocation(lshaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(lshaderProgram.vertexPositionAttribute);
    
    lshaderProgram.vertexColorAttribute = gl.getAttribLocation(lshaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(lshaderProgram.vertexColorAttribute);
    
    lshaderProgram.pMatrixUniform = gl.getUniformLocation(lshaderProgram, "uPMatrix");
    lshaderProgram.mvMatrixUniform = gl.getUniformLocation(lshaderProgram, "uMVMatrix");
  }
}


var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

function mvPushMatrix() {
  var copy = mat4.create();
  mat4.set(mvMatrix, copy);
  mvMatrixStack.push(copy);
}

function mvPopMatrix() {
  if (mvMatrixStack.length == 0) {
    throw "Invalid popMatrix!";
  }
  mvMatrix = mvMatrixStack.pop();
}


function setMatrixUniforms() {
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
  gl.uniformMatrix4fv(lshaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(lshaderProgram.mvMatrixUniform, false, mvMatrix);
}


function degToRad(degrees) {
  return degrees * Math.PI / 180;
}


var circleVertexPositionBuffer;
var circleVertexColorBuffer;
var lineVertexPositionBuffer;
var lineVertexColorBuffer;

var triangleVertexPositionBuffer;
var triangleVertexColorBuffer;
var squareVertexPositionBuffer;
var squareVertexColorBuffer;

function initBuffers() {
  // Circle
  circleVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexPositionBuffer);
  var cvertices = [];
  var ccolors = [];
  var n = 361;
  for (var deg = 0; deg <= 360; ++deg) {
    var rad = degToRad(deg);
    cvertices = cvertices.concat([Math.cos(rad), Math.sin(rad), 0.0]);
    ccolors = ccolors.concat([1.0, 1.0, 1.0, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cvertices), gl.STATIC_DRAW);
  circleVertexPositionBuffer.itemSize = 3;
  circleVertexPositionBuffer.numItems = n;
  
  circleVertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ccolors), gl.STATIC_DRAW);
  circleVertexColorBuffer.itemSize = 4;
  circleVertexColorBuffer.numItems = n;
  
  // Line
  lineVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexPositionBuffer);
  var lvertices = [ 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0 ];
  var lcolors = [ 1.0, 1.0, 1.0, 1.0,
                  1.0, 1.0, 1.0, 1.0 ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lvertices), gl.STATIC_DRAW);
  lineVertexPositionBuffer.itemSize = 3;
  lineVertexPositionBuffer.numItems = 2;
  
  lineVertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lcolors), gl.STATIC_DRAW);
  lineVertexColorBuffer.itemSize = 4;
  lineVertexColorBuffer.numItems = 2;
  
  // Triangle
  triangleVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
  var vertices = [
    0.0,  1.0,  0.0,
      -1.0, -1.0,  0.0,
    1.0, -1.0,  0.0
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  triangleVertexPositionBuffer.itemSize = 3;
  triangleVertexPositionBuffer.numItems = 3;
  
  triangleVertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
  var colors = [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  triangleVertexColorBuffer.itemSize = 4;
  triangleVertexColorBuffer.numItems = 3;
  
  // Square
  squareVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
  vertices = [
    1.0,  1.0,  0.0,
      -1.0,  1.0,  0.0,
    1.0, -1.0,  0.0,
      -1.0, -1.0,  0.0
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  squareVertexPositionBuffer.itemSize = 3;
  squareVertexPositionBuffer.numItems = 4;
  
  squareVertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
  colors = []
  for (var i=0; i < 4; i++) {
    colors = colors.concat([0.5, 0.5, 1.0, 1.0]);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  squareVertexColorBuffer.itemSize = 4;
  squareVertexColorBuffer.numItems = 4;
}



var rTri = 0;
var rSquare = 0;

var theta_0 = Math.PI/16;
var g = 9.80665;
var count;
var theta = [];
var length = [];
var zvalue = [];

var drawLines = false;

function drawScene() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
  
  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, [0, 10, -38]);
  //mat4.rotate(mvMatrix, degToRad(90), [0,1,0]);
  
  //mat4.translate(mvMatrix, [-1.5, 0.0, -7.0]);
  
  var ytrans = 13;

  // draw circle
  gl.useProgram(shaderProgram);
  for (var i = 0; i < count; ++i) {
    mvPushMatrix();
    mat4.translate(mvMatrix, [0.0, ytrans, zvalue[i]]);
    mat4.rotate(mvMatrix, theta[i], [0, 0, 1]);
    mat4.translate(mvMatrix, [0, -length[i], 0]);

    mat4.scale(mvMatrix, [0.5, 0.5, 0.5]);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, circleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexColorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, circleVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_FAN, 0, circleVertexPositionBuffer.numItems);
    mvPopMatrix();
  }
  
  // draw lines
  gl.useProgram(lshaderProgram);
  for (var i = 0; drawLines && i < count; ++i) {
    mvPushMatrix();
    mat4.translate(mvMatrix, [0.0, ytrans, zvalue[i]]);
    mat4.rotate(mvMatrix, theta[i], [0, 0, 1]);
    mat4.translate(mvMatrix, [0, -length[i], 0]);

    mat4.scale(mvMatrix, [1.0, length[i], 1.0]);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, lineVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexColorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, lineVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    setMatrixUniforms();
    gl.lineWidth(0.5);
    gl.drawArrays(gl.LINES, 0, lineVertexPositionBuffer.numItems);
    mvPopMatrix();
  }
  
  /*          // draw triangle
              mvPushMatrix();
              mat4.rotate(mvMatrix, degToRad(rTri), [0, 1, 0]);
              
              gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
              gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
              
              gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
              gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, triangleVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
              
              setMatrixUniforms();
              gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
              mvPopMatrix();
  */        
  /*          // draw square
              mat4.translate(mvMatrix, [3.0, 0.0, 0.0]);
              
              mvPushMatrix();
              mat4.rotate(mvMatrix, degToRad(rSquare), [1, 0, 0]);
              
              gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
              gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
              
              gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
              gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
              
              setMatrixUniforms();
              gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
              
              mvPopMatrix();
  */
}


var lastTime = 0;
var timeStart;
var timeFactor = 0.3;

function animate() {
  var timeNow = new Date().getTime();
  if (lastTime != 0) {
    var elapsed = timeNow - lastTime;
    
    rTri += (90 * elapsed) / 1000.0;
    rSquare += (75 * elapsed) / 1000.0;

    var t = (timeNow - startTime) * timeFactor;
    for (var i = 0; i < count; ++i) {
      // Infinite series
      var period = 2*Math.PI*Math.sqrt(length[i]/g)*(1 + (1/16.0)*theta_0*theta_0 + (1/3072.0)*theta_0*theta_0*theta_0*theta_0);
      theta[i] = theta_0 * Math.cos(2*Math.PI*degToRad(t)/period);
    }
  }
  lastTime = timeNow;
}


function handleKeyDown(event) {
  if (String.fromCharCode(event.keyCode) == "L") {
    drawLines = !drawLines;
  } else if (String.fromCharCode(event.keyCode) == "F") {
    var timeNow = new Date().getTime();
    startTime = -((timeNow - startTime) / 1.1 - timeNow);
    timeFactor = timeFactor * 1.1;
  } else if (String.fromCharCode(event.keyCode) == "D") {
    var timeNow = new Date().getTime();
    startTime = -((timeNow - startTime) / 0.9 - timeNow);
    timeFactor = timeFactor * 0.9;
  }
}

function tick() {
  requestAnimFrame(tick);
  drawScene();
  animate();
}


function webGLStart() {
  var canvas = document.getElementById("pendulum-canvas");
  initGL(canvas);
  initShaders()
  initBuffers();
  
  // gl.clearColor(0.878, 0.878, 0.878, 1.0);
  gl.enable(gl.DEPTH_TEST);
  
  // Number of oscillations before all pendulums line
  // back up.
  var osc = 52;
  var L0 = 8;
  // var T0 = 2 * Math.PI * Math.sqrt(L0) / Math.sqrt(g);

  // osc*T0 = (osc-1)*T1
  // T0/T1 = (osc-1)/osc = sqrt(L0)/sqrt(L1)
  // sqrt(L1) = sqrt(L0) * osc/(osc-1)
  // L1 = L0*osc*osc/((osc-1)*(osc-1))
  // Li = L0*osc*osc/((osc-i)*(osc-i))

  // length[0] is the shortest pendulum with a period
  // of T0 seconds.  length[1] is the second shortest
  // with a period of 
  // (osc-i) * Ti = time for pendulum i to complete cycle
  count = 30;
  //var offset = 8;
  for (var i = 0; i < count; ++i) {
    theta.push(0);
    length.push(L0*osc*osc/((osc-i)*(osc-i)));
    //length.push(offset + offset*(1/14.0)*i);
    zvalue.push(-count/2 + i);
  }

  document.onkeydown = handleKeyDown;

  startTime = new Date().getTime();
  tick();
}
