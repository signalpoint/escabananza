

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

  // BLOCKS

  triBlock: {
    src: 'img/tri-block.png'
  },

  // PLAYER

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

// SCROLL OFFSET

let scrollOffset = 0 // WIN: "let" means it changes over time

let platforms = null

let backgrounds = null

let foregrounds = null

let badbushes = null

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

  platforms = []

  // 0
  platforms.push(new Platform({
    x: 0,
    y: platformDefaultY,
    width: platformWidth * 1.5,
    image: assets.platform
//    block: true // hmmm, player can't move if this one is a block, makes sense, player is stuck in a collision
  }));

  // 1
  platforms.push(new Platform({
    x: platforms[0].position.x + platforms[0].width + 100,
    y: platformDefaultY,
    width: platformWidth,
    image: assets.platform,
    block: true
  }));

  // 2 - tall platform
  platforms.push(new Platform({
    x: platforms[1].position.x + platforms[1].width + 150 + (platformWidth * 1.66),
    y: platformDefaultY - 100,
    image: assets.platformTall
  }));

  // 3
  platforms.push(new Platform({
    x: platforms[1].position.x + platforms[1].width + 150,
    y: platformDefaultY,
    width: platformWidth * 2,
    image: assets.platform,
    block: true
  }));

  // 4
  platforms.push(new Platform({
    x: platforms[3].position.x + platforms[3].width + 200,
    y: platformDefaultY,
    width: platformWidth / 2,
    image: assets.platform,
    block: true
  }));

  // 5
  platforms.push(new Platform({
    x: platforms[4].position.x + platforms[4].width + 250,
    y: platformDefaultY,
    image: assets.platform,
    block: true
  }));

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
    }),

    // OAK TREE
    new Background({
      x: platforms[0].position.x + platforms[0].width * .7,
      y: platforms[0].position.y - assets.oakTree.height,
      image: assets.oakTree
    })

  ]

  // BAD BUSHES

  badbushes = [

    new BadBush({
      position: {
        x: Math.round(platforms[1].position.x + platforms[1].width * .75),
        y: platforms[1].position.y - assets.badBushWalkLeft.height
      },
      velocity: {
        x: -1,
        y: 0
      }
    }),

    new BadBush({
      position: {
        x: Math.round(platforms[3].position.x + platforms[3].width * .22),
        y: platforms[3].position.y - 100
      },
      velocity: {
        x: -1,
        y: 0
      }
    })

  ]

  // SNOW FLOWERS

  snowflowers = [

    new SnowFlower({
      position: {
        x: Math.round(platforms[0].position.x + platforms[0].width * .7),
        y: platforms[1].position.y - 420
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
//      x: platforms[0].position.x + platforms[0].width *.66,
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

    if (objectsTouch({
      obj1: player,
      obj2: snowflower
    })) {
      setTimeout(() => {
        snowflowers.splice(i, 1)
      }, 0)
    }
    else {
      snowflower.update()
    }

  })

  // Draw BadBushes
  badbushes.forEach((badbush, i) => {

    badbush.update()

    // KILL BadBush
    if (collisionTop({
      obj1: player,
      obj2: badbush
    })) {

      player.velocity.y -= 15 // trampoline
      player.state = 'jumping'

      badbushes.splice(i, 1) // remove bad bush

    }

    // DEATH | BadBush Kills You
    else if (
      player.position.x + player.width >= badbush.position.x &&
      player.position.y + player.height >= badbush.position.y &&
      player.position.x <= badbush.position.x + badbush.width
    ) { init() }

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

    if (platform.block) {

      if (isAtBottomOfPlatform({
        object: player,
        platform
      })) {
        player.velocity.y *= -1
      }

      if (hitSideOfPlatform({
        object: player,
        platform
      })) { player.velocity.x = 0 }

    }

    // PLATFORM + SNOW FLOWERS

    snowflowers.forEach(snowflower => {

      // bush on top of platform
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
  if (scrollOffset > assets.platform.width * 5 + (850 - 400)) { console.log('you win!') }

  // LOSE
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

      // JUMP (SPACE)
      case 32:

        keys.space.pressed = true

        if (player.state === 'standing' || player.state === 'running') {
          player.state = 'jumping'
          player.velocity.y -= 10
        }

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

      // JUMP (SPACE)
      case 32:
        keys.space.pressed = false
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
