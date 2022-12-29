import { images } from './images.js'
import { audio } from './audio.js'
import { playSound, playMusic, stopMusic, loadImages, loadAudio } from './media.js'
import { loadLevel } from './levels.js'

import {
  canvas,
  c
} from './canvas.js'

import {
  init,
  reset
} from './game.js'

import {
  getGame,
  setGame,
  getScrollOffset,
  setScrollOffset,
  scrollOffsetFinish,
  setGravity,
  getGravity,
  getPlayer,
  setPlayer,
  getPlatforms,
  getGenericObjects,
  getBackgrounds,
  getForegrounds,
  getBadBushes,
  getParticles,
  getSnowFlowers,
  getFlagPole,
  setFlagPole
} from './environment.js'

import {
  isOnTopOfPlatform,
  isAtBottomOfPlatform,
  isAtLeftOfPlatform,
  isAtRightOfPlatform,
  hitSideOfPlatform,
  objectsTouch,
  collisionTop,
  isCircleOnTopOfPlatform
} from './utilities/collision.js'

//import { Layer } from './modules/Layer.js'
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

// ANIMATION FRAME (window)

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let gameAnimationFrame;

//setTimeout(function() {
//  stopGame();
//}, 60000);

// GAME PARTS...

let player = null // not available until after init()
let game = null
let scrollOffset = getScrollOffset()
let platforms = getPlatforms()
let genericObjects = getGenericObjects()
let backgrounds = getBackgrounds()
let foregrounds = getForegrounds()
let badbushes = getBadBushes()
let particles = getParticles()
let snowflowers = getSnowFlowers()
let flagPole = null // not available until after init()

// HELPERS

function stopGame() {
  console.log('STOPPED GAME!');
  if (game.musicPlaying) stopMusic()
  cancelAnimationFrame(gameAnimationFrame);
}

// KEYS

let lastKey
const keys = {
  left: {
    pressed: false
  },
  down: {
    pressed: false
  },
  right: {
    pressed: false
  },
  up: {
    pressed: false
  },
  space: {
    pressed: false
  }
}

// ANIMATE

function animate() {

  gameAnimationFrame = requestAnimationFrame(animate)

  player = getPlayer()

  scrollOffset = getScrollOffset()

  flagPole = getFlagPole()

  // Draw Backgrounds
  backgrounds.forEach(background => {
    background.update()
    background.velocity.x = 0
  })

  // Draw Generic Objects
  genericObjects.forEach(genericObject => {
    genericObject.update()
    genericObject.velocity.x = 0
  })

  // Draw Particles
  particles.forEach((particle, i) => {

    particle.update()

    // Remove particles that go outside the canvas.
    if (particle.snowball && (
      particle.position.x - particle.radius >= canvas.width ||
      particle.position.x + particle.radius <= 0
    )) {
      setTimeout(() => {
        particles.splice(i, 1)
      }, 0)
    }

  })

  // Draw Platforms
  platforms.forEach(platform => {
    platform.update()
    platform.velocity.x = 0
  })

  // Draw Flagpole

  if (flagPole) {

    flagPole.update()
    flagPole.velocity.x = 0

    // WIN = player + flag pole
    // complete level
    if (!game.disableUserInput && objectsTouch({
      obj1: player,
      obj2: flagPole
    })) {

      stopMusic()
      audio.sounds.completeLevel.play()

      game.disableUserInput = true

      player.velocity.x = 0
      player.velocity.y = 0

      let oldGravity = getGravity()
      setGravity(0)

      player.sprite = player.sprites.stand.right

      // flag pole slide...
      gsap.to(player.position, {
        y: canvas.height - images.levels[game.level].platform.height - player.height,
        duration: 1,
        onComplete() {
          player.sprite = player.sprites.run.right
        }
      })

      // run off the screen...
      gsap.to(player.position, {
        delay: 1,
        x: canvas.width,
        duration: 2,
        ease: 'power1.in'
      })

      // fireworks
      const particleCount = 300
      const radians = Math.PI * 2 /  particleCount // Math.PI * 2 = 360 deg
      const fireworkJuice = 8
      let increment = 1
      const fireworksInterval = setInterval(() => {

        playSound('die')

        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle({
            position: {
              x: canvas.width / 4 * increment,
              y: canvas.height / 2
            },
            velocity: {
              x: Math.cos(radians * i) * fireworkJuice * Math.random(),
              y: Math.sin(radians * i) * fireworkJuice * Math.random()
            },
            radius: 3 * Math.random(),
            color: `hsl(${Math.random() * 100}, 50%, 50%)`,
            fades: true
          }))
        }

        if (increment === 3) {
          clearInterval(fireworksInterval)
          setTimeout(() => {
            console.log('move to next level')
            loadLevel(game.level + 1).then(function() {
//              lastKey = null
              keys.left.pressed = false
              keys.right.pressed = false
              keys.up.pressed = false
              keys.space.pressed = false
              game.level++
              game.disableUserInput = false
              setGravity(oldGravity)
              reset()
              init()
              // TODO unload last level's assets!
            })
          }, 1);
        }

        increment++

      }, 1000)

    }

  }

  // Draw SnowFlowers
  snowflowers.forEach((snowflower, i) => {

    // If player obtains the SnowFlower power up, activate it.
    if (objectsTouch({
      obj1: player,
      obj2: snowflower
    })) {
      setTimeout(() => {
        snowflowers.splice(i, 1)
        player.activatePowerUp('snow')
      }, 0)
    }
    else {
      snowflower.update()
    }

  })

  // Draw BadBushes
  badbushes.forEach((badbush, i) => {

    badbush.update()

    // snowball particles hit bad bush
    particles.filter(particle => particle.snowball).forEach((particle, particleIndex) => {
      if (
        particle.position.x + particle.radius >= badbush.position.x &&
        particle.position.y + particle.radius >= badbush.position.y &&
        particle.position.x - particle.radius <= badbush.position.x + badbush.width &&
        particle.position.y - particle.radius <= badbush.position.y + badbush.height
      ) {
        badbush.explode()
        badbushes.splice(i, 1)
        particles.splice(particleIndex, 1)
      }
    })

    // BadBush Squish
    if (collisionTop({
      obj1: player,
      obj2: badbush
    })) {

      player.velocity.y -= player.jumpVelocity * 1.4 // trampoline
      player.state = 'jumping'

      badbush.explode()

      badbushes.splice(i, 1) // remove bad bush

    }

    // BadBush Hits the Player
    else if (
      player.position.x + player.width >= badbush.position.x &&
      player.position.y + player.height >= badbush.position.y &&
      player.position.x <= badbush.position.x + badbush.width
    ) {

      if (player.powerUps.snowFlower) {

        player.removePowerUp('snow')

        player.makeInvincible(1500)

      }
      else if (!player.invincible) {

        player.die()

      }

    }

  })

  // Draw Player
  player.update()

  // Draw Foregrounds
  foregrounds.forEach(foreground => {
    foreground.update()
    foreground.velocity.x = 0
  })

  // PLAYER MOVEMENT

  let hitSide = false

  if (game.disableUserInput) return

  if (keys.right.pressed && player.position.x < 400 /* right edge */) {
    player.velocity.x = player.speed
  }

  else if (

    (keys.left.pressed && player.position.x > 100) || /* left edge */
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)

  ) { player.velocity.x = -player.speed }

  else {

    player.velocity.x = 0

    // HANDLE SCROLLING

    if (keys.right.pressed) {

      for (let i = 0; i < platforms.length; i++) {

        const platform = platforms[i];

        platform.velocity.x = -player.speed

        if (platform.block && hitSideOfPlatform({
          object: player,
          platform
        })) {
          platforms.forEach(platform => {
            platform.velocity.x = 0
          })
          hitSide = true
          break
        }

      }

      if (!hitSide) {

        scrollOffset += player.speed
        setScrollOffset(scrollOffset)

        backgrounds.forEach(background => {
          background.velocity.x = -player.speed * background.scrollSpeed // parallax scroll
        })

        flagPole.velocity.x = -player.speed

        genericObjects.forEach(genericObject => {
          genericObject.velocity.x = -player.speed * genericObject.scrollSpeed // parallax scroll
        })

        snowflowers.forEach(snowflower => {
          snowflower.position.x -= player.speed
        })

        badbushes.forEach(badbush => {
          badbush.position.x -= player.speed
        })

        particles.forEach(particle => {
          particle.position.x -= player.speed
        })

        foregrounds.forEach(foreground => {
          foreground.velocity.x = -player.speed * foreground.scrollSpeed // parallax scroll
        })

      }

    }
    else if (keys.left.pressed && scrollOffset > 0 /* left edge */) {

      for (let i = 0; i < platforms.length; i++) {

        const platform = platforms[i];

        platform.velocity.x = player.speed

        if (platform.block && hitSideOfPlatform({
          object: player,
          platform
        })) {
          platforms.forEach(platform => {
            platform.velocity.x = 0
          })
          hitSide = true
          break
        }

      }

      if (!hitSide) {

        scrollOffset -= player.speed
        setScrollOffset(scrollOffset)

        backgrounds.forEach(background => {
          background.velocity.x = player.speed * background.scrollSpeed // parallax scroll
        })

        flagPole.velocity.x = player.speed

        genericObjects.forEach(genericObject => {
          genericObject.velocity.x = player.speed * genericObject.scrollSpeed // parallax scroll
        })

        snowflowers.forEach(snowflower => {
          snowflower.position.x += player.speed
        })

        badbushes.forEach(badbush => {
          badbush.position.x += player.speed
        })

        particles.forEach(particle => {
          particle.position.x += player.speed
        })

        foregrounds.forEach(foreground => {
          foreground.velocity.x = player.speed * foreground.scrollSpeed // parallax scroll
        })

      }

    }

  }

  // COLLISION DETECTION

  // platforms
  platforms.forEach(platform => {

    // PLATFORM + PLAYER

    if (isOnTopOfPlatform({
      object: player,
      platform
    })) { player.velocity.y = 0 }

    // BLOCKS

    if (platform.block) {

      if (isAtBottomOfPlatform({
        object: player,
        platform
      })) {
        player.velocity.y = -player.velocity.y
      }

      if (hitSideOfPlatform({
        object: player,
        platform
      })) { player.velocity.x = 0 }

    }

    // PLATFORM + SNOW FLOWERS

    snowflowers.forEach(snowflower => {

      // snow flower on top of platform
      if (isOnTopOfPlatform({
        object: snowflower,
        platform
      })) {

        // the flower is on the platform...

        // gravity IS pulling, so since the bush is on the platform, stop its y velocity
        snowflower.velocity.y = 0

      }

    })

    // PLATFORM + BAD BUSHES

    for (let i = 0; i < badbushes.length; i++) {

      let badbush = badbushes[i]

      // bush on top of platform
      if (isOnTopOfPlatform({
        object: badbush,
        platform
      })) {

        // the bush is on the platform...

        // bush at left edge of platform, walk right instead (if they aren't already walking right)
        if (isAtLeftOfPlatform({
          object: badbush,
          platform
        }) && badbush.sprite !== badbush.sprites.walk.right) {
//            console.log('left edge');
          badbush.velocity.x *= -1
          badbush.velocity.y = 0
          badbush.sprite = badbush.sprites.walk.right
        }

        // bush at right edge of platform, walk left instead (if they aren't already walking left)
        else if (isAtRightOfPlatform({
          object: badbush,
          platform
        }) && badbush.sprite !== badbush.sprites.walk.left) {
//            console.log('right edge');
          badbush.velocity.x *= -1
          badbush.velocity.y = 0
          badbush.sprite = badbush.sprites.walk.left
        }

        // gravity IS pulling, so since the bush is on the platform, stop its y velocity
        else { badbush.velocity.y = 0 }

      }

    }

    // PLATFORM + PARTICLES

    particles.forEach((particle, i) => {

      // particules bouncing
      if (isCircleOnTopOfPlatform({
        object: particle,
        platform
      })) {
        particle.velocity.y *= -1 * .99
        if (particle.radius -.4 < 0) {
          particles.splice(i, 1)
        }
        else {
          particle.radius -= .4
        }
      }

      if (particle.ttl < 0) {
        particles.splice(i, 1)
      }

    })

  })

  // STATE SWITCHING

  if (player.state === 'jumping' && player.velocity.y === 0) { // reached peak of jump

    player.state = 'falling'

  }
  else if (player.state === 'falling' && player.velocity.y === 0) { // landed after falling

    if (
      keys.right.pressed && lastKey === 'right' ||
      keys.left.pressed && lastKey === 'left'
    ) { player.state = 'running' } // they are running
    else { player.state = 'standing' } // they are standing

  }

  // SPRITE SWITCHING

  switch (player.state) {

    case 'standing':

      if (!keys.left.pressed && lastKey === 'left' && player.sprite !== player.sprites.stand.left) {
        player.frame = 0;
        player.sprite = player.sprites.stand.left;
      }
      else if (
        (
          !keys.right.pressed && lastKey === 'right' ||
          !lastKey && player.sprite !== player.sprites.stand.right
        ) &&
        player.sprite !== player.sprites.stand.right
      ) {
        player.frame = 0
        player.sprite = player.sprites.stand.right
      }

      break

    case 'running':

      if (keys.right.pressed && lastKey === 'right' && player.sprite !== player.sprites.run.right) {
        player.frame = 0;
        player.sprite = player.sprites.run.right;
      }
      else if (keys.left.pressed && lastKey === 'left' && player.sprite !== player.sprites.run.left) {
        player.frame = 0;
        player.sprite = player.sprites.run.left;
      }

      break

    case 'jumping':
    case 'falling':

      if (lastKey === 'left' && player.sprite !== player.sprites.jump.left) {
        player.sprite = player.sprites.jump.left
      }
      else if (
        (lastKey === 'right' || !lastKey) &&
        player.sprite !== player.sprites.jump.right
      ) {
        player.sprite = player.sprites.jump.right
      }

      break

  }

  // LOSE

  // Fall below canvas.
  if (player.position.y > canvas.height) {
    player.die()
  }

} // animate

//-----------------------

// PART II: START GAME

function start() {

  game = getGame() || {
    disableUserInput: false,
    musicEnabled: true,
    level: 1
  }

  setGame(game)

  console.log('loading level 1...')

  loadLevel(1).then(function() {

    // INIT

    init()

    player = getPlayer()

    // ANIMATE

    animate()

    // EVENT LISTENERS

    // KEY DOWN

    addEventListener('keydown', ({ keyCode } ) => {

  //    console.log(keyCode);

      if (game.disableUserInput) return

      // Play music
      if (game.musicEnabled && !game.musicPlaying) {
  //      playMusic()
      }

      switch (keyCode) {

        // LEFT
        case 65: // (A)
        case 37: // (left arrow)

          keys.left.pressed = true

          lastKey = 'left'

          if (player.state !== 'jumping' && player.state !== 'falling') {
            player.state = 'running'
          }

          break

        // RIGHT
        case 68: // (D)
        case 39: // (right arrow)

          keys.right.pressed = true

          lastKey = 'right'

          if (player.state !== 'jumping' && player.state !== 'falling') {
            player.state = 'running'
          }

          break

        // JUMP
        case 87: // (W)
        case 38: // (up arrow)

          keys.space.pressed = true

          if (player.state === 'standing' || player.state === 'running') {

            playSound('jump')

            player.state = 'jumping'
            player.velocity.y -= player.jumpVelocity // jump velocity

          }

          break

        // USE POWER UP (SPACE)
        case 32:

          if (!player.powerUps.snowFlower) return

          // play sound
          playSound('tossSnowFlower')

          // throw/toss a snow ball
          particles.push(new Particle({
            position: {
              x: player.position.x + player.width / 2,
              y: player.position.y + player.height / 2
            },
            velocity: {
              x: lastKey == 'right' ? 12 : -12,
              y: 0
            },
            radius: 5,
            color: '#2eb5ef',
            snowball: true
          }))

          break

      }
    });

    // KEY UP

    addEventListener('keyup', ({ keyCode }) => {

      if (game.disableUserInput) return

      switch (keyCode) {

        // LEFT
        case 65: // (A)
        case 37: // (left arrow)

          keys.left.pressed = false

          if (player.state !== 'jumping' && player.state !== 'falling') {
            player.state = 'standing'
          }

          break

        // RIGHT
        case 68: // (D)
        case 39: // (right arrow)

          keys.right.pressed = false

          if (player.state !== 'jumping' && player.state !== 'falling') {
            player.state = 'standing'
          }

          break

        // JUMP
        case 87: // (W)
        case 38: // (up arrow)
          keys.space.pressed = false
          break

        // USE POWER UP (SPACE)
        case 32:

          break

      }
    });

  })

} // start

// PART I: LOAD ASSETS

console.log('loading images...');

loadImages([

  images.player,
  images.badBush,
  images.powerUps,
  images.trees,
  images.generic

]).then(function() {

//  console.log('loaded images')

  console.log('loading sounds...');

  loadAudio(audio.sounds).then(function() {

//    console.log('loaded sounds')

    start()

  })

})
