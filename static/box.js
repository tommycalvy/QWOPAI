function Box(x, y, w, h) {
  var options = {
    collisionFilter: {
          group: -2,
    }
  }

  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    fill(0);
    rect(0, 0, this.w, this.h);
    push();
    stroke(255);
    line(0,0, this.w / 2, 0);
    pop();
    pop();
  }
}
