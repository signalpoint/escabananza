import { Sprite } from '../modules/Sprite.js'
import { Particle } from '../modules/Particle.js'
import { images } from '../images.js'
import { playSound } from '../media.js'
import { canvas } from '../canvas.js'
import { getGravity, addParticle } from '../environment.js'

export class BadBush extends Sprite {

  constructor({ position, velocity }) {

    super({ position, velocity })

//    this.position = {
//      x: position.x,
//      y: position.y
//    }
//    this.velocity = {
//      x: velocity.x,
//      y: velocity.y
//    }

    // dimensions
    this.width = 64
    this.height = 64

    // sprites

//    this.sprites = {
//      walk: {
//        frames: 24,
//        left: images.badBush.badBushWalkLeft,
//        right: images.badBush.badBushWalkRight
//      }
//    }
//    this.sprite = this.sprites.walk.left

    this.sprites = {
      walk: {
        left: {
          img: images.badBush.walkLeft,
          animation: [

            // slow
//            0,0,0,
//            1,1,1,1,1,1,
//            2,2,2,2,2,2,
//            3,3,3,3,3,3,
//            2,2,2,2,2,2,
//            1,1,1,1,1,1,
//            0,0,0

            // med
            0,0,
            1,1,1,1,
            2,2,2,2,
            3,3,3,3,
            2,2,2,2,
            1,1,1,1,
            0,0

            // fast
//            0,
//            1,1,
//            2,2,
//            3,3,
//            2,2,
//            1,1,
//            0,0

          ]
        },
        right: {
          img: images.badBush.walkRight,
          animation: [

            // slow
//            3,3,3,
//            2,2,2,2,2,2,
//            1,1,1,1,1,1,
//            0,0,0,0,0,0,
//            1,1,1,1,1,1,
//            2,2,2,2,2,2,
//            3,3,3

            // med
            3,3,
            2,2,2,2,
            1,1,1,1,
            0,0,0,0,
            1,1,1,1,
            2,2,2,2,
            3,3

            // fast
//            3,
//            2,2,
//            1,1,
//            0,0,
//            1,1,
//            2,2,
//            3

          ]
        }
      }
    }
    this.sprite = this.sprites.walk.left

  }

  update() {

    this.frame++

    // SPRITE ANIMATION

    // ANIMATION ARRAY

    if (this.sprite.animation) {

      if (this.frame >= this.sprite.animation.length && (
        this.sprite.img === this.sprites.walk.left.img ||
        this.sprite.img === this.sprites.walk.right.img
      )) { this.frame = 0 }

    }
    else {

      // CLASSIC

//    if (this.frame >= this.sprites.walk.frames && (this.sprite === this.sprites.walk.left || this.sprite === this.sprites.walk.right)) {
//      this.frame = 0
//    }

    }

    // CLASSIC

    this.draw()

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // if the bottom of the bush is above the bottom of the canvas, apply gravity
    if (this.position.y + this.height + this.velocity.y <= canvas.height) { // above bottom
      this.velocity.y += getGravity()
    }

  }

  explode() {
    playSound('squishBadBush')
    for (let j = 0; j < 50; j++) {
      addParticle(new Particle({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height / 2
        },
        velocity: {
          x: (Math.random() - .5) * 5,
          y: (Math.random() - .5) * 5
        },
        radius: Math.random() * 3,
        color: '#223325'
      }));
    }
  }

} // BADBUSH
