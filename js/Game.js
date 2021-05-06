class Game 
{
  constructor(){}

  getState()
  {
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state)
  {
    database.ref('/').update({
      gameState: state
    });
  }

  async start()
  {
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists())
      {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2img);
  /*  car3 = createSprite(500,200);
    car3.addImage("car3",car3img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4img);*/
    
    cars = [car1, car2];

    invisibleground=createSprite(100,400,300,20)
    invisibleground.shapeColor="red";
  }

  play()
  {
    form.hide();

    Player.getPlayerInfo();
    
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined)
    {
      background(groundimg);

      image(trackimg,0,0,displayWidth*5,displayHeight);
   
      var index = 0;

    
      var x ;
      var y;

      for(var plr in allPlayers)
      {
        index = index + 1 ;

    
        x = allPlayers[plr].distance;
     
        y = windowHeight-100+player.jump;

 

        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index)
        {
          //stroke(10);
         // fill('red');
          //ellipse(x,y,60,60);

               
          invisibleground.x=x;
          invisibleground.y=windowHeight-50;

   
          camera.position.x =cars[index-1].x;
          camera.position.y = y;

        
        }
       
      
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null)
    {
      player.distance =player.distance+10;
      player.update();
    }

    if(keyWentDown(UP_ARROW) && player.index !== null)
    {
      player.jump =player.jump-100;
      player.update();
    }

    if(keyWentUp(UP_ARROW) && player.index !== null)
    {
      player.jump =player.jump+100;
      player.update();
    }
    


    if(player.distance >6860)
    {
      gameState=2;
      
      player.rank +=1;  // player.rank=player.rank+1
      Player.updateCarsAtEnd(player.rank);
      
    }



    if (frameCount % 300 === 0) 
    {
                 fruits = createSprite(camera.position.x+900, windowHeight-100, 100, 100);
                 fruits.velocityX = -6;

                  fruits.lifetime=200;

                 var rand = Math.round(random(1,2));
                 switch(rand)
                 {
                     case 1: fruits.addImage("fruit1",fruit1_img);
                     break;
                     case 2: fruits.addImage("fruit2", fruit2_img);
                     break;
                  
                 }
                 fruitGroup.add(fruits);
                 

    }

    if(fruitGroup.isTouching(cars))
    {
         
          gameState=2;
    }

    drawSprites();
  }

  end()
  {
  
    alert("GAME ENDED!! \n  Player rank is :"+ player.rank);
    gameState=0;

  }



}
