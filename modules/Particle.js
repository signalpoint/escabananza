class Particle {

  constructor({
    position,
    velocity,
    radius,
    color
  }) {

    this.position = {
      x: position.x,
      y: position.y
    }

    this.velocity = {
      x: velocity.x,
      y: velocity.y
    }

    this.radius = radius

    this.color = color || 'blue'

    this.ttl = 300

  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {

    this.ttl--

    this.draw()

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.radius + this.velocity.y <= canvas.height) { // above bottom
      this.velocity.y += gravity * .4
    }

  }

}
