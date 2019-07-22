function StickMan(x, y, r) {

  var leg1Options = {
    friction: 0.8,
    collisionFilter: {
      category: 0x0002,
      mask: 0x0001 | 0x0002
    }
  }

  var leg2Options = {
    friction: 0.5,
    collisionFilter: {
      category: 0x0004,
      mask: 0x0001 | 0x0004
    }
  }

  this.leg1 = new StickLeg(x, y + 150, leg1Options);
  this.leg2 = new StickLeg(x, y + 150, leg2Options);

  var hipJointOptions = {
    bodyA: this.leg1.upperLeg,
    pointA: { x: 0, y: -50 },
    bodyB: this.leg2.upperLeg,
    pointB: { x: 0, y: -50 },
    length: 0,
    stiffness: 1
  }
  this.hipJoint = Constraint.create(hipJointOptions);

  var torsoOptions = {
    friction: 0.5,
    collisionFilter: {
      category: 0x0008,
      mask: 0x0001 | 0x0008
    }
  }

  this.torso = Bodies.rectangle(x, y, 30, 150, torsoOptions);

  var torsoJointOptions = {
    bodyA: this.torso,
    pointA: { x: 0, y: 75 },
    bodyB: this.leg1.upperLeg,
    pointB: { x: 0, y: -50 },
    length: 0,
    stiffness: 1
  }
  this.torsoJoint = Constraint.create(torsoJointOptions);

  var quadMuscle1Options = {
    bodyA: this.torso,
    pointA: { x: 30, y: -75 },
    bodyB: this.leg1.upperLeg,
    pointB: { x: 30, y: 50 },
    length: 250,
    stiffness: 0.7
  }
  this.quadMuscle1 = Constraint.create(quadMuscle1Options);

  var quadMuscle2Options = {
    bodyA: this.torso,
    pointA: { x: 30, y: -75 },
    bodyB: this.leg2.upperLeg,
    pointB: { x: 30, y: 50 },
    length: 250,
    stiffness: 0.7
  }
  this.quadMuscle2 = Constraint.create(quadMuscle2Options);

  var pinOptions = {
    pointA: { x: 300, y: 0},
    bodyB: this.torso,
    pointB: { x: 0, y: -75 },
    length: 50,
    stiffness: 0.7
  }
  this.pin = Constraint.create(pinOptions);

  World.add(world, [this.leg1, this.leg2, this.hipJoint, this.torso, this.torsoJoint, this.quadMuscle1, this.quadMuscle2, this.pin]);

  /*
  this.body = Composite.create({
    bodies: [this.leg1, this.leg2],
    constraints: [this.hipJoint]
  });

  World.add(world, this.body);
  */

  this.show = function() {

    var torsoPos = this.torso.position;
    var torsoAngle = this.torso.angle;

    var staticPinPos = this.pin.pointA;
    var torsoPinPos = this.pin.pointB;

    var upperLeg1Pos = this.leg1.upperLeg.position;
    var upperLeg2Pos = this.leg2.upperLeg.position;

    var torsoQuadMuscle1 = this.quadMuscle1.pointA;
    var upperLegQuadMuscle1 = this.quadMuscle1.pointB;

    var torsoQuadMuscle2 = this.quadMuscle2.pointA;
    var upperLegQuadMuscle2 = this.quadMuscle2.pointB;

    this.leg1.show();
    this.leg2.show();

    push();
    translate(torsoPos.x, torsoPos.y);
    rotate(torsoAngle);
    fill(0);
    rectMode(CENTER);
    rect(0, 0, 30, 150);
    pop();

    push();
    stroke(0, 255, 0);
    line(torsoPos.x + torsoQuadMuscle1.x, torsoPos.y + torsoQuadMuscle1.y, upperLeg1Pos.x + upperLegQuadMuscle1.x, upperLeg1Pos.y + upperLegQuadMuscle1.y);
    pop();

    push();
    stroke(0, 255, 0);
    line(torsoPos.x + torsoQuadMuscle2.x, torsoPos.y + torsoQuadMuscle2.y, upperLeg2Pos.x + upperLegQuadMuscle2.x, upperLeg2Pos.y + upperLegQuadMuscle2.y);
    pop();

    push();
    stroke(255, 0, 0);
    line(staticPinPos.x, staticPinPos.y, torsoPos.x + torsoPinPos.x, torsoPos.y + torsoPinPos.y);
    pop();
    //var pos = this.body.position;
    //var angle = this.body.angle;

    /*
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(0);
    circle(0, 0, this.r * 2);
    push();
    stroke(255);
    line(0, 0, this.r, 0);
    pop();
    pop();
    */
  }

  this.extendQuad1 = function() {
    if (this.quadMuscle1.length < 240) {
      this.quadMuscle1.length += 4;
    }
  }

  this.contractQuad1 = function() {
    if (this.quadMuscle1.length > 100) {
      this.quadMuscle1.length -= 4;
    }
  }

  this.extendQuad2 = function() {
    if (this.quadMuscle2.length < 240) {
      this.quadMuscle2.length += 4;
    }
  }

  this.contractQuad2 = function() {
    if (this.quadMuscle2.length > 100) {
      this.quadMuscle2.length -= 4;
    }
  }

}
