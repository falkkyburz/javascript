class Branch {
  constructor(begin, end) {
    this.begin = begin;
    this.end = end;
  }
  
  
  draw() {
    stroke(255);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }
  
  branch(angle, grow=1) {   
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(angle);
    dir.mult(grow);
    return new Branch(this.end, p5.Vector.add(this.end, dir));
  }
  
  length() {
    return p5.Vector.sub(this.end, this.begin).mag();
  }
}

var limit;
var angle;
var length;
var growth;
var balA;
var balG;

let tree = [];

function setup() {
  createCanvas(800, 800);

  createSpan('A');
  angle = createSlider(0, HALF_PI, PI/6, 0.01);
  createSpan('Lim');
  limit = createSlider(1, 100, 1, 1);
  createSpan('L');
  length = createSlider(1, 300, 150);
  createSpan('G');
  growth = createSlider(0.1, 2, 2/3.0, 0.01);
  createSpan('BalA');
  balA = createSlider(0, 1, 0.5, 0.01);
  createSpan('BalG');
  balG = createSlider(0, 1, 0.5, 0.01);
  
  
  

}

function draw() {
  background(0);
  
  let begin = createVector(width / 2, height*0.8);
  let end = createVector(width / 2, height*0.8 - length.value());
  
  tree.length = 0;
  tree.push( new Branch(begin, end));
  
  growBranch(1);
  
  
  for (let br of tree) {
      br.draw();
  }
}


function growBranch(n) {
  rb = tree[n-1].branch(angle.value()*balA.value()*2, growth.value()*balG.value()*2);
  cb = tree[n-1].branch(0,growth.value());
  lb = tree[n-1].branch(-angle.value() * (1 - balA.value())*2, growth.value()*(1-balG.value())*2);
  if (rb.length() < limit.value() || rb.length() < limit.value()) {
    return
  }  
  tree.push(rb);
  tree.push(cb);
  tree.push(lb);
  try {
    growBranch( n+1 );
  }
  catch (e) {
    return
  }
  
}

