import { Sprite } from '../modules/Sprite.js'
import { images } from '../images.js'
import { canvas } from '../canvas.js'
import { gravity } from '../environment.js'

export class SnowFlower extends Sprite {

  constructor({ position, velocity }) {

    super({ position, velocity })

    // dimensions
    this.width = 60
    this.height = 57

    this.sprites = {
      planted: {
        img: images.powerUps.snowFlower,
        animation: [

          // slow
            0,0,0,0

        ]
      }
    }
    this.sprite = this.sprites.planted

  }

  update() {

    this.frame++

    // SPRITE ANIMATION

    // ANIMATION ARRAY

    if (this.sprite.animation) {

      if (this.frame >= this.sprite.animation.length && this.sprite.img === this.sprites.planted.img) {
        this.frame = 0
      }

    }
    else {

      // CLASSIC

//    if (this.frame >= this.sprites.planted.frames && (this.sprite === this.sprites.planted || this.sprite === this.sprites.planted.right)) {
//      this.frame = 0
//    }

    }

    // CLASSIC

    this.draw()

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // if the bottom of the flower is above the bottom of the canvas, apply gravity
    if (this.position.y + this.height + this.velocity.y <= canvas.height) { // above bottom
      this.velocity.y += gravity
    }

  }

}
