

var Engine;
var World;
var Bodies;
var Body;
var Constraint;
var Mouse;
var MouseConstraint;
var engine;
var world;
//var stickHead;
//var stickBody;
//var stickLegRightUpper;
//var stickLegLeftUpper;
var ground;
var leg;



function setup() {
  var canvas = createCanvas(600, 600);
  // module aliases
  Engine = Matter.Engine;
  World = Matter.World;
  Bodies = Matter.Bodies;
  Body = Matter.Body;
  Constraint = Matter.Constraint;
  Mouse = Matter.Mouse;
  MouseConstraint = Matter.MouseConstraint;
  engine = Engine.create();
  world = engine.world;

  //stickHead = new StickHead(300, 15, 50);
  //stickBody = new Box(300, 100, 50, 200);
  //stickLegRightUpper = new Box(300, 185, 50, 150);
  //stickLegLeftUpper = new Box(300, 185, 50, 150);

  ground = new Boundary(width / 2, 575, width, 50);

  World.add(world, ground);
  /*
  var options1 = {
    bodyA: stickHead.body,
    bodyB: stickBody.body,
    pointB: { x: 0, y: 85 },
    length: 0,
    stiffness: 1
  }
  var headToBodyConstraint = Constraint.create(options1);

  var options2 = {
    bodyA: stickBody.body,
    pointA: { x: 0, y: -85 },
    bodyB: stickLegRightUpper.body,
    pointB: { x: 0, y: 85 },
    length: 0,
    stiffness: 1
  }
  var bodyToRightUpperLegConstraint = Constraint.create(options2);

  var options3 = {
    bodyA: stickBody.body,
    pointA: { x: 0, y: -85 },
    bodyB: stickLegLeftUpper.body,
    pointB: { x: 0, y: 85 },
    length: 0,
    stiffness: 1
  }
  var bodyToLeftUpperLegConstraint = Constraint.create(options3);

  World.add(world, [headToBodyConstraint, bodyToRightUpperLegConstraint, bodyToLeftUpperLegConstraint]);
  */
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
  //console.log(stickBody);
  Engine.run(engine);
}

function draw() {
  background(200);
  //ground.show();
  ground.show();
  //stickHead.show();
  //stickBody.show();
  //stickLegRightUpper.show();
  //stickLegLeftUpper.show();
  leg.show();
  //console.log(box1.pos.y)
}
/*
class Line {
  constructor(v1, v2) {
    this.x1 = v1[0];
    this.y1 = v1[1];
    this.x2 = v2[0];
    this.y2 = v2[1];
  }

  show() {
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

class Rectangle {
  constructor()
}
*/
