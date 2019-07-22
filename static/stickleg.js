function StickLeg(x, y, options) {

  this.upperLeg = Bodies.rectangle(x, y, 30, 100, options);
  this.lowerLeg = Bodies.rectangle(x, y + 101, 30, 100, options);
  this.foot = Bodies.rectangle(x + 10, y + 167, 50, 30, options);

  var legJointOptions = {
    bodyA: this.upperLeg,
    pointA: { x: -15, y: 50 },
    bodyB: this.lowerLeg,
    pointB: { x: -15, y: -50 },
    length: 0,
    stiffness: 1
  }
  this.legJoint = Constraint.create(legJointOptions);

  /*
  var legPinOptions = {
    bodyA: this.upperLeg,
    pointA: { x: -15, y: -50},
    pointB: { x: 300, y: 0},
    length: 100,
    stiffness: 0.7
  }
  this.legPin = Constraint.create(legPinOptions);
  */

  var legMuscleOptions = {
    bodyA: this.upperLeg,
    pointA: { x: -30, y: -50},
    bodyB: this.lowerLeg,
    pointB: { x: -30, y: 50},
    length: 200,
    stiffness: 0.7
  }
  this.legMuscle = Constraint.create(legMuscleOptions);

  var footJointOptions = {
    bodyA: this.lowerLeg,
    pointA: { x: -15, y: 50},
    bodyB: this.foot,
    pointB: { x: -25, y: -15},
    length: 0,
    stiffness: 1
  }
  this.footJoint = Constraint.create(footJointOptions);

  var footMuscleOptions = {
    bodyA: this.lowerLeg,
    pointA: { x: 15, y: 25},
    bodyB: this.foot,
    pointB: { x: 25, y: -15},
    length: 37,
    stiffness: 0.2
  }
  this.footMuscle = Constraint.create(footMuscleOptions);

  this.body = Composite.create({
    bodies: [this.upperLeg, this.lowerLeg, this.foot],
    constraints: [this.legJoint, this.legMuscle, this.footJoint, this.footMuscle]
  });
  World.add(world, this.body);

  this.show = function() {
    var upperLegPos = this.upperLeg.position;
    var upperLegAngle = this.upperLeg.angle;
    var lowerLegPos = this.lowerLeg.position;
    var lowerLegAngle = this.lowerLeg.angle;
    var footPos = this.foot.position;
    var footAngle = this.foot.angle;

    //var legPinPos = this.legPin.pointA;
    //var pinPos = this.legPin.pointB;

    var upperLegMusclePos = this.legMuscle.pointA;
    var lowerLegMusclePos = this.legMuscle.pointB;

    var lowerLegFootMusclePos = this.footMuscle.pointA;
    var footFootMusclePos = this.footMuscle.pointB;

    push();
    translate(upperLegPos.x, upperLegPos.y);
    rotate(upperLegAngle);
    fill(0);
    rectMode(CENTER);
    rect(0, 0, 30, 100);
    pop();

    push();
    translate(lowerLegPos.x, lowerLegPos.y);
    rotate(lowerLegAngle);
    fill(0);
    rectMode(CENTER);
    rect(0, 0, 30, 100);
    pop();

    push();
    translate(footPos.x, footPos.y);
    rotate(footAngle);
    fill(0);
    rectMode(CENTER);
    rect(0, 0, 50, 30);
    pop();

    /*
    push();
    stroke(255, 0, 0);
    line(pinPos.x, pinPos.y, upperLegPos.x + legPinPos.x, upperLegPos.y + legPinPos.y);
    pop();
    */

    push();
    stroke(0, 255, 0);
    line(upperLegPos.x + upperLegMusclePos.x, upperLegPos.y + upperLegMusclePos.y, lowerLegPos.x + lowerLegMusclePos.x, lowerLegPos.y + lowerLegMusclePos.y);
    pop();

    push();
    stroke(0, 0, 255);
    line(lowerLegPos.x + lowerLegFootMusclePos.x, lowerLegPos.y + lowerLegFootMusclePos.y, footPos.x + footFootMusclePos.x, footPos.y + footFootMusclePos.y)
    pop();
  }

  this.extend = function() {
    if (this.legMuscle.length < 190) {
      this.legMuscle.length += 4;
    }
  }

  this.contract = function() {
    if (this.legMuscle.length > 20) {
      this.legMuscle.length -= 4;
    }
  }

}
