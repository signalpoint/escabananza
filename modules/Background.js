import { canvas, c } from '../canvas.js'

// TODO consider renaming to Layer, and then let devs make their own layers (e.g. backgrounds, foregrounds, etc)

export class Background {

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

      // As the player moves to the right, the background's x position decreases (goes into negative)...

      this.scrollVal = this.position.x % this.width

      // TODO
      // - if scroll speed is 1 (aka no scrolling), there is probably a faster way to call drawImage without the src and
      //     destination args!
      // - this section would probably be faster without declaring the "let" vars below

      if (-this.scrollVal >= this.width - canvas.width) {

        // the screen is scrolling to the right...

        // draw the left side of the image somewhere on the right side of the canvas...

        let destinationX = (this.width + this.scrollVal) % canvas.width
        let destinationY = 0
        let cropWidth = canvas.width - destinationX
        let cropHeight = this.image.height

//        let destinationDifference = canvas.width - destinationX
//        if (destinationDifference > -10 && destinationDifference < 10) {
//          console.log('time to draw again!', cropWidth + ' x ' + cropHeight + ' => ' + destinationX + ', ' + destinationY)
//        }

        c.drawImage(this.image,

          // SOURCE (x, y, width, height)
          0,
          0,
          cropWidth,
          cropHeight,

          // DESTINATION (x, y, width, height)
          destinationX,
          destinationY,
          cropWidth,
          cropHeight

        )

      }

      // GOOD!!!! (probably faster)

      let imgDestinationX = this.scrollVal
      let imgDestinationY = this.position.y
      let imgDestinationWidth = this.image.width
      let imgDestinationHeight = this.image.height

//      console.log(
//        'draw',
//        imgDestinationX + ', ' + imgDestinationY + ' => ' +
//        imgDestinationWidth + ' x ' + imgDestinationHeight
//      )

//      if (imgDestinationX > -10 && imgDestinationX < 10) {
//        console.log(
//          'draw start!',
//          imgDestinationWidth + ' x ' + imgDestinationHeight + ' => ' +
//          imgDestinationX + ', ' + imgDestinationY
//        )
//      }

      c.drawImage(this.image,

        imgDestinationX,
        imgDestinationY,
        imgDestinationWidth,
        imgDestinationHeight

      )

      // ALSO GOOD!!!! (probably slower because of the src,dst,crop,etc

      // draw the cropped image... hmm, what's up here?

//      let imgSrcX = -this.scrollVal
//      let imgSrcY = this.position.y
//      let imgCropWidth = this.image.width - imgSrcX
//      let imgCropHeight = this.image.height
//
//      console.log(
//        'draw',
//        imgSrcX + ', ' + imgSrcY + ' => ' +
//        imgCropWidth + ' x ' + imgCropHeight
//      )
//
//      c.drawImage(this.image,
//
//        // SOURCE (x, y, width, height)
//        imgSrcX,
//        imgSrcY,
//        imgCropWidth,
//        imgCropHeight,
//
//        // DESTINATION (x, y, width, height)
//        0,
//        0,
//        imgCropWidth,
//        imgCropHeight,
//
//      )


    }

  } // draw

  update() {
    this.draw()
    this.position.x += this.velocity.x
  }

} // Background
