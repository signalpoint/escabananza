import { Sprite } from '../modules/Sprite.js'
import { images } from '../images.js'
import { playSound } from '../media.js'
import { canvas, c } from '../canvas.js'
import { gravity } from '../environment.js'

export class Player extends Sprite {

  constructor({ position, velocity }) {

    super({ position, velocity })

    // speed
    this.speed = 10;

    this.jumpVelocity = 12

    // dimensions
    this.width = 32
    this.height = 64

    this.state = 'standing' // standing, running, jumping or falling

    // sprites

    this.sprites = {

      // STAND
      stand: {
        left: {
          img: images.player.standLeft,
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
          img: images.player.standRight,
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
          img: images.player.runLeft,
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
          img: images.player.runRight,
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
          img: images.player.jumpLeft,
          frames: 1 // TODO support
        },
        right: {
          img: images.player.jumpRight,
          frames: 1 // TODO support
        }
      }

    }
    this.sprite = this.sprites.stand.right

    this.opacity = 1

    this.invincible = false
    this.makeInvincible = function(duration) {
      this.invincible = true
      setTimeout(() => {
        this.invincible = false
      }, duration)
    }

    this.powerUps = {
      snowFlower: false
    }

    this.activatePowerUp = function(powerUp) {
      switch (powerUp) {
        case 'snow':
          this.powerUps.snowFlower = true
          this.setSpriteSet('snow')
//          assets.pickUpSnowFlower.play()
          playSound('pickUpSnowFlower')
          break;
      }
    }
    this.removePowerUp = function(powerUp) {
      switch (powerUp) {
        case 'snow': this.powerUps.snowFlower = false; break;
      }
      this.setSpriteSet()
//      assets.losePowerUp.play()
      playSound('losePowerUp')
    }

    this.setSpriteSet = function(set) {
      const {sprites} = this
      switch (set) {
        case 'snow':
          sprites.stand.right.img = images.player.standRightSnow
          sprites.stand.left.img = images.player.standLeftSnow
          sprites.run.right.img = images.player.runRightSnow
          sprites.run.left.img = images.player.runLeftSnow
          sprites.jump.right.img = images.player.jumpRightSnow
          sprites.jump.left.img = images.player.jumpLeftSnow
          break;
        default:
          sprites.stand.right.img = images.player.standRight
          sprites.stand.left.img = images.player.standLeft
          sprites.run.right.img = images.player.runRight
          sprites.run.left.img = images.player.runLeft
          sprites.jump.right.img = images.player.jumpRight
          sprites.jump.left.img = images.player.jumpLeft
          break;
      }
    }

  }

  update() {

    this.frame++
    const {sprite, sprites} = this

    // SPRITE ANIMATION

    // TODO if the animation is only 1 frame (a single picture), then skip all the frame shtuff

    // ANIMATION ARRAY

    if (sprite.animation) {

      if (

        this.frame >= sprite.animation.length && (

          (sprite.img === sprites.stand.left.img || sprite.img === sprites.stand.right.img) ||
          (sprite.img === sprites.run.left.img || sprite.img === sprites.run.right.img)
        )

      ) { this.frame = 0 }

    }
    else {

      // CLASSIC

      // TODO use a "frames" property instead of the "animation" property to support classic mode

      if (this.frame >= sprites.stand.frames && (sprite === sprites.stand.left || sprite === sprites.stand.right)) {
        this.frame = 0
      }
      else if (this.frame >= sprites.run.frames && (sprite === sprites.run.left || sprite === sprites.run.right)) {
        this.frame = 0
      }
      else if (sprite === sprites.jump.right || sprite === sprites.jump.left) {
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

    // Flicker effect when losing power up.
    if (this.invincible) {
      if (this.opacity === 1) this.opacity = 0
      else this.opacity = 1
    }
    else this.opacity = 1

  }

  // override Sprite.draw()...

  draw() {

    c.save()
    c.globalAlpha = this.opacity

    c.drawImage(

      this.sprite.img,

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

    c.restore()

  }

  die() {
    playSound('die')
    init()
  }

}
