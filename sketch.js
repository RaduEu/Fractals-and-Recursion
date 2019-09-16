let flag = 0;

function setup() {
  createCanvas(1000, 1000);
}

function mousePressed() {
  flag++;
  if (flag == 3) flag = 0;
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  //push();
  // fill(0);
  if (flag == 0) {
    stroke(0);
    kotch(0, 0, 256);
  } else if (flag == 1) {
    noStroke();
    fractalCircle(false, 256);
  } else if (flag == 2) {
    push();
    fractalCircle2(false, 256);
    pop();
  }
}

function fractalCircle(white, size) {
  if (size < 1) return;
  let factor = 1.001 + mouseX / width;
  if (white) fill(255);
  else fill(0);
  noStroke();
  circle(0, 0, size);
  fractalCircle(!white, size / factor);
}

function fractalCircle2(white, size) {
  if (size < 1) return;
  let factor = 1.001 + mouseX / width;
  //factor = 2;
  let angle = 2 * PI * mouseY / height;
  if (white) fill(255);
  else fill(0);
  noStroke();
  circle(0, 0, size);
  push();
  rotate(angle);
  translate(size / 4, 0);
  fractalCircle2(!white, size / factor);
  pop();
  //push();
  // rotate(angle);
  //fractalCircle2 (x-size/4,y, !white , size/factor);
  //pop();
}

function kotch(x, y, size) {
  let factor = mouseX * 5 / width;
  let vectors = [];
  vectors[0] = new myLine(x + size * sin(4 * PI / 3), y + size * cos(4 * PI / 3), x + size * sin(0), y + size * cos(0), 0);
  vectors[1] = new myLine(x + size * sin(0), y + size * cos(0), x + size * sin(2 * PI / 3), y + size * cos(2 * PI / 3), 0)
  vectors[2] = new myLine(x + size * sin(2 * PI / 3), y + size * cos(2 * PI / 3), x + size * sin(4 * PI / 3), y + size * cos(4 * PI / 3), 0)
  let vec = nextKotchStep(vectors);
  while (factor > 0) {
    factor--;
    vec = nextKotchStep(vec);
  }
  for (let v of vec) v.show();
}

function nextKotchStep(vectors) {
  let ret = [];
  for (let v of vectors) {
    v.initChildren();
    for (let ch of v.children) ret.push(ch);
  }
  return ret;
}