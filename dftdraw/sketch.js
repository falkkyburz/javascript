// https://en.wikipedia.org/wiki/Discrete_Fourier_transform Eq. 1
const USER = 0;
const FOURIER = 1;
let x = [];
let fourierX;
let time = 0;
let path = [];
let state = -1;


function setup() {
  createCanvas(800, 800);
  noFill();
}

function draw() {
  background(0);
  strokeWeight(2);

  if (state == USER) {
    x.push(math.complex(mouseX - width / 2, mouseY - height / 2));
    stroke(255);
    beginShape();
    for (let v of x) {
      vertex(v.re + width / 2, v.im + height / 2);
    }
    endShape();
  }
  else if (state == FOURIER) {
    let v = epicycles(width / 2, height / 2, 0, fourierX);
    path.unshift(v);
    beginShape();
    for (let i = 0; i < path.length; i++) {
      vertex(path[i].x, path[i].y);
    }
    endShape();
    // increment time
    const dt = TWO_PI / fourierX.length;
    time += dt;
    if (time > TWO_PI) {
      time = 0;
      path = [];
    }
  }
}


function mousePressed() {
  state = USER;
  drawing = [];
  x = [];
  time = 0;
  path = [];
}

function mouseReleased() {
  state = FOURIER; 
  fourierX = dft(x);
  fourierX.sort((a, b) => b.amp - a.amp);
}

function epicycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(255, 100);
    ellipse(prevx, prevy, radius * 2);
    stroke(255);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}


function dft(x) {
  const X = [];
  const N = x.length
  for (let k = 0; k < N; k++) {
    let sum = math.complex(0, 0);
    for (let n = 0; n < N; n++) {
      const phi = (TWO_PI * k * n) / N;
      const c = math.complex(cos(phi), -sin(phi));
      sum = math.add(sum, math.multiply(x[n], c));
    }
    sum = math.divide(sum, N);
    let freq = k;
    let amp = math.abs(sum);
    let phase = math.arg(sum);
    X[k] = { re: sum.re, im: sum.im, freq, amp, phase };
  }
  return X;
}
  