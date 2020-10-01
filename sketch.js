//variables
let PLAY = 1;
let END = 0;
let gameState = PLAY; 
let monkey , monkey_running
let banana ,bananaImage, obstacle, obstacleImage;
let ground, ground2,groundImage,floor;
let score = 0;
let score2 = 0;
let gameover,gameOverImage;
let restart,restartImage;
//let score3 = 0;
//let bensound;

function preload(){
  //loading Animation
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //loading Images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("jungle.jpg");
  gameOverImage = loadImage("gameover.jpg");
  restartImage = loadImage("restart.png");
  invisibleGround = loadImage("jungle.jpg");
  
  //loading sounds
  //bensound = loadSound("bensound.mp3");
}

function setup() {
  //creating canvas
  createCanvas(600,400);
  
  //calling functions
  ground_image();
  monkey_image();
  spawnObstacles();
  banana_image();
  game_over();
  restart_image();
  reset();
  restart_1();
  
  //floor
  floor = createSprite(380, 396, 12000, 10);
  floor.scale = 0.75;
  floor.shapeColor = ("white");
  floor.visible = false;

}

  function draw() {
  background("black");
  monkey.collide(floor);
    
  //Animation for the movement of background
  if (ground.x < 100) {
      ground.x = ground.width/2;
  }
  
  else if (ground2.x < 200) {
      ground2.x = ground2.width;
    
  }
   //Adding gameStates
    if(gameState === PLAY){
      console.log("Hello there"); 
      ground.velocityX = -(6 + 3*score/1000);
      obstacle.velocityX = -(6 + 3*score/1000);
      score = score + Math.round(frameCount/60);
      restart_1();
      //bensound.play();
      gameover.visible = false;
      restart.visible = false;
    }
    
    else if(gameState === END){
        score = 0;
        score2 = 0;
        console.log("Try Again");
        reset();
        gameover.visible = true;
        restart.visible = true;
      
      if(mousePressedOver(restart)){
        restart_1();
        console.log("All The Best User");
           
    }
      
    }
    
    
    if(score > 1000){
      ground.velocityX = -(6 + 3*score/1000);
      obstacle.velocityX = -(6 + 3*score/1000);
      
    }
    //Jumping 
  if((keyWentDown("space") && monkey.y >=160)) {
      monkey.velocityY = -12;
      gameState = PLAY;
  }
    
     monkey.velocityY = monkey.velocityY + 1.5;
    
     if(monkey.isTouching(obstacle)){
      reset();   
    }
    
     else if (monkey.isTouching(banana)){
        banana.destroy();
       banana_image();
       banana.y = Math.round(random(120,200));
       score2 = score2 + 1;
    }
    
    //generating random position of obstacle
    if (obstacle.x < 0 || obstacle.x > 600 ){
        obstacle.x = Math.round(random(580,400));
    }
    
    //generating random position of banana
    if (banana.x < 0 || banana.x > 600){
        banana_image();
        banana.y = Math.round(random(120,200));
    }
    
    
  //drawing sprites
  drawSprites();
    
  //Survival time
  stroke("black");
  textSize(20);
  fill("black");
  text("SurvivalTime : " + score,200,25);
    
  stroke("black");
  textSize(20);
  fill("black");
  text("Bananas collected : " + score2,400,25);
    
  stroke("black");
  textSize(20);
  fill("black");
  text("press space simultaneously to restart",200,200);
  
}

//adding Global variables
function ground_image(){
  //ground
  ground = createSprite(300,200,600,400);
  ground.addImage("jungle.jpg",groundImage);
  
  //Giving ground multiple addition of velocity of ground   
  ground.velocityX = -5;
  ground.x = ground.width;
  ground.scale = 2.0;
  
  //ground2
  ground2 = createSprite(300,200,600,400);
  ground2.addImage("jungle.jpg",groundImage);
  ground2.velocityX = -5;
  ground2.x = ground.width;
  ground2.scale = 2.0;
  
}

function monkey_image(){
    //monkey 
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.105;
  
}

function spawnObstacles() {
    obstacle = createSprite(350,350,20,20);
    
  //obstacle
  obstacle.velocityX = -6;
  obstacle.addImage("obstacle.png",obstacleImage);
  obstacle.scale = 0.25;
  //giving user difficulty multiple addition of velocity of ground
  obstacle.velocityX = -5;

}
function banana_image(){
  //banana
  banana = createSprite(350,100,20,20);
  banana.addImage("banana.png",bananaImage);
  banana.scale = 0.105;
  
}

 function game_over(){
  //gameover
 gameover = createSprite(300,200,600,600);
 gameover.addImage("gameover.jpg",gameOverImage);
 gameover.scale = 1.0;
   
 }
function reset(){
  //stopping game when monkey touches obstacles
  score = 0;
   gameState = END;
  gameover.visible = true;
  restart.vsible = true;
  banana.velocityX = 0;
  obstacle.velocityX = 0;
  ground.velocityX = 0;
  //gameover.visible = true;
  //restart.visible = true;
 
}

function restart_1(){
  //restarting the game
  banana.velocityX = -4;
  obstacle.velocityX = -4;
  ground.velocityX = -5;
  gameover.visible = false;
  gameState = PLAY;
}

function restart_image(){
  //restart icon 
 restart = createSprite(350,350,20,20);
 restart.addImage("restart.png",restartImage)
 restart.scale = 0.095;
}