let label = 'waiting..';
let classifier;
const options = {probabilityThreshold: 0.7};


// preloading the model
function preload() {
  classifier = ml5.soundClassifier('SpeechCommands18w', options);
}


let snake;
let rez = 20;
let food;
let w;
let h;
let score = 0;

function setup() {
  createCanvas(640, 520);
  

  // classifying voice
  classifyAudio();
  
  w = floor(width/rez);
  h = floor(height/rez);
  frameRate(5);
  snake = new Snake();
  locateFood();
}

// classifying voice function
function classifyAudio() {
  classifier.classify(gotResults);
}

function locateFood(){
  food = createVector(floor(random(w)), floor(random(h)));
}

function controlSnake(){
  if (label === "left"){
    snake.changeDir(-1, 0);
  }
  else if (label === "right"){
    snake.changeDir(1, 0);
  }
  else if (label === "up"){
    snake.changeDir(0, -1);
  }
  else if (label === "down"){
    snake.changeDir(0, 1);
  }
}

function draw() {
  background(220);
  textSize(32);
  fill(0);
  text(score, 10, 50);
  scale(rez);
  if(snake.foodAte(food)){
    locateFood();
    score++;
  }
  snake.update();
  snake.show();
  if(snake.endGame()){
    background(255, 0, 0);
  noLoop();
  }
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

// classification results
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  controlSnake();
}
