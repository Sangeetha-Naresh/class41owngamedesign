var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;


var cars, car1, car2, car3, car4;
var trackimg, car1img, car2img, car3img, car4img, groundimg;

var invisibleground;

var fruits, fruitGroup, fruit1_img, fruit2_img;

function preload()
{
  trackimg=loadImage("images/track.jpg");
  car1img=loadImage("images/car1.png");
  car2img=loadImage("images/car2.png");
  car3img=loadImage("images/car3.png");
  car4img=loadImage("images/car4.png");
  groundimg=loadImage("images/ground.png");


  fruit1_img = loadImage("images/apple2.png");
  fruit2_img = loadImage("images/banana2.png");

  fruitGroup=new Group();
}


function setup()
{
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw()
{
  if(playerCount === 2)
  {
    game.update(1);
  }
  if(gameState === 1)
  {
    clear();
    game.play();
  }
  if(gameState===2)
  {
    game.end();
  }
}
