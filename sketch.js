let ratio = 0.4375;
let canvas;
let canvasDiv;
let w, h;

let font;
let points;
let bounds;
let words =
  "Generative Typography is a 14-week ArtCenter course on p5.js. Through a series of demos, students learn to build their own code-based tools for graphic design and incorporate them into their other school or personal projects. The goal is for students to build their coding confidence and start thinking more systematically about design. ";
let letters = [];

function preload() {
  font = loadFont("FragmentMono-Regular.ttf");
}

function setup() {
  describe("GenType");
  canvasDiv = document.getElementById("canvasContainer");
  w = canvasDiv.offsetWidth;
  h = canvasDiv.offsetWidth * ratio;
  canvas = createCanvas(w, h).parent("canvasContainer");

  letters = words.split("");
  word = " " + "GenType" + " ";
}

function draw() {
  background(0);

  let density = map(mouseX, 0, width, 2, 0.1);
  density = constrain(density, 0.1, 2);

  points = font.textToPoints(word, 0, 0, 10, {
    sampleFactor: density,
    simplifyThreshold: 0,
  });
  bounds = font.textBounds(word, 0, 0, 10);
  let multiplier = width / bounds.w;
  translate(0, height / 2 + (bounds.h * multiplier) / 4);

  for (let i = 0; i < points.length; i++) {
    fill(255);
    textFont(font, 16);
    text(
      letters[i % letters.length],
      points[i].x * multiplier,
      points[i].y * multiplier + sin(frameCount * 0.02 + points[i].x * 0.1) * 10,
    );
  }
}

function windowResized() {
  canvasDiv = document.getElementById("canvasContainer");
  w = canvasDiv.offsetWidth;
  h = canvasDiv.offsetWidth * ratio;
  resizeCanvas(w, h);
}
