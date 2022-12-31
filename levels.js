import { images } from './images.js'
import { audio } from './audio.js'
import { loadImages, loadAudio } from './media.js'
import { canvas } from './canvas.js'
import {
  getGame,
  getPlatforms,
  getGenericObjects,
  getBadBushes,
  getSnowFlowers,
} from './environment.js'
import {
  GenericObject
} from './modules/GenericObject.js'
import { Platform } from './modules/Platform.js'
import { BadBush } from './sprites/BadBush.js'
import { SnowFlower } from './sprites/SnowFlower.js'

const levels = {

  1: {
    startPosition: {
      x: 100,
      y: 416
    },
    finishPosition: {
      x: 7700,
      y: 288 // on top of level 1 lg platform
    },
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
    startPosition: {
      x: 100,
      y: 320
    },
    finishPosition: {
      x: 7950,
      y: 192 // on top of level 2 platform
//      y: 79 // on top of level 2 tall platform
//      y: 29 // on top of level 2 extra tall platform
    },
    map: [
      'lg',
      'lg',
      'lg',
      'gap',
      'tall',
      'gap',
      'gap',
      'lg',
      'lg',
      'gap',
      'gap',
      'gap',
      'xtall',
      'gap',
      'gap',
      'lg',
      'lg',
      'lg',
      'gap',
      'gap',
      'tall',
      'gap',
      'gap',
      'xtall',
      'xtall',
      'gap',
      'gap',
      'gap',
      'lg',
      'lg',
      'lg',
      'gap',
      'gap',
      'gap',
      'lg',
      'lg',
      'gap',
      'gap',
      'xgap',
      'lg',
      'lg',
      'lg',
    ]
  }
}

function reloadLevel(number) {
  loadLevelParts(number)
  loadLevelMapOntoPlatforms(number)
}

function loadLevel(number) {

  console.log('loading images for level', number)

  return loadImages(images.levels[number]).then(function() {

//    console.log('loaded images for level', number)

    console.log('loading audio for level', number)

    return loadAudio(audio.levels[number]).then(function() {

//      console.log('loaded audio for level', number)

      // Place in-game parts first...

      console.log('loading level parts...')

      loadLevelParts(number)

      // Place the level's map onto platforrms next...

      console.log('loading level map onto platforms...')

      loadLevelMapOntoPlatforms(number)

    });

  });

}

function loadLevelParts(number) {

  let platformDefaultY = canvas.height - images.levels[number].platform.height
  let platformWidth = images.levels[number].platform.width
  let platformHeight = images.levels[number].platform.height
  let platformTallWidth = images.levels[number].platformTall.width
  let platformTallHeight = images.levels[number].platformTall.height
  let platformExtraTallWidth = images.levels[number].platformXTall.width
  let platformExtraTallHeight = images.levels[number].platformXTall.height
  let platformBadBushY = canvas.height - platformHeight - images.badBush.walkLeft.height
  let platformTallBadBushY = canvas.height - platformTallHeight - images.badBush.walkLeft.height
  let platformExtraTallBadBushY = canvas.height - platformExtraTallHeight - images.badBush.walkLeft.height
  let platformSnowFlowerY = canvas.height - platformHeight - images.powerUps.snowFlower.height
  let platformTallSnowFlowerY = canvas.height - platformTallHeight - images.powerUps.snowFlower.height
  let platformExtraTallSnowFlowerY = canvas.height - platformExtraTallHeight - images.powerUps.snowFlower.height

//  console.log('platformDefaultY', platformDefaultY)
//  console.log('platformWidth', platformWidth)
//  console.log('platformTallWidth', platformTallWidth)
//  console.log('platformTallHeight', platformTallHeight)
//  console.log('platformExtraTallWidth', platformExtraTallWidth)
//  console.log('platformExtraTallHeight', platformExtraTallHeight)
//  console.log('platformTallBadBushY', platformTallBadBushY)
//  console.log('platformTallSnowFlowerY', platformTallSnowFlowerY)

  if (number === 1) {

    const oakTreeDefaultY = canvas.height - images.levels[number].platform.height - images.trees.oakTree.height

     // level platforms

     getPlatforms().push(

       // tall platform
       new Platform({
         x: 1230 + images.levels[number].platform.width - images.levels[number].platformTall.width,
         y: canvas.height - images.levels[number].platform.height - images.levels[number].platformTall.height * .75,
         image: images.levels[number].platformTall
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

     // Generic Objects
     getGenericObjects().push(

       // oak tree
       new GenericObject({
         x: 420,
         y: oakTreeDefaultY,
         image: images.trees.oakTree
       }),

       // oak tree
       new GenericObject({
         x: 1950,
         y: oakTreeDefaultY,
         image: images.trees.oakTree
       }),

       // oak tree
       new GenericObject({
         x: 2400,
         y: oakTreeDefaultY,
         image: images.trees.oakTree
       })

     )

     // BAD BUSHES

     getBadBushes().push(

       new BadBush({
         position: {
           x: 650,
           y: platformDefaultY - 100
         },
         velocity: {
           x: -1,
           y: 0
         }
       }),

       new BadBush({
         position: {
           x: 2000,
           y: platformDefaultY - 100
         },
         velocity: {
           x: -1,
           y: 0
         }
       }),

       new BadBush({
         position: {
           x: 4000,
           y: platformDefaultY - images.levels[number].platformTall.height
         },
         velocity: {
           x: -1,
           y: 0
         }
       }),

       new BadBush({
         position: {
           x: 5500,
           y: platformDefaultY - images.levels[number].platformTall.height
         },
         velocity: {
           x: -1,
           y: 0
         }
       })

     )

     // SNOW FLOWERS

     getSnowFlowers().push(

       new SnowFlower({
         position: {
           x: 420,
           y: 96
         },
         velocity: {
           x: 0,
           y: 0
         }
       })

     )

  } // level 1

  else if (number === 2) {

    // PLATFORMS

    getPlatforms().push(

       // tall platform
       new Platform({
         x: 180,
         y: canvas.height - platformTallHeight,
         image: images.levels[number].platformTall
       }),

       // extra tall platform
       new Platform({
         x: 180 + platformTallWidth,
         y: canvas.height - platformExtraTallHeight,
         image: images.levels[number].platformXTall
       }),

       // tall platform
       new Platform({
         x: 1500,
         y: canvas.height - platformTallHeight,
         image: images.levels[number].platformTall
       }),

       // tall platform
       new Platform({
         x: 1880,
         y: canvas.height - platformTallHeight,
         image: images.levels[number].platformTall
       }),

       // tall platform
       new Platform({
         x: 3040,
         y: canvas.height - platformTallHeight,
         image: images.levels[number].platformTall
       }),

       // lg platform
//       new Platform({
//         x: 3900,
//         y: canvas.height - platformHeight,
//         image: images.levels[number].platform
//       }),

       // lg platform
//       new Platform({
//         x: 3900 + platformWidth,
//         y: canvas.height - platformHeight,
//         image: images.levels[number].platform
//       }),

       // tall platform
//       new Platform({
//         x: 3900 + platformWidth * 2,
//         y: canvas.height - platformTallHeight,
//         image: images.levels[number].platformTall
//       }),

       // lg platform
       new Platform({
         x: 5050,
         y: canvas.height - platformHeight,
         image: images.levels[number].platform
       }),

       // extra tall platform
       new Platform({
         x: 6050,
         y: canvas.height - platformExtraTallHeight,
         image: images.levels[number].platformXTall
       }),

       // tall platform
       new Platform({
         x: 6250,
         y: canvas.height - platformTallHeight,
         image: images.levels[number].platformTall
       }),

       // tall platform
       new Platform({
         x: 6250,
         y: canvas.height - platformTallHeight,
         image: images.levels[number].platformTall
       }),

       // extra tall platform
       new Platform({
         x: 6910,
         y: canvas.height - platformExtraTallHeight,
         image: images.levels[number].platformXTall
       }),

       // extra tall platform
       new Platform({
         x: 6910 + platformExtraTallWidth,
         y: canvas.height - platformExtraTallHeight,
         image: images.levels[number].platformXTall
       }),

       // tall platform
       new Platform({
         x: 7250,
         y: canvas.height - platformTallHeight,
         image: images.levels[number].platformTall
       }),

     )


    // BAD BUSHES

    getBadBushes().push(

      new BadBush({
        position: {
          x: 560,
          y: platformExtraTallBadBushY
        },
        velocity: {
          x: -1,
          y: 0
        }
      }),

      new BadBush({
        position: {
          x: 1700,
          y: platformTallBadBushY
        },
        velocity: {
          x: -1,
          y: 0
        }
      }),

      new BadBush({
        position: {
          x: 3050,
          y: platformTallBadBushY
        },
        velocity: {
          x: -1,
          y: 0
        }
      }),

      new BadBush({
        position: {
          x: 4280,
          y: platformExtraTallBadBushY
        },
        velocity: {
          x: -1,
          y: 0
        }
      }),

      new BadBush({
        position: {
          x: 5900,
          y: platformBadBushY
        },
        velocity: {
          x: -1,
          y: 0
        }
      }),

      new BadBush({
        position: {
          x: 6250,
          y: platformTallBadBushY
        },
        velocity: {
          x: -1,
          y: 0
        }
      }),

      new BadBush({
        position: {
          x: 7200,
          y: platformTallBadBushY
        },
        velocity: {
          x: -1,
          y: 0
        }
      }),

    )

    // SNOW FLOWERS

    getSnowFlowers().push(

      new SnowFlower({
        position: {
//          x: 500,
//          y: platformExtraTallSnowFlowerY - 128
          x: 1880,
          y: platformExtraTallSnowFlowerY
        },
        velocity: {
          x: 0,
          y: 0
        }
      })

    )

  } // level 2

}

// TODO rename level to number
function loadLevelMapOntoPlatforms(level) {

  // PLATFORMS | map

  // Place level's map onto the platform collection...

  let platformDistance = 0

  levels[level].map.forEach(symbol => {

    let platform

    switch (symbol) {

      case 'lg':
        platform = new Platform({
          x: platformDistance,
          y: canvas.height - images.levels[level].platform.height,
          image: images.levels[level].platform,
//          block: true, // causes hitSideOfPlatfaorm() to trigger upon game start, i.e. can't move, x velocity always 0
          text: platformDistance
        })
        platformDistance += platform.width
        break;

      case 'gap':
        platformDistance += 150
        break;

      case 'xgap':
        platformDistance += 225
        break;

      case 'tall':
        platform = new Platform({
          x: platformDistance,
          y: canvas.height - images.levels[level].platformTall.height,
          image: images.levels[level].platformTall,
          text: platformDistance
        })
        platformDistance += platform.width
        break;

      case 'xtall':
        platform = new Platform({
          x: platformDistance,
          y: canvas.height - images.levels[level].platformXTall.height,
          image: images.levels[level].platformXTall,
          text: platformDistance
        })
        platformDistance += platform.width
        break;

    }

    if (platform) getPlatforms().push(platform)

  })

}

export {

  levels,
  loadLevel,
  reloadLevel

}
