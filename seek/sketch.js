
class Particle {
  constructor( x, y ) {
    this.pos = createVector( x, y );
    this.vel = createVector( 0, 0 );
    this.acc = createVector( 0, 0 );
    this.frc = createVector( 0, 0 );
    this.maxVel = 4;
    this.maxFrc = 0.1;
    this.r = 16;
 
  }
  
  
  seek(target) {
    let force = p5.Vector.sub(target.pos, this.pos);
    force.setMag(this.maxVel);
    force.sub(this.vel);
    force.limit( this.maxFrc );
    this.frc = force;
  }
  
  update() {
    this.acc.add( this.frc );
    this.vel.add( this.acc );
    this.vel.limit( this.maxVel );
    this.pos.add( this.vel );
    this.acc.set( 0, 0 );
    this.frc.set( 0, 0 );
  }
  
  
  place(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }
  
  
}

class Vehicle extends Particle {
  constructor( x, y ) {
    super(x, y);
  }
  
  show() {
    stroke( "green" )
    fill( "green" );
    strokeWeight( 2 );
    push();
    translate( this.pos.x, this.pos.y );
    rotate(this.vel.heading());
    triangle( -this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0 )
    pop();
    
  }

}

class Target extends Particle {
  constructor( x, y ) {
    super(x, y);
  }
  
  show() {
    stroke( "red" );
    fill( "red" );
    strokeWeight( 2 );
    
    circle(this.pos.x, this.pos.y, this.r = 16)
  }


  
}

let myvehicle;
let mytarget;
let slider_speed;

function setup() {
  createCanvas( 800, 800 );
  
  slider_speed = createSlider(1, 10, 4);
  slider_speed.position(0 , height);
  text_speed = createDiv();
  text_speed.position(150 , height);
  slider_force = createSlider(1, 20, 5);
  slider_force.position(200 , height);
  text_force = createDiv();
  text_force.position(350 , height);

  
  target = new Target( 100, 200 );
  vehicle = new Vehicle( 100, 150 );
  

  
}

function draw() {
  background(0);
  
  
  if (p5.Vector.sub( target.pos, vehicle.pos ).mag() < 5 ) {
    target.place( random( width - 200 ) + 100, random( height - 200) + 100 );
  }
  
  target.update();
  target.show();

  vehicle.maxVel = slider_speed.value();
  text_speed.html('S=' + slider_speed.value());
  vehicle.maxFrc = slider_force.value() / 100;
  text_force.html('F=' + slider_force.value());
  
  vehicle.seek(target);
  vehicle.update();
  vehicle.show();

}

function mouseClicked() {
  //target.place(mouseX, mouseY)
}
