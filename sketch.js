var PLAY = 1;

var END = 0;

var gameState = PLAY;
 
var monkey , monkey_running

var banana ,bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup

var survivaltime

var highestsurvivaltime = 0;

var gameOverImg,restartImg



function preload(){
  monkey_running =loadAnimation
  ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
}


function setup() {
  createCanvas(600, 200);

  
  monkey = createSprite(50,160,20,50);
  
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.08;
  
  ground = createSprite(200,180,400,20);
  
  ground.x = ground.width/2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  
  invisibleGround.visible = false; 
   
  //create Obstacle and Food Groups
  obstaclesGroup = new Group();
   
  FoodGroup = new Group();

   
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false
  
  survivaltime = 0;
  
}

function draw(){
  
  background(180);
  //displaying score
  text("survivaltime: "+ survivaltime, 500,50);
  text("highestsurvivaltime: "+ highestsurvivaltime, 200,50);

  
  if(gameState === PLAY){

    
    ground.velocityX = -(4 + 3* survivaltime/100)
    //scoring
    survivaltime = survivaltime + Math.round(frameRate()/30);


    if(survivaltime>0 && survivaltime%100 === 0){
       
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the bananas
    spawnbanana();
  
    //spawn obstacles on the ground
    spawnObstacles();

    
    if(obstaclesGroup.isTouching(monkey)){
        monkey.velocityY = -12;
        
        gameState = END;
                    
    }
    


  }
   else if (gameState === END) {
     
    
     
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);   
     
    if(survivaltime > highestsurvivaltime){
    highestsurvivaltime = survivaltime;
  }
   } 
  
 
  //stop trex from falling down
  monkey.collide(invisibleGround);
  
   
      
    
    


  drawSprites();
  }   
  



function spawnObstacles(){
  
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + survivaltime/100);
   obstacle.addImage(obstacleImage)
   obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
  
  
      
    
   
      
   
   
 }
 } 
 


function spawnbanana(){ 
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
  
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
}
}