
//var variables = ["F", "+", "-", "[", "]"]
var axiom = "F"
var rule = {a:"F", b:"FF+[+F-F-F]-[-F+F+F]"}
var sentence = axiom;

var angle = 25
var len = 100

var p;
var inp;

function turtle() {
  background(0);
  resetMatrix();
  translate(width/2, height);

  stroke(255, 100)
  for (let ch of sentence) {
    if (ch == "F") {
      line(0, 0, 0,-len);
      translate(0, -len);
    } else if (ch == "+") {
      rotate(radians(angle));
    } else if (ch == "-") {
      rotate(radians(-angle));
    } else if (ch == "[") {
      push();
    } else if (ch == "]") {
      pop();
    }
  }
}


function generate() {
  rule.b = inp.value();
  len *= 0.55;
  var nextSentence = "";
  for (let ch of sentence) {
    if (ch == rule.a) {
      nextSentence += rule.b;  
    }
    else {
      nextSentence += ch;
    }
  }
  sentence = nextSentence;
  p.html(sentence)
  turtle();
}

function myreset() {
  clear();
  background(0);
  sentence = axiom;
  len = 100;
  turtle();
}



function setup() {
  createCanvas(800, 800);
  background(0);
  
  inp = createInput(rule.b);
  
  button = createButton('generate');
  button.mousePressed(generate);
  
  button1 = createButton('reset')
  button1.mousePressed(myreset);
  

  turtle();
  p = createP(axiom);
}



