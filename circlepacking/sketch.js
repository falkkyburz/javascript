
class Circle {
  constructor( x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    if ( c ) {
      this.c = c;
    }
    else {
      this.c = color(random() * 255, random() * 255, random() * 255)
    }
  }
  
  show() {
    stroke( 255 );
    strokeWeight( 1 );
    //noFill();
    fill(this.c)
    ellipse( this.x, this.y, this.r*2, this.r*2);
  }
  
  grow() {
    this.r = this.r + 1;
  }
  
  incanvas() {
    return ( this.x + this.r < width && 
         this.x - this.r > 0 &&
         this.y + this.r < height &&
         this.y - this.r > 0 )
  }
  
  // Check if we overlap with another circle.
  overlaps( co ) {
    return dist( co.x, co.y, this.x, this.y ) < (this.r + co.r);

  }
  
  isvalid( clist ) {
    let valid = false;
    if ( this.incanvas() ) {
      valid = true;
      for ( let c of clist ) {
        if ( c != this && this.overlaps(c) ) {
          valid = false;
          break;
        }
      }
    }
    return valid;
  }
  
}

let circles = [];

function setup() {
  createCanvas( 640, 360 );
  
  // seed the first circle
  circles.push(new Circle(320,180, 100));

}

function draw() {
  background( 0 );
  
  // Try to add a new circle.
  let cnew = new Circle( random( width ), random( height ), 2);
  
  // Check if the circle is valid
  
    if ( cnew.isvalid(circles) ) {
      circles.push( cnew );
    }
  
  
  // Grow the circles
  for ( let c of circles ) {
    if ( c.isvalid(circles) ) {
      c.grow();   
    }
  c.show();
  }


}
