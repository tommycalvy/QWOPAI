

var Engine;
var World;
var Bodies;
var Body;
var Constraint;
var Mouse;
var MouseConstraint;
var engine;
var world;
var ground;
var leg;



function setup() {
  var canvas = createCanvas(600, 600);

  Engine = Matter.Engine;
  World = Matter.World;
  Bodies = Matter.Bodies;
  Body = Matter.Body;
  Constraint = Matter.Constraint;
  Mouse = Matter.Mouse;
  MouseConstraint = Matter.MouseConstraint;
  engine = Engine.create();
  world = engine.world;



  ground = new Boundary(width / 2, 575, width, 50);

  World.add(world, ground);

  leg = new StickLeg(400, 200);
  World.add(world, leg);

  var canvasMouse = Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity();
  var options4 = {
    mouse: canvasMouse,
    constraint: {
      stiffness: 0.1,
      length: 0,
      angularStiffness: 0
    }
  }
  mouseConstraint = MouseConstraint.create(engine, options4);
  World.add(world, mouseConstraint);
  Engine.run(engine);
}

function draw() {
  background(200);
  ground.show();
  leg.show();
}

function keyPressed() {
  console.log("Key Pressed!!");
  if (keyCode === o) {
    console.log("O key pressed");
    leg.extend();
  } else if (keyCode === p) {
    console.log("P key pressed");
    leg.contract();
  }
}
