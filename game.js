import { images } from './images.js'

import {
  canvas
} from './canvas.js'

import {
  levels,
} from './levels.js'

import {
  getGame,
  setGame,
  getScrollOffset,
  setScrollOffset,
  scrollOffsetFinish,
  gravity,
  getPlayer,
  setPlayer,
  getPlatforms,
  resetPlatforms,
  getGenericObjects,
  resetGenericObjects,
  getBackgrounds,
  resetBackgrounds,
  getForegrounds,
  resetForegrounds,
  getBadBushes,
  resetBadBushes,
  getParticles,
  resetParticles,
  getSnowFlowers,
  resetSnowFlowers,
  getFlagPole,
  setFlagPole
} from './environment.js'

import { Background } from './modules/Background.js'
import { Foreground } from './modules/Foreground.js'
import { GenericObject } from './modules/GenericObject.js'
import { Platform } from './modules/Platform.js'
import { Particle } from './modules/Particle.js'
import { Sprite } from './modules/Sprite.js'

import { Player } from './sprites/Player.js'
import { BadBush } from './sprites/BadBush.js'
import { SnowFlower } from './sprites/SnowFlower.js'
import { Tree } from './sprites/Tree.js'

let player = getPlayer()
let game = getGame()
let scrollOffset = getScrollOffset()
let platforms = getPlatforms()
let genericObjects = getGenericObjects()
let backgrounds = getBackgrounds()
let foregrounds = getForegrounds()
let badbushes = getBadBushes()
let particles = getParticles()
let snowflowers = getSnowFlowers()
let flagPole = getFlagPole()

var reset = function() {

  setPlayer(null)
//  setGame(null)
  setScrollOffset(0)
  resetPlatforms()
  resetGenericObjects()
  resetBackgrounds()
  resetForegrounds()
  resetBadBushes()
  resetParticles()
  resetParticles()
  resetSnowFlowers()

}

// INIT

var init = function() {

  game = getGame()

  let level = game.level
  var platformWidth = images.levels[game.level].platform.width
  var platformDefaultY = canvas.height - images.levels[game.level].platform.height

  // GAME PARTS...

  // PLAYER

  player = new Player({
    position: {
      x: 100,
      y: platformDefaultY - images.player.standRight.height // start on the ground
    },
    velocity: {
      x: 0,
      y: 0
    }
  })

  setPlayer(player)

  // PLATFORMS | map

  // Place level's map onto the platform collection...

  let platformDistance = 0

  levels[level].map.forEach(symbol => {

    switch (symbol) {

      case 'lg':
        platforms.push(new Platform({
          x: platformDistance,
          y: canvas.height - images.levels[level].platform.height,
          width: platformWidth,
          image: images.levels[level].platform,
//          block: true, // causes hitSideOfPlatform() to trigger upon game start, i.e. can't move, x velocity always 0
          text: platformDistance
        }))
        platformDistance += platformWidth
        break;

      case 'gap':
        platformDistance += 150
        break;

      case 'tall':
        platforms.push(new Platform({
          x: platformDistance,
          y: canvas.height - images.levels[level].platformTall.height,
          image: images.levels[level].platformTall,
          text: platformDistance
        }))
        platformDistance += images.levels[level].platformTall.width // hmmm?
        break;

      case 'xtall':
        platforms.push(new Platform({
          x: platformDistance,
          y: canvas.height - images.levels[level].platformXTall.height,
          image: images.levels[level].platformXTall,
          text: platformDistance
        }))
        platformDistance += images.levels[level].platformXTall.width // hmmm?
        break;

    }

  })

  // 6 - block
//  platforms.push(new Platform({
//    x: platforms[0].position.x + Math.round(platforms[0].width*.25),
//    y: platformDefaultY - 108,
//    width: 96,
//    image: assets.triBlock,
//    block: true
//  }));

  // FLAG POLE

  flagPole = new GenericObject({
    x: scrollOffsetFinish,
    y: canvas.height - images.levels[game.level].platform.height - images.generic.flagPole.height,
    image: images.generic.flagPole,
    scrollSpeed: 1
  })

  setFlagPole(flagPole)

  // GENERIC OBJECTS

  const oakTreeDefaultY = canvas.height - images.levels[game.level].platform.height - images.trees.oakTree.height

  genericObjects.push(

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

  // BACKGROUNDS

  backgrounds.push(

    // SKY
    new Background({
      x: 0,
      y: 0,
      image: images.levels[game.level].sky,
      scrollSpeed: .11,
      autoScroll: true
    }),

    // HILLS
    new Background({
      x: 0,
      y: 0,
      image: images.levels[game.level].hills,
      scrollSpeed: .33
    })

    // OAK TREE
//    new Background({
//      x: 420,
//      y: canvas.height - assets.platform.height - assets.oakTree.height,
//      image: assets.oakTree
//    })

  )

  // BAD BUSHES

  badbushes.push(

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
        y: platformDefaultY - images.levels[game.level].platformTall.height
      },
      velocity: {
        x: -1,
        y: 0
      }
    }),

    new BadBush({
      position: {
        x: 5500,
        y: platformDefaultY - images.levels[game.level].platformTall.height
      },
      velocity: {
        x: -1,
        y: 0
      }
    })

  )

  // PARTICLES
//  particles.push()

  // SNOW FLOWERS

  snowflowers.push(

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

  // FOREGROUNDS

//  foregrounds.push(

    // BIRCH TREE
//    new Foreground({
//      x: platforms[0].position.x + platforms[0].width *.9,
//      y: platforms[0].position.y - assets.birchTree.height,
//      image: assets.birchTree
//    })

//  )

  scrollOffset = 0
  setScrollOffset(0)

}

export {
  reset,
  init
}
