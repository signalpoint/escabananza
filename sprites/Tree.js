import { Sprite } from '../modules/Sprite.js'
import { images } from '../images.js'

export class Tree extends Sprite {

  constructor({ position, scrollSpeed }) {

    super({ position })

    // dimensions
    this.width = 192
    this.height = 192

    this.scrollSpeed = scrollSpeed

    // sprites

    this.sprites = {
      planted: {
        img: images.trees.oakTree,
        animation: [
          0
        ]
      }
    }
    this.sprite = this.sprites.planted

  }

  update() {

    this.draw()

  }

} // TREE
