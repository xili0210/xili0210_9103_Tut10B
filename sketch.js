let numRectangles = 25;
let rectangleWidth;
let rectangleHeight;
let lineRectangles = [];
let drawRectangles = true;
let lineSpacing = 10;
let charaBlocks = [];
let boundary = [];

let yellow;
let blue;
let beige;
let red;

let randomColors;

let changeMoodButton;

// Define variables for smiley movement
let smileySpeed = 5; // Adjust the speed as needed
let smileyDirectionX = 0;
let smileyDirectionY = 0;

// Define variable for pausing
let isPaused = false;

function setup() {
  createCanvas(500, 500);
  rectangleWidth = width / numRectangles;
  rectangleHeight = height / numRectangles;

  // Create a colors scheme for the rectangles
  yellow = color(236, 214, 38);
  blue = color(68, 105, 186);
  beige = color(217, 216, 211);
  red = color(176, 58, 46);

  // Create array of the color scheme
  randomColors = [yellow, blue, beige, red];

  // Define starting points for vertical lines
  let verticalStartX = [140, 220, 260, 380];

  // Define starting points for horizontal lines
  let horizontalStartY = [60, 260, 400];

  // Create horizontal lines
  for (let i = 0; i < horizontalStartY.length; i++) {
    let startY = horizontalStartY[i];
    for (let j = 0; j < numRectangles; j++) {
      let x = j * rectangleWidth;
      let y = startY;
      let horizontalLines = new Rectangle(x, y, rectangleWidth, rectangleHeight, random(randomColors));
      lineRectangles.push(horizontalLines);
    }
  }

  // Create vertical lines
  for (let i = 0; i < verticalStartX.length; i++) {
    let startX = verticalStartX[i];
    for (let j = 0; j < numRectangles; j++) {
      let x = startX;
      let y = j * rectangleHeight;
      let verticalLines = new Rectangle(x, y, rectangleWidth, rectangleHeight, random(randomColors));
      lineRectangles.push(verticalLines);
    }
  }

  // Character's width and height
  let charaWidth = random(20,50);
  let charaHeight = random(20,50);

  // Define each boundary with the start (x,y) points and end (x,y) points
  boundary.push({startX:0, startY:horizontalStartY[0]+rectangleWidth, endX:verticalStartX[0]-charaWidth, endY:horizontalStartY[1]-charaHeight});
  boundary.push({startX:0, startY:horizontalStartY[1]+rectangleWidth, endX:verticalStartX[0]-charaWidth, endY:horizontalStartY[2]-charaHeight});
  
  boundary.push({startX:verticalStartX[2]+rectangleWidth, startY:horizontalStartY[0]+rectangleWidth, endX:verticalStartX[3]-charaWidth, endY:horizontalStartY[1]-charaHeight});
  boundary.push({startX:verticalStartX[2]+rectangleWidth, startY:horizontalStartY[1]+rectangleWidth, endX:verticalStartX[3]-charaWidth, endY:horizontalStartY[2]-charaHeight});

  boundary.push({startX:verticalStartX[3]+rectangleWidth, startY:horizontalStartY[0]+rectangleWidth, endX:width-charaWidth, endY:horizontalStartY[1]-charaHeight});
  boundary.push({startX:verticalStartX[3]+rectangleWidth, startY:horizontalStartY[1]+rectangleWidth, endX:width-charaWidth, endY:horizontalStartY[2]-charaHeight});

  for(let i = 0; i < 3; i++){
    let randomBoundary = boundary[floor(random()*boundary.length)];
    //find index of the randomBoundary in the boundary array
    boundary.splice(boundary.indexOf(randomBoundary),1);

    let smileyX = random(randomBoundary.startX, randomBoundary.endX-30); 
    let smileyY = random(randomBoundary.startY, randomBoundary.endY-30);
    let mouthType = 1;

    charaBlocks.push({smileyX, smileyY, mouthType});
  }

  // Create buttons for controlling smiley movement
  createButton('↑').position(250, 20).mousePressed(moveUp);
  createButton('←').position(200, 50).mousePressed(moveLeft);
  createButton('↓').position(250, 80).mousePressed(moveDown);
  createButton('→').position(300, 50).mousePressed(moveRight);
  
  // Create button to pause and resume smiley movement
  createButton('Pause').position(20, 50).mousePressed(pauseResume);

  // Create button to change mood
  changeMoodButton = createButton('Change Mood');
  changeMoodButton.position(20, 20);
  changeMoodButton.mousePressed(changeMood);
}

function draw() {
  background(230, 213, 190);
  if (drawRectangles) {
    for (const rect of lineRectangles) {
      rect.draw();
    }
  }
  
  // Move smileys before drawing them
  if (!isPaused) {
    for(let chara of charaBlocks){
      // Move smiley based on direction
      chara.smileyX += smileyDirectionX;
      chara.smileyY += smileyDirectionY;

      // Check if smiley is out of bounds, adjust its position if necessary
      if (chara.smileyX < 0) {
        chara.smileyX = 0;
      } else if (chara.smileyX > width) {
        chara.smileyX = width;
      }
      if (chara.smileyY < 0) {
        chara.smileyY = 0;
      } else if (chara.smileyY > height) {
        chara.smileyY = height;
      }
    }
  }
  
  // Draw smileys after moving them
  for(let chara of charaBlocks){
    drawSmiley(chara.smileyX, chara.smileyY, chara.mouthType); // Draw smiley
  }
  
  stroke(0);
}

function drawSmiley(x, y, mouthType) {
  let smileySize = 60;

  fill(255, 255, 0); // Yellow
  rect(x - smileySize / 2, y - smileySize / 2, smileySize, smileySize);

  fill(0); // Black
  rect(x - smileySize / 5, y - smileySize / 10, smileySize / 10, smileySize / 10);
  rect(x + smileySize /   10, y - smileySize / 10, smileySize / 10, smileySize / 10);

  fill(255, 255, 0); // Yellow
  if (mouthType === 1) {
    rect(x - smileySize / 10, y + smileySize / 10, smileySize / 5, smileySize / 20);
  } else if (mouthType === 2) {
    ellipse(x, y + smileySize / 10, smileySize / 5, smileySize / 20);
  } else if (mouthType === 3) {
    triangle(x - smileySize / 20, y + smileySize / 10, x + smileySize / 20, y + smileySize / 10, x, y + smileySize / 5);
  } else if (mouthType === 4) {
    arc(x, y + smileySize / 10, smileySize / 5, smileySize / 10, 0, PI);
  }
}

class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}

function changeMood() {
  for(let chara of charaBlocks){
    chara.mouthType = int(random(1, 5)); // Randomize mouth type for each smiley
  }
}

// Function to handle key press events
function keyPressed() {
  if (!isPaused) { // Check if the movement is not paused
    if (keyCode === LEFT_ARROW) {
      moveLeft(); // Move smiley one step to the left
    } else if (keyCode === RIGHT_ARROW) {
      moveRight(); // Move smiley one step to the right
    } else if (keyCode === UP_ARROW) {
      moveUp(); // Move smiley one step upwards
    } else if (keyCode === DOWN_ARROW) {
      moveDown(); // Move smiley one step downwards
    }
  }
}

// Function to handle button clicks for smiley movement
function moveUp() {
  for(let chara of charaBlocks){
    chara.smileyY -= 30; // Move smiley upwards by 5 pixels
  }
}

function moveDown() {
  for(let chara of charaBlocks){
    chara.smileyY += 30; // Move smiley downwards by 5 pixels
  }
}

function moveLeft() {
  for(let chara of charaBlocks){
    chara.smileyX -= 30 ; // Move smiley to the left by 5 pixels
  }
}

function moveRight() {
  for(let chara of charaBlocks){
    chara.smileyX += 30 ; // Move smiley to the right by 5 pixels
  }
}


// Function to pause or resume smiley movement
function pauseResume() {
  isPaused = !isPaused; // Toggle pause state
}
// Function to check if smiley blocks overlap
function checkOverlap() {
  for (let i = 0; i < charaBlocks.length - 1; i++) {
    for (let j = i + 1; j < charaBlocks.length; j++) {
      if (dist(charaBlocks[i].smileyX, charaBlocks[i].smileyY, charaBlocks[j].smileyX, charaBlocks[j].smileyY) < 60) {
        return true; // Return true if smiley blocks overlap
      }
    }
  }
  return false; // Return false if smiley blocks do not overlap
}

function draw() {
  background(230, 213, 190);
  if (drawRectangles) {
    for (const rect of lineRectangles) {
      rect.draw();
    }
  }
  
  // Move smileys before drawing them
  if (!isPaused) {
    for(let chara of charaBlocks){
      // Move smiley based on direction
      chara.smileyX += smileyDirectionX;
      chara.smileyY += smileyDirectionY;

      // Check if smiley is out of bounds, adjust its position if necessary
      if (chara.smileyX < 0) {
        chara.smileyX = 0;
      } else if (chara.smileyX > width) {
        chara.smileyX = width;
      }
      if (chara.smileyY < 0) {
        chara.smileyY = 0;
      } else if (chara.smileyY > height) {
        chara.smileyY = height;
      }
    }
  }
  // Function to check if all smiley blocks overlap
function checkOverlap() {
  // Get the center coordinates of the first smiley block
  let centerX1 = charaBlocks[0].smileyX + 30;
  let centerY1 = charaBlocks[0].smileyY + 30;
  
  // Get the center coordinates of the second smiley block
  let centerX2 = charaBlocks[1].smileyX + 30;
  let centerY2 = charaBlocks[1].smileyY + 30;
  
  // Get the center coordinates of the third smiley block
  let centerX3 = charaBlocks[2].smileyX + 30;
  let centerY3 = charaBlocks[2].smileyY + 30;
  
  // Check if all three centers overlap
  if (centerX1 === centerX2 && centerX2 === centerX3 && centerY1 === centerY2 && centerY2 === centerY3) {
    return true;
  } else {
    return false;
  }
}

  // Check for smiley overlap
  if (checkOverlap()) {
    textSize(32);
    fill(0);
    text('You Win!', 200, 200);
    isPaused = true; // Pause the movement
  }
  
  // Draw smileys after moving them
  for(let chara of charaBlocks){
    drawSmiley(chara.smileyX, chara.smileyY, chara.mouthType); // Draw smiley
  }
  
  stroke(0);
}

