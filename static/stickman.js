function StickHead(x, y, r) {
  var options = {
      //restitution: 0.7,
      //friction: 0.2,
      collisionFilter: {
            group: -2,
      }
    }
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  World.add(world, this.body);


  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

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

  }
}
