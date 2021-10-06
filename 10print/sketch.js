let x = 0;
let y = 0;
let s = 40;


function setup() {
  createCanvas(800, 800);
  background(0);
  slider = createSlider(0, 10, 5);
  slider.position(0, 800)
  slider_text = createDiv();
  slider_text.position(150, 800)
  
  
}


function draw() {
  stroke ( 255 );
  strokeWeight( 2 );
  
  let prob = slider.value();
  slider_text.html('P=' + prob)
  
  // draw lines
  if ( random( 1 ) < prob / 10 ){
    line( 0 + x, 0 + y, s + x, s + y );
  }
  else
  {
    line( 0 + x, s + y, s + x, 0 + y);
  }
  
  // advance
  x = x + s;
  if ( x > width ) {
    y = y + s;
    x = 0;
  }
  if ( y > height ) {
    y = 0;
    background(0);
  }
  
  
  
  
}