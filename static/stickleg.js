function StickLeg(x, y) {
  this.upperLegVertices = [ {x: 0, y: 0}, {x: 0, y: 100}, {x: 30, y: 200}, {x: 100, y: 190}, {x: 60, y: 0} ];
  this.upperLeg = Bodies.fromVertices(x, y, this.upperLegVertices);

  this.lowerLeg = Bodies.rectangle(30, 201, 60, 200);

  var option1 = {
    bodyA: this.upperLeg,
    pointA: { x: -15, y: 99 },
    bodyB: this.lowerLeg,
    pointB: { x: -26, y: -100 },
    length: 0,
    stiffness: 1
  }
  this.legConstraint1 = Constraint.create(option1);

  var option2 = {
    bodyA: this.upperLeg,
    pointA: { x: -15, y: -85},
    pointB: { x: 300, y: 0},
    length: 100,
    stiffness: 0.7
  }
  this.legConstraint2 = Constraint.create(option2);

  var options10 = {
    bodyA: this.upperLeg,
    pointA: { x: -100, y: -100},
    bodyB: this.lowerLeg,
    pointB: { x: - 100, y: 0},
    length: 300,
    stiffness: 0.1
  }
  this.moveCon = Constraint.create(options10);

  World.add(world, [this.upperLeg, this.lowerLeg, this.legConstraint1, this.legConstraint2, this.moveCon]);

  this.show = function() {
    var upperLegPos = this.upperLeg.vertices[0];
    var upperLegAngle = this.upperLeg.angle;
    var lowerLegPos = this.lowerLeg.position;
    var lowerLegAngle = this.lowerLeg.angle;

    var uLegCentroid = this.upperLeg.position;
    var uLegOffset = this.legConstraint1.pointA;
    var lLegOffset = this.legConstraint1.pointB;

    var uLegOffset2 = this.legConstraint2.pointA;
    var fixedOffset = this.legConstraint2.pointB;

    var uMoveCon = this.moveCon.pointA;
    var lMoveCon = this.moveCon.pointB;

    push();
    translate(upperLegPos.x, upperLegPos.y);
    rotate(upperLegAngle);
    fill(0);
    beginShape();
    for (var i = 0; i < this.upperLegVertices.length; i++) {
      vertex(this.upperLegVertices[i].x, this.upperLegVertices[i].y);
    }
    endShape(CLOSE);
    pop();

    push();
    translate(lowerLegPos.x, lowerLegPos.y);
    rotate(lowerLegAngle);
    fill(0);
    rectMode(CENTER);
    rect(0, 0, 50, 200);
    pop();

    push();
    stroke(0, 255, 0);
    line(uLegCentroid.x + uLegOffset.x, uLegCentroid.y + uLegOffset.y, lowerLegPos.x + lLegOffset.x, lowerLegPos.y + lLegOffset.y);
    line(fixedOffset.x, fixedOffset.y, uLegCentroid.x + uLegOffset2.x, uLegCentroid.y + uLegOffset2.y);
    pop();

    push();
    stroke(255, 0, 0);
    line(uLegCentroid.x + uMoveCon.x, uLegCentroid.y + uMoveCon.y, lowerLegPos.x + uMoveCon.x, lowerLegPos.y + uMoveCon.y);
    pop();
  }

  this.extend = function() {
    this.moveCon.length += 1;
  }

  this.contract = function() {
    this.moveCon.length -= 1;
  }

}
