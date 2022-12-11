class Player extends Sprite {

  constructor({ position, velocity }) {

    super({ position, velocity })

    // speed
    this.speed = 10;

    // dimensions
    this.width = 32
    this.height = 64

    this.state = 'standing' // standing, running, jumping or falling

    // sprites

    this.sprites = {

      // STAND
      stand: {
        left: {
          img: assets.standLeft,
          animation: [
            5,5,5,5,5,5,
            5,5,5,5,5,5,
            5,5,5,5,5,5,
            5,5,5,5,5,5,
            2,2,2,2,2,2,
            1,1,1,1,1,1,
            0,0,0,0,0,0,
            1,1,1,1,1,1,
            2,2,2,2,2,2,
            5,5,5,5,5,5,
            5,5,5,5,5,5
          ]
        },
        right: {
          img: assets.standRight,
          animation: [
            0,0,0,0,0,0,
            0,0,0,0,0,0,
            0,0,0,0,0,0,
            0,0,0,0,0,0,
            3,3,3,3,3,3,
            4,4,4,4,4,4,
            5,5,5,5,5,5,
            4,4,4,4,4,4,
            3,3,3,3,3,3,
            0,0,0,0,0,0,
            0,0,0,0,0,0
          ]
        }
      },

      // RUN
      run: {
        left: {
          img: assets.runLeft,
          animation: [
            0,0,0,
            1,1,1,1,1,1,
            2,2,2,2,2,2,
            3,3,3,3,3,3,
            2,2,2,2,2,2,
            1,1,1,1,1,1,
            0,0,0
          ]
        },
        right: {
          img: assets.runRight,
          animation: [
            0,0,0,
            1,1,1,1,1,1,
            2,2,2,2,2,2,
            3,3,3,3,3,3,
            2,2,2,2,2,2,
            1,1,1,1,1,1,
            0,0,0
          ]
        }
      },

      // JUMP
      jump: {
        left: {
          img: assets.jumpLeft,
          frames: 1 // TODO support
        },
        right: {
          img: assets.jumpRight,
          frames: 1 // TODO support
        }
      }

    }
    this.sprite = this.sprites.stand.right

  }

  update() {

    this.frame++

    // SPRITE ANIMATION

    // TODO if the animation is only 1 frame (a single picture), then skip all the frame shtuff

    // ANIMATION ARRAY

    if (this.sprite.animation) {

//      if (
//        this.frame >= this.sprite.animation.length && (
//          this.sprite.img === this.sprites.stand.left.img ||
//          this.sprite.img === this.sprites.stand.right.img
//        )
//      ) { this.frame = 0 }
//      else if (
//        this.frame >= this.sprite.animation.length && (
//          this.sprite.img === this.sprites.run.left.img ||
//          this.sprite.img === this.sprites.run.right.img
//        )
//      ) { this.frame = 0 }

      if (

        this.frame >= this.sprite.animation.length && (

          (this.sprite.img === this.sprites.stand.left.img || this.sprite.img === this.sprites.stand.right.img) ||
          (this.sprite.img === this.sprites.run.left.img || this.sprite.img === this.sprites.run.right.img)
        )

      ) { this.frame = 0 }

    }
    else {

      // CLASSIC

      // TODO use a "frames" property instead of the "animation" property to support classic mode

      if (this.frame >= this.sprites.stand.frames && (this.sprite === this.sprites.stand.left || this.sprite === this.sprites.stand.right)) {
        this.frame = 0
      }
      else if (this.frame >= this.sprites.run.frames && (this.sprite === this.sprites.run.left || this.sprite === this.sprites.run.right)) {
        this.frame = 0
      }
      else if (this.sprite === this.sprites.jump.right || this.sprite === this.sprites.jump.left) {
        this.frame = 0
      }

    }

    this.draw()

    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    if (this.position.y + this.height + this.velocity.y <= canvas.height) { // above bottom
      this.velocity.y += gravity
    }
//      else { // bottom
//        this.velocity.y = 0
//      }

  }

}
