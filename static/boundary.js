function Boundary(x, y, w, h) {
  this.body = Bodies.rectangle(x, y, w, h, { isStatic: true });
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
