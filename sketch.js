var climberImg, doorImg, ghostImg, towerImg,door
var ghost, tower,climber,door,id
var invisblock
var invisgrp , climbergrp, doorgrp
var play = 1
var end = 0
var start = 2
var gamestate = start


function preload() 
{
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  ghostImg = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
}
function setup() 
{
  createCanvas(windowWidth,windowHeight);

  tower = createSprite(windowWidth/2,windowHeight/2, windowWidth,windowHeight);
  tower.addImage(towerImg);
  tower.scale = 2
  tower.velocityY = 1;

  ghost = createSprite(windowWidth/2,windowHeight/2, 10, 10);
  ghost.addImage(ghostImg);
  ghost.scale = 0.7;
  ghost.debug  = false
  ghost.setCollider("circle",0,0,100) 

  invisgrp = createGroup()
  doorgrp = createGroup()
  climbergrp = createGroup()

 

}
function draw() {
  background(0);
  drawSprites();
  
  if(gamestate === start)
  {
    textSize(50)
    fill(255)
    text("Press Space To Start",windowWidth/2 - 100,250)
    ghost.velocityY = 0
    tower.velocityY = 0
    if(keyDown("space"))
    {
      gamestate = play
    }
  }
 


  if(gamestate === play)
  {
    tower.velocityY = 4
    if (tower.y > windowHeight) {
      tower.y = tower.width / 2;
      }
     if(keyDown("space"))
     {
      ghost.velocityY = -10
       
     } 
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(keyDown("right"))
    {
       ghost.x = ghost.x + 4
    }
    if(keyDown("left"))
    {
       ghost.x = ghost.x - 4
    }
   
    if(ghost.isTouching(climbergrp))
    {
      ghost.velocityY = 0
    }
    if(ghost.isTouching(invisgrp) || ghost.y > windowHeight )
      {
        gamestate = end
      
      }
      spawnobstacle();
  
  }
  else if(gamestate === end)
  {
    textSize(50)
    fill(255)
    text("Game Over",windowWidth/2,260)
    doorgrp.setVelocityYEach(0)
    invisgrp.setVelocityYEach(0)
    climbergrp.setVelocityYEach(0)
    tower.velocityY = 0
    ghost.velocityY = 0
    text("Press R to Restart",windowWidth/2,300)
    if(keyDown("R"))
    {
      restart()
    }
  }



}
function spawnobstacle()
{
  if(frameCount % 120 === 0)
  {
  door = createSprite(Math.round(random(windowWidth/2-300,windowWidth/2+300)),50,10,10)
  door.addImage(doorImg)
  door.velocityY = 3
  door.scale = 1.5 
  doorgrp.add(door)


  door.depth = ghost.depth
  ghost.depth = ghost.depth + 1
  
  climber = createSprite(50,130,10,40)
  climber.x = door.x
            
  climber.addImage(climberImg)
  climber.velocityY = 3
  climber.scale = 1.5
  climbergrp.add(climber)
  climber.debug = false 
  climber.setCollider("rectangle",0,-10,climber.width,climber.height)  
  

  invisblock = createSprite(50,140,100,10)
  invisblock.x = door.x
  invisblock.velocityY = 3
  invisblock.visible = false
  invisblock.scale = 1.5
  invisgrp.add(invisblock)


  }
}
function restart()
{
  gamestate = play
  invisgrp.destroyEach()
  doorgrp.destroyEach()
  climbergrp.destroyEach()
  ghost.x = windowWidth/2
  ghost.y = 100

}