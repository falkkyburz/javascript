function setup() {
  let xx = 800;
  let yy = 800;
  let nmax = 100;
  
  let min = 1.5;
  let max = 1.5;
  
  createCanvas(xx, yy);
  
  colorMode(HSB, nmax);
  
  for (let x = 0; x < xx; x++) {
    for (let y = 0; y < yy; y++) {
      
      var a = map(x, 0, xx, -min, max);
      var b = map(y, 0, yy, -min, max);
      var ca = a;
      var cb = b;
      
      var n = 0;
      var z = 0;
      while (n < nmax) {
        var aa = a * a - b*b;
        var bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a + b > 16) {
          break;  
        }
        n++;     
      }
      
      if (n === nmax){
        set(x, y, color(0,0,0));
      }
      else {
        var bright = map(n, 0, nmax, 0, 1);
        set(x, y, color(map(sqrt(bright), 0, 1, 0, 100), 100, 100));  
      }
      
      
        
      
      
    }
  }
  
  updatePixels();
  
}

function draw() {
  
}
