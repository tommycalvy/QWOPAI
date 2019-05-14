var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: {
            preload: preload,
            create: create
        }
    };

    var game = new Phaser.Game(config);

    function preload ()
    {
        this.load.setBaseURL('http://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    function create ()
    {
        this.add.image(400, 300, 'sky');

        var particles = this.add.particles('red');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        var logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);
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

function setup() {
  createCanvas(800, 800);
  line1 = new Line([400, 400], [500, 500]);
}

function draw() {
  line1.show();
}
*/
