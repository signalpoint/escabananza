import { c } from '../canvas.js'

export class Sprite {

  // TODO
  //
  // - [ ] add a "scale" property to handle scaling of images, etc

  constructor({ position, velocity }) {

    // position
    this.position = {
      x: position.x,
      y: position.y
    }

    // velocity
    this.velocity = velocity ? {
      x: velocity.x,
      y: velocity.y
    } : null

    // dimensions
    this.width = 64
    this.height = 64

    // sprites
    this.frame = 0
    this.sprites = {/* .. */}
    this.sprite = null

  }

  draw() {

//    console.log(this.sprite.animation[this.frame]);

    c.drawImage(

//      this.sprite,
      this.sprite.img,

//      this.width * this.frame, // CLASSIC
//      this.width * this.sprite.animation[this.frame], // ANIMATION ARRAY

      this.sprite.animation ?

        this.width * this.sprite.animation[this.frame] : // ANIMATION ARRAY
        this.width * this.frame, // CLASSIC

      0,
      this.width,
      this.height,

      this.position.x,
      this.position.y,
      this.width,
      this.height

    )

  }

}
