class Platform {

    constructor({ x, y, width, height, image, block }) {

      // position
      this.position = {
        x,
        y
      }

      this.velocity = {
        x: 0
      }

      this.image = image
      this.width = width || image.width
      this.height = height || image.height

      this.block = block

    }

    draw() {

//      c.fillStyle = 'blue'
//      c.fillRect(this.position.x, this.position.y, this.width, this.height)

//      c.drawImage(this.image, this.position.x, this.position.y)

      const pattern = c.createPattern(this.image, "repeat");
      c.fillStyle = pattern;
      c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }

    update() {
      this.draw()
      this.position.x += this.velocity.x
    }

  }
