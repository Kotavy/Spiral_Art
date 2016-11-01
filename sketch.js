/* Spiral Art Generator version 1 - 10-31-16 by Tavius Koktavy.
 * For David Rios' "Creative Computing" - NYU Tisch Fall 2016.
 * Based on code tutorials at http://www.genekogan.com/code/p5js-transformations/
 * Image data from the default camera (webcam) is manipulated by pixel data
 * transformations through perlin noise.
 * Responds to varying light conditions, try shining your phone light at the camera!
 * The 'a' and 's' keys change the threshold to blow out the screen manually.
 */



var mirror;
var img;
var img2;
var r;
var g;
var b;
var a;
var thresh = 0;



function setup() {
  createCanvas(800, 800);
  mirror = createCapture(VIDEO);
  mirror.size(0, 0); // Camera test
  
  img = createImage(100, 300);
  img2 = createImage(32, 24);
  imageMode(CENTER);
}



function draw() {
  
  var ang1 = TWO_PI * noise(0.01*frameCount + 10);		
  var ang2 = TWO_PI * noise(0.01*frameCount + 20);
  var ang3 = TWO_PI * noise(0.009*frameCount + 30);
  var rx = 12 * noise(0.015*frameCount + 10);
  var tx = 200 * noise(0.009*frameCount + 50);
  var size1 = 200 * noise(0.02*frameCount + 60);
  var size2 = 50 * noise(0.01*frameCount + 60);

  background(0);
  mirror.loadPixels();
  img.loadPixels();
  img2.loadPixels();

  for(var i = 0; i < mirror.pixels.length; i+=4) {
    r = mirror.pixels[i];
    g = mirror.pixels[i+1];
    b = mirror.pixels[i+2];
    a = mirror.pixels[i+3];
    
    //If statement to adjust 'bluescreen'
    if (r > thresh && g > thresh && b > thresh) {
      r = 220;
      g = 220;
      b = 220;
    }

    img.pixels[i] = r^a;
    img.pixels[i+1] = b;
    img.pixels[i+2] = g+5;
    img.pixels[i+3] = a/2;
    
    img2.pixels[i] = b^g;
    img2.pixels[i+1] = b;
    img2.pixels[i+2] = r;
    img2.pixels[i+3] = a;
  }

  img.updatePixels();
  img2.updatePixels();
  translate(width/2, height/2);
  
  for (var i=0; i < 10; i++) {
    push();
    rotate(ang1 + TWO_PI * i / 10);
    translate(tx, tx/3);
    image(img, size1, size2);
    for (var j = 0; j < 60; j++) {
      push();
      rotate(ang2 + TWO_PI * j / 60);
      rotate(sin(PI));
      translate(tx, rx/2);
      image(img2, size1, size2);
      pop();
    }
    translate();
    pop();
  }
}



function keyTyped() {
  if (key == 'a') {
    thresh -= 5;
  }
  if (key == 's') {
    thresh += 5;
  }
}
