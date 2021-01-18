//Create variables here
var dog,dogImg,happyDog;
var database;
var food1,foodStock, addFood;
var foodObj;
var feed,feedTime,lfeed;
var time;

function preload()
{
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  foodObj = new Food();
  
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.3

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  feed = createButton("Feed The Dog");
  feed.position(550,95);
  feed.mousePressed(feedDog);
  
  addFood = createButton("Add The Food");
  addFood.position(700,95);
  addFood.mousePressed(addFood);
  
}


function draw() {  
  background(46,139,87);
 
  time= hour();
  text("current time : "+time,20,20);
 //Adding UI
 feedTime = database.ref('feedTime');
 feedTime.on('value',function(data){
   lfeed=data.val()
 });
  
 if(lfeed>=12)
 {
   text("Last Feed : "+lfeed%12 +"PM",350,20);
 }
 else if(lfeed==0)
 {
  text("Last Feed : 12AM",350,30);
 }
 else
 {
  text("Last Feed : "+lfeed +"PM",350,50);
 }
 
 foodObj.display();
  drawSprites();

}

function readStock(data)
{
  food1 = data.val();
  foodObj.updateFoodStock(food1);
}
 
function feedDog()
{
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  });
}

function addFood()
{
  food1++;
  database.ref('/').update({
    food:food1
  })
}

