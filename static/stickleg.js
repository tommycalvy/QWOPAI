function StickLeg(x, y) {
  this.upperLegVertices = [ {x: 0, y: 0}, {x: 0, y: 100}, {x: 30, y: 200}, {x: 100, y: 190}, {x: 60, y: 0} ];
  var options = {
      collisionFilter: {
            group: -2,
      }
    }
  this.upperLeg = Bodies.fromVertices(x, y, this.upperLegVertices, options);

  this.lowerLeg = Bodies.rectangle(30, 201, 50, 200, options);

  var options = {
    bodyA: this.upperLeg,
    pointA: { x: 30, y: 200 },
    bodyB: this.lowerLeg,
    pointB: { x: 30, y: 201 },
    length: 1,
    stiffness: 0.9
  }
  var legConstraint = Constraint.create(options);

  World.add(world, [this.upperLeg, this.lowerLeg, legConstraint]);

  this.show = function() {
    var upperLegPos = this.upperLeg.vertices[0];
    var upperLegAngle = this.upperLeg.angle;
    var lowerLegPos = this.lowerLeg.position;
    var lowerLegAngle = this.lowerLeg.angle;

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
    rect(0, 0, 50, 200);
    pop();
  }
}
