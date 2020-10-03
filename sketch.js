
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var gameState="play"

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}
 var survivalTime=0;



function setup() {
  createCanvas(400,400);
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  console.log(ground.x)

  foodGroup = new Group();
  obstaclesGroup = new Group()
 
  
}


function draw() {
  
  background(255);
  
    if(gameState==="play"){
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
    
      if(monkey.isTouching(foodGroup)){
      survivalTime = survivalTime+1;
      foodGroup.destroyEach();
    }
 
  
    if(obstaclesGroup.isTouching(monkey)){
      gameState="end"
    }
    }
  else if(gameState==="end"){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
    
  }
    drawSprites();

  
  stroke("black");
  textSize(20);
  fill("black");
 text("Survival Time: "+ survivalTime, 100,50);


}

function spawnFood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}
