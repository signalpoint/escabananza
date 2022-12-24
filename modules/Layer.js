class Layer {

  constructor({ x, y, image, scrollSpeed, scrollDirection, autoScroll }) {

    this.position = {
      x,
      y
    }

    this.velocity = {
      x: 0
    }

    this.image = image
    this.width = image.width
    this.height = image.height

    this.scrollVal = 0
    this.scrollSpeed = scrollSpeed || 1 // 1 = no scrolling
    this.scrollDirection = scrollDirection || 'left'
    this.autoScroll = autoScroll

  }

  draw() {

//      c.drawImage(this.image, this.position.x, this.position.y)

    // AUTO SCROLLING

    if (this.autoScroll) {

      if (this.scrollVal >= canvas.width) {
        this.scrollVal = 0
      }

      this.scrollVal += this.scrollSpeed

      // RIGHT
      if (this.scrollDirection === 'right') {
        c.drawImage(this.image,

          // SOURCE (x, y, width, height)
          canvas.width - this.scrollVal,
          0,
          this.scrollVal,
          this.height,

          // DESTINATION (x, y, width, height)
          0,
          0,
          this.scrollVal,
          this.height

        )
        c.drawImage(this.image,

          this.scrollVal - 1 /* fixes off by one*/,
          0,
          this.width,
          this.height

        )
      }
      else { // LEFT
        c.drawImage(this.image,

          -this.scrollVal + 1 /* fixes off by one*/,
          0,
          this.width,
          this.height

        )
        c.drawImage(this.image,

          canvas.width - this.scrollVal,
          0,
          this.width,
          this.height

        )
      }

    }

    // PLAYER MOVEMENT BASED SCROLLING

    else {

      if (this.scrollVal >= canvas.width) {
        this.scrollVal = 0
      }

//          this.scrollVal = this.position.x % canvas.width

      this.scrollVal = this.position.x

      // TODO if scroll speed is 1 (aka no scrolling), there is probably a faster way to call drawImage without
      // the src and destination args!

      c.drawImage(this.image,

        // SOURCE (x, y, width, height)
        0,
        0,
        -this.scrollVal - 1,
        this.image.height,

        // DESTINATION (x, y, width, height)
        canvas.width + this.scrollVal,
//        0,
        this.position.y,
        -this.scrollVal,
        this.image.height

      )
      c.drawImage(this.image,

        this.scrollVal,
//        0,
        this.position.y,
        this.image.width,
        this.image.height

      )

    }

  } // draw

  update() {
    this.draw()
    this.position.x += this.velocity.x
  }

} // Layer
