import { canvas, c } from '../canvas.js'
import { gravity } from '../environment.js'

export class Particle {

  constructor({ position, velocity, radius, color = 'blue', snowball = false, fades = false }) {

    this.position = {
      x: position.x,
      y: position.y
    }

    this.velocity = {
      x: velocity.x,
      y: velocity.y
    }

    this.radius = radius

    this.color = color

    this.snowball = snowball

    this.ttl = 300

    this.opacity = 1
    this.fades = fades

  }

  draw() {
    c.save()
    c.globalAlpha = this.opacity
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {

    this.ttl--

    this.draw()

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.radius + this.velocity.y <= canvas.height) { // above bottom
      this.velocity.y += gravity * .4
    }

    if (this.fades && this.opacity > 0) {
      this.opacity -= .01
    }

    if (this.opacity < 0) {
      this.opacity = 0
    }

  }

}
