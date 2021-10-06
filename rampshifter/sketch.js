
var slider_ph;

function setup() {
  createCanvas(1000, 600);
  
  slider_ph = createSlider(0, 1, 0, 0.01);
  
}

function draw() {
  background(0);
  translate(0, height)
  stroke(255);
  strokeWeight(2);
  
  let num = 1000;
  let per = 200;
  let amp = 200;
  let step = amp / per;
  let phase = slider_ph.value();
  
  time = [0];
  saw0 = [0];
  saw1 = [0];
  
  for (var i = 1; i <= num; i++) {
    let y0 = i%per * step;
    let y1 = (y0 + phase * amp) % amp; 
    time.push(i);
    saw0.push(y0);    
    saw1.push(y1);    
    
    // top
    stroke(255);
    line(time[i-1], -saw0[i-1]-200-phase*amp, i, -y0-200-phase*amp);
    // bottom
    if (y0 + phase * amp > 200){
      stroke("red");
    }
    else {
      stroke(255);
    }
    line(time[i-1], -saw1[i-1], i, -y1);
    stroke(255);
    line(time[i-1], -amp-200, i, -amp-200);  
    line(time[i-1], -200, i, -200); 
  }
}
