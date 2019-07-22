

var Engine;
var World;
var Bodies;
var Body;
var Constraint;
var Composite
var Mouse;
var MouseConstraint;
var engine;
var world;
var ground;
var stickMan;



function setup() {
  var canvas = createCanvas(600, 600);

  Engine = Matter.Engine;
  World = Matter.World;
  Bodies = Matter.Bodies;
  Body = Matter.Body;
  Constraint = Matter.Constraint;
  Composite = Matter.Composite;
  Mouse = Matter.Mouse;
  MouseConstraint = Matter.MouseConstraint;
  engine = Engine.create();
  world = engine.world;



  ground = new Boundary(width / 2, 575, width, 50);

  World.add(world, ground);

  stickMan = new StickMan(300, 0, 1);
  World.add(world, stickMan);

  var canvasMouse = Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity();
  var options4 = {
    mouse: canvasMouse,
    constraint: {
      stiffness: 0.1,
      length: 0,
      angularStiffness: 0
    },
    collisionFilter: {
      group: 0x0001,
      mask: 0x0001 | 0x0002 | 0x0004 | 0x0008
    }
  }
  mouseConstraint = MouseConstraint.create(engine, options4);
  World.add(world, mouseConstraint);

  Engine.run(engine);
}

function draw() {
  background(200);
  ground.show();
  stickMan.show();
  if (keyIsDown(79)) {
    stickMan.leg1.contract();
    stickMan.leg2.extend();
  }
  if (keyIsDown(80)) {
    stickMan.leg1.extend();
    stickMan.leg2.contract();
  }
  if (keyIsDown(81)) {
    stickMan.extendQuad1();
    stickMan.contractQuad2();
  }

  if (keyIsDown(87)) {
    stickMan.extendQuad2();
    stickMan.contractQuad1();
  }
}
