import { images } from './images.js'

import {
  canvas
} from './canvas.js'

import {
  levels,
  reloadLevel
} from './levels.js'

import {
  getGame,
  setGame,
  getScrollOffset,
  setScrollOffset,
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

  reloadLevel(getGame().level)

}

// INIT

var init = function() {

  game = getGame()

  let level = game.level

  // GAME PARTS...

  // PLAYER

  player = new Player({
    position: levels[level].startPosition,
    velocity: {
      x: 0,
      y: 0
    }
  })

  setPlayer(player)

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
    x: levels[level].finishPosition.x,
    y: levels[level].finishPosition.y,
    image: images.generic.flagPole,
    scrollSpeed: 1
  })

  setFlagPole(flagPole)

  // GENERIC OBJECTS

  // BACKGROUNDS

  backgrounds.push(

    // SKY
    new Background({
      x: 0,
      y: 0,
      image: images.levels[level].sky,
      scrollSpeed: .15,
      autoScroll: true
    }),

    // HILLS
    new Background({
      x: 0,
      y: 0,
      image: images.levels[level].hills,
      scrollSpeed: .34
    })

    // OAK TREE
//    new Background({
//      x: 420,
//      y: canvas.height - assets.platform.height - assets.oakTree.height,
//      image: assets.oakTree
//    })

  )

  // PARTICLES
//  particles.push()

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
