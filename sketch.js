var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "blue";


  var hypnoticBallPosition = database.ref('cuadrito/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-2,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(2,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-2);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+2);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('cuadrito/position').set({
    'x':position.x+x,
    'y':position.y+y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error al escribir en la base de datos");
}
