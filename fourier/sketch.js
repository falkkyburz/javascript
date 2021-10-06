let angle = 0;
let wave_y = [];
let wave_x = [];

let slider_n;
let slider_s;
let slider_f0;
let select_w;


function sqare(n){return (((n + 1) % 2) ? 0.0 : 1.0) / n;}
function tri(n){ if (!(n % 2)) return 0; return ((n % 4 === 1) ? 1 : -1) / (n * n);}
function saw(n){ return ((n % 2) ? -1 : 1) / (n + 1); }
function fib(n) {
  var fst = 0.01, sec = 0.01, add;
  for (var i = 0; i < n; i++) {
    add = fst + sec;
    fst = sec;
    sec = add;
  }
  return add;
}
function pulse(n) {return 0.1; }







function setup() {
  createCanvas(1200, 800);
  
  createSpan("harmonics");
  slider_n = createSlider(2, 50, 5, 1);
  createSpan("scale");
  slider_s = createSlider(50, 500, 150, 10);
  createSpan("frequency");
  slider_f0 = createSlider(0.1, 2, 0.25, 0.01);
  
  select_w = createSelect();
  select_w.option('square', 0);
  select_w.option('triangle', 1);
  select_w.option('sawtooth', 2);
  select_w.option('fibonacci', 3);
  select_w.option('pulse', 4);

}


function draw() {
  background(0);
  translate(250, height/2)
  strokeWeight(2);
  
  let fps = (!frameRate() ? 30: frameRate())
  let x = 0;
  let y = 0;
  let xmem = 0;
  let ymem = 0;
  let amp = 0;
  let scale = slider_s.value();
  
  for (let n = 1; n<slider_n.value(); n++){

    switch (Number(select_w.value())){
      case 0: amp = scale * sqare(n); break;
      case 1: amp = scale * tri(n); break;
      case 2: amp = scale * saw(n); break;
      case 3: amp = scale * fib(n); break;
      case 4: amp = scale * pulse(n); break;
    }
    
    x += amp * cos(n * angle);
    y += amp * sin(n * angle);

    stroke(255, 20);
    noFill();
    circle(xmem, ymem, amp * 2);
    
    stroke(255);
    fill(255);
    line(xmem, ymem, x, y)
    //circle(x, y, 4)
    
    xmem = x;
    ymem = y;
    
  }
  wave_y.unshift(y);
  wave_x.unshift(x);
  
  // keep array length short
  if (wave_y.length > width - 500 -100) {
      wave_y.pop();
  }
  if (wave_x.length > fps/slider_f0.value()) {
      wave_x.pop();
  }
  
  // draw horizontal line
  translate(300, 0);
  line(x-300, y, 0, wave_y[0]);
  
  // draw waveform
  beginShape();
  noFill();
  for (let i = 0; i< wave_y.length; i++){
    vertex(i, wave_y[i]);
  }
  endShape();
  
  // draw sling line
  beginShape();
  noFill();
  stroke(255, 100);
  for (let i = 0; i< wave_x.length; i++){
    vertex(wave_x[i]-300, wave_y[i]);
  }
  endShape();
 
  // increase angle for next frame
  angle -= 2 * PI * slider_f0.value() / fps;

}