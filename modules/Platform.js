class Platform {

    constructor({ x, y, width, height, image }) {

      // position
      this.position = {
        x,
        y
      }

      this.image = image
      this.width = width || image.width
      this.height = height || image.height

    }

    draw() {

//      c.fillStyle = 'blue'
//      c.fillRect(this.position.x, this.position.y, this.width, this.height)

//      c.drawImage(this.image, this.position.x, this.position.y)

      const pattern = c.createPattern(this.image, "repeat");
      c.fillStyle = pattern;
      c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }

  }
