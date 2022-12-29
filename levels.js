import { images } from './images.js'
import { audio } from './audio.js'
import { loadImages, loadAudio } from './media.js'
import { canvas } from './canvas.js'
import { getGame, getPlatforms } from './environment.js'
import { Platform } from './modules/Platform.js'

const levels = {
  1: {
    platforms: [],
    map: [
      'lg',
      'lg',
      'gap',
      'lg',
      'lg',
      'gap',
      'gap',
      'lg',
      'lg',
      'gap',
      'tall',
      'tall',
      'gap',
      'gap',
      'lg',
      'tall',
      'tall',
      'gap',
      'xtall',
      'xtall',
      'gap',
      'gap',
      'lg',
      'gap',
      'tall',
      'tall',
      'gap',
      'gap',
      'lg',
      'tall',
      'tall',
      'gap',
      'xtall',
      'xtall',
      'gap',
      'gap',
      'lg',
      'lg',
      'lg'
    ]
  },
  2: {
    platforms: [],
    map: [
      'lg',
      'gap',
      'tall',
      'gap',
      'xtall'
    ]
  }
}

function loadLevel(number) {

  console.log('loading images for level', number)

  return loadImages(images.levels[number]).then(function() {

//    console.log('loaded images for level', number)

    console.log('loading audio for level', number)

    return loadAudio(audio.levels[number]).then(function() {

//      console.log('loaded audio for level', number)

      // Place generic in-game platforms first...

      let game = getGame()

      switch (number) {

        case 1:

          // level platforms
          getPlatforms().push(

            // tall platform
            new Platform({
              x: 1230 + images.levels[game.level].platform.width - images.levels[game.level].platformTall.width,
              y: canvas.height - images.levels[game.level].platform.height - images.levels[game.level].platformTall.height * .75,
              image: images.levels[game.level].platformTall
            })

          )

        // tri block + single block stack
    //    new Platform({
    //      x: 1900 + 128,
    //      y: 350,
    //      image: assets.triBlock,
    //      block: true
    //    }),
    //    new Platform({
    //      x: 1900 + 128 + assets.singleBlock.width,
    //      y: 225,
    //      image: assets.singleBlock,
    //      block: true
    //    }),



        // 2 single blocks, stacked (blocks their path, forces them to jump over)
    //    new Platform({
    //      x: 1230 + (assets.platform.width / 2),
    //      y: platformDefaultY - assets.singleBlock.height,
    //      image: assets.singleBlock,
    //      block: true
    //    }),
    //    new Platform({
    //      x: 1230 + (assets.platform.width / 2),
    //      y: platformDefaultY - assets.singleBlock.height * 2,
    //      image: assets.singleBlock,
    //      block: true
    //    })

          break
      }

    });

  });

}

export {

  levels,
  loadLevel

}
