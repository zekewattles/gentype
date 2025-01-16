let ratio = 1/3;
let canvas, canvasDiv, w, h, font, points, bounds;
let words = "Generative Typography is a creative coding course taught by Zeke Wattles at ArtCenter College of Design. Through focused exercises, students learn to build custom code-based tools for graphic design and integrate them into larger identity systems. ";

function preload() {
  font = loadFont("FragmentMono-Regular.ttf");
}

function setup() {
  describe("GenType");
  canvasDiv = document.getElementById("canvasContainer");
  w = canvasDiv.offsetWidth;
  h = canvasDiv.offsetWidth * ratio;
  canvas = createCanvas(w, h).parent("canvasContainer");
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
    textFont(font, 14);
    text(
      words[i % words.length],
      points[i].x * multiplier,
      points[i].y * multiplier,
    );
  }
}

function windowResized() {
  canvasDiv = document.getElementById("canvasContainer");
  w = canvasDiv.offsetWidth;
  h = canvasDiv.offsetWidth * ratio;
  resizeCanvas(w, h);
}