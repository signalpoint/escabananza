

// ASSETS | Declare and Count

let assets = {

  // BACKGROUNDS

  sky: {
    src: 'img/sky.png'
  },

  hills: {
    src: 'img/hills.png'
  },

  // PLATFORMS

  platform: {
    src: 'img/platform.png'
  },
  platformTall: {
    src: 'img/platform-tall.png'
  },
  platformXTall: {
    src: 'img/xtall-platform.png'
  },

  // BLOCKS

  singleBlock: {
    src: 'img/single-block.png'
  },

  triBlock: {
    src: 'img/tri-block.png'
  },

  // PLAYER

  // default
  standLeft: {
    src: 'img/sprites/frankenstein/standLeft.png'
  },
  standRight: {
    src: 'img/sprites/frankenstein/standRight.png'
  },
  runLeft: {
    src: 'img/sprites/frankenstein/walkLeft.png'
  },
  runRight: {
    src: 'img/sprites/frankenstein/walkRight.png'
  },
  jumpLeft: {
    src: 'img/sprites/frankenstein/jumpLeft.png'
  },
  jumpRight: {
    src: 'img/sprites/frankenstein/jumpRight.png'
  },

  // snow
  standLeftSnow: {
    src: 'img/sprites/frankenstein/snow/standLeft.png'
  },
  standRightSnow: {
    src: 'img/sprites/frankenstein/snow/standRight.png'
  },
  runLeftSnow: {
    src: 'img/sprites/frankenstein/snow/walkLeft.png'
  },
  runRightSnow: {
    src: 'img/sprites/frankenstein/snow/walkRight.png'
  },
  jumpLeftSnow: {
    src: 'img/sprites/frankenstein/snow/jumpLeft.png'
  },
  jumpRightSnow: {
    src: 'img/sprites/frankenstein/snow/jumpRight.png'
  },

  // BAD BUSH

  badBushWalkLeft: {
    src: 'img/sprites/bad-bush/walkLeft.png'
  },
  badBushWalkRight: {
    src: 'img/sprites/bad-bush/walkRight.png'
  },

  snowFlowerPlanted: {
    src: 'img/sprites/snow-flower.png'
  },

  // TREES

  oakTree: {
    src: 'img/sprites/trees/oak.png'
  },

  birchTree: {
    src: 'img/sprites/trees/birch.png'
  }

}
let totalAssets = 0
for (var name in assets) {
  if (!assets.hasOwnProperty(name)) { continue }
  totalAssets++
}

// CANVAS

// Get canvas and declare 2d context.
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Set canvas width and height.
// 16:9 aspect ratio
canvas.width = 1024
canvas.height = 576

// ANIMATION FRAME (window)

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let gameAnimationFrame;

setTimeout(function() {
  cancelAnimationFrame(gameAnimationFrame);
  console.log('STOPPED GAME!');
}, 30000);

// CONSTANTS

// Gravity
const gravity = 0.5

// GAME PARTS...

// PLAYER

let player = null
let playerJumpVelocity = 12

// SCROLL OFFSET

let scrollOffset = 0 // WIN: "let" means it changes over time
const scrollOffsetFinish = 5000

let platforms = null

let backgrounds = null

let foregrounds = null

let badbushes = null

let particles = null

let snowflowers = null

// HELPERS

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomBadBush() {
  return new BadBush({
    position: {
      x: getRandomInt(canvas.width - 64),
      y: getRandomInt(420)
    },
    velocity: {
      x: getRandomInt(3) * -1,
      y: 0
    }
  })
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

// INIT

var init = function() {

  var platformWidth = assets.platform.width
  var platformDefaultY = canvas.height - assets.platform.height

  // GAME PARTS...

  // PLAYER

  player = new Player({
    position: {
      x: 100,
      y: platformDefaultY - assets.standRight.height // start on the ground
    },
    velocity: {
      x: 0,
      y: 0
    }
  })

  // PLATFORMS

  // Place generic in-game platforms first...

  platforms = [

    // tri block + single block stack
    new Platform({
      x: 360 + 128,
      y: 350,
      image: assets.triBlock,
      block: true
    }),
    new Platform({
      x: 360 + 128 + assets.singleBlock.width,
      y: 225,
      image: assets.singleBlock,
      block: true
    }),

    // tall platform
    new Platform({
      x: 1230 + assets.platform.width - assets.platformTall.width,
      y: canvas.height - assets.platform.height - assets.platformTall.width,
      image: assets.platformTall
    }),

    // 2 single block (blocks their path, forces them to jump over)
    new Platform({
      x: 1230 + (assets.platform.width / 2),
      y: platformDefaultY - assets.singleBlock.height,
      image: assets.singleBlock,
      block: true
    }),
    new Platform({
      x: 1230 + (assets.platform.width / 2),
      y: platformDefaultY - assets.singleBlock.height * 2,
      image: assets.singleBlock,
      block: true
    })

  ]

  // Build level platforms map...

  const platformsMap = [
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
    'xtall',
    'xtall',
    'gap',
    'gap',
    'xtall',
    'xtall',
    'gap',
    'gap',
    'lg',
    'lg'
  ]

  // Place level platforms onto collection...

  let platformDistance = 0

  platformsMap.forEach(symbol => {
    switch (symbol) {

      case 'lg':
        platforms.push(new Platform({
          x: platformDistance,
          y: canvas.height - assets.platform.height,
          width: platformWidth,
          image: assets.platform,
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
          y: canvas.height - assets.platformTall.height,
          image: assets.platformTall,
          text: platformDistance
        }))
        platformDistance += assets.platformTall.width // hmmm?
        break;

      case 'xtall':
        platforms.push(new Platform({
          x: platformDistance,
          y: canvas.height - assets.platformXTall.height,
          image: assets.platformXTall,
          text: platformDistance
        }))
        platformDistance += assets.platformXTall.width // hmmm?
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

  // BACKGROUNDS

  backgrounds = [

    // SKY
    new Background({
      x: 0,
      y: 0,
      image: assets.sky,
      scrollSpeed: .11,
      autoScroll: true
    }),

    // HILLS
    new Background({
      x: 0,
      y: 0,
      image: assets.hills,
      scrollSpeed: .33
    })

    // OAK TREE
//    new Background({
//      x: 420,
//      y: canvas.height - assets.platform.height - assets.oakTree.height,
//      image: assets.oakTree
//    })

  ]

  // BAD BUSHES

  badbushes = [

    new BadBush({
      position: {
        x: 600,
        y: platformDefaultY - 100
      },
      velocity: {
        x: -1,
        y: 0
      }
    }),

    new BadBush({
      position: {
        x: 1270,
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
        x: 2500,
        y: platformDefaultY - 100
      },
      velocity: {
        x: -1,
        y: 0
      }
    }),

    new BadBush({
      position: {
        x: 3570,
        y: canvas.height - assets.platformTall.height - assets.badBushWalkLeft.height
      },
      velocity: {
        x: -1,
        y: 0
      }
    })

  ]

  // PARTICLES
  particles = []

  // SNOW FLOWERS

  snowflowers = [

    new SnowFlower({
      position: {
        x: 192,
        y: 96
      },
      velocity: {
        x: 0,
        y: 0
      }
    })

  ]

  // FOREGROUNDS

  foregrounds = [

    // BIRCH TREE
//    new Foreground({
//      x: platforms[0].position.x + platforms[0].width *.9,
//      y: platforms[0].position.y - assets.birchTree.height,
//      image: assets.birchTree
//    })

  ]

  scrollOffset = 0

}

// ANIMATE

function animate() {

  gameAnimationFrame = requestAnimationFrame(animate)

//  c.fillStyle = 'white'
//  c.fillRect(0, 0, canvas.width, canvas.height)

  // Draw Backgrounds
  backgrounds.forEach(background => {
    background.update()
    background.velocity.x = 0
  })

  // Draw Platforms
  platforms.forEach(platform => {
    platform.update()
    platform.velocity.x = 0
  })

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

      player.velocity.y -= playerJumpVelocity * 1.4 // trampoline
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
        init()
      }

    }

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

  // Draw Player
  player.update()

  // Draw Foregrounds
  foregrounds.forEach(foreground => {
    foreground.update()
    foreground.velocity.x = 0
  })

  // PLAYER MOVEMENT

  let hitSide = false

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

        backgrounds.forEach(background => {
          background.velocity.x = -player.speed * background.scrollSpeed // parallax scroll
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

        backgrounds.forEach(background => {
          background.velocity.x = player.speed * background.scrollSpeed // parallax scroll
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

    badbushes.forEach(badbush => {

      // bush on top of platform
      if (isOnTopOfPlatform({
        object: badbush,
        platform
      })) {

        // the bush is on the platform...

        // bush at left edge of platform, walk right instead
        if (isAtLeftOfPlatform({
          object: badbush,
          platform
        })) {
//            console.log('left edge');
          badbush.velocity.x *= -1
          badbush.velocity.y = 0
          badbush.sprite = badbush.sprites.walk.right
        }

        // bush at right edge of platform, walk left instead
        else if (isAtRightOfPlatform({
          object: badbush,
          platform
        })) {
//            console.log('right edge');
          badbush.velocity.x *= -1
          badbush.velocity.y = 0
          badbush.sprite = badbush.sprites.walk.left
        }

        // gravity IS pulling, so since the bush is on the platform, stop its y velocity
        else { badbush.velocity.y = 0 }

      }

    })

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

  // WIN


  if (scrollOffset > scrollOffsetFinish) {
    console.log('you win!')
  }

  // LOSE

  // Fall below canvas.
  if (player.position.y > canvas.height) { init() }

} // animate

// COLLISION DETECTION

function isOnTopOfPlatform({object, platform}) {

  // (rectangular collision detection)
  return object.position.y + object.height <= platform.position.y &&
    object.position.y + object.height + object.velocity.y >= platform.position.y &&
    object.position.x + object.width >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width

}

function isAtBottomOfPlatform({object, platform}) {

  // (rectangular collision detection)
  return object.position.y >= platform.position.y + platform.height &&
    object.position.y + object.velocity.y <= platform.position.y + platform.height &&
    object.position.x + object.width >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width

}

function isAtLeftOfPlatform({object, platform}) {
  return object.position.x === platform.position.x
}

function isAtRightOfPlatform({object, platform}) {
  return object.position.x + object.width - 1 === platform.position.x + platform.width - 1
}

function hitSideOfPlatform({object, platform}) {
  return object.position.x + object.width + object.velocity.x - platform.velocity.x >= platform.position.x &&
    object.position.x + object.velocity.x <= platform.position.x + platform.width &&
    object.position.y <= platform.position.y + platform.height &&
    object.position.y + object.height >= platform.position.y
}

function objectsTouch({obj1, obj2}) {
  return obj1.position.x + obj1.width >= obj2.position.x &&
    obj1.position.x <= obj2.position.x + obj2.width &&
    obj1.position.y + obj1.height >= obj2.position.y &&
    obj1.position.y <= obj2.position.y + obj2.height
}

function collisionTop({obj1, obj2}) {

  // (rectangular collision detection)
  return obj1.position.y + obj1.height <= obj2.position.y &&
    obj1.position.y + obj1.height + obj1.velocity.y >= obj2.position.y &&
    obj1.position.x + obj1.width >= obj2.position.x &&
    obj1.position.x <= obj2.position.x + obj2.width

}

function isCircleOnTopOfPlatform({object, platform}) {

  // (rectangular collision detection)
  return object.position.y + object.radius <= platform.position.y &&
    object.position.y + object.radius + object.velocity.y >= platform.position.y &&
    object.position.x + object.radius >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width

}

//-----------------------

// PART II: START GAME

function game() {
  // INIT

  init()

  // ANIMATE

  animate()

  // EVENT LISTENERS

  // KEY DOWN

  addEventListener('keydown', ({ keyCode } ) => {
    switch (keyCode) {

      // LEFT (A)
      case 65:

        keys.left.pressed = true

        lastKey = 'left'

        if (player.state !== 'jumping' && player.state !== 'falling') {
          player.state = 'running'
        }

        break

      // RIGHT (D)
      case 68:

        keys.right.pressed = true

        lastKey = 'right'

        if (player.state !== 'jumping' && player.state !== 'falling') {
          player.state = 'running'
        }

        break

      // JUMP (W)
      case 87:

        keys.space.pressed = true

        if (player.state === 'standing' || player.state === 'running') {
          player.state = 'jumping'
          player.velocity.y -= playerJumpVelocity // jump velocity
        }

        break

      // USE POWER UP (SPACE)
      case 32:

        if (!player.powerUps.snowFlower) return

        // throw a snow ball
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
    switch (keyCode) {

      // LEFT (A)
      case 65:

        keys.left.pressed = false

        if (player.state !== 'jumping' && player.state !== 'falling') {
          player.state = 'standing'
        }

        break

      // RIGHT (D)
      case 68:

        keys.right.pressed = false

        if (player.state !== 'jumping' && player.state !== 'falling') {
          player.state = 'standing'
        }

        break

      // JUMP (W)
      case 87:
        keys.space.pressed = false
        break

      // USE POWER UP (SPACE)
      case 32:

        break

    }
  });

} // GAME

// PART I: LOAD ASSETS

var assetsToLoad = totalAssets

for (var name in assets) {

  if (!assets.hasOwnProperty(name)) { continue }

  var img = new Image()
  img.src = assets[name].src
  img.setAttribute('data-name', name)

  img.onload = function() {

    var name = this.getAttribute('data-name')
    console.log('loaded', name, this.src)

    assets[name] = this
    assetsToLoad--
    if (!assetsToLoad) {
      game()
    }

  }

}
