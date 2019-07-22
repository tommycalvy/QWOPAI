function Boundary(x, y, w, h) {
  this.body = Bodies.rectangle(x, y, w, h, {
    isStatic: true,
    friction: 0.8,
    collisionFilter: {
      group: 0x0001,
      mask: 0x0001 | 0x0002 | 0x0004 | 0x0008
    }
  });
  this.w = w;
  this.h = h;

  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    fill(100);
    rectMode(CENTER);
    noStroke();
    rect(0, 0, this.w, this.h);
    pop();
  }
}
