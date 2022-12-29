export function isOnTopOfPlatform({object, platform}) {

  // (rectangular collision detection)
  return object.position.y + object.height <= platform.position.y &&
    object.position.y + object.height + object.velocity.y >= platform.position.y &&
    object.position.x + object.width >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width

}

export function isAtBottomOfPlatform({object, platform}) {

  // (rectangular collision detection)
  return object.position.y >= platform.position.y + platform.height &&
    object.position.y + object.velocity.y <= platform.position.y + platform.height &&
    object.position.x + object.width >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width

}

export function isAtLeftOfPlatform({object, platform}) {
  return object.position.x === platform.position.x
}

export function isAtRightOfPlatform({object, platform}) {
  return object.position.x + object.width - 1 === platform.position.x + platform.width - 1
}

export function hitSideOfPlatform({object, platform}) {
  return object.position.x + object.width + object.velocity.x - platform.velocity.x >= platform.position.x &&
    object.position.x + object.velocity.x <= platform.position.x + platform.width &&
    object.position.y <= platform.position.y + platform.height &&
    object.position.y + object.height >= platform.position.y
}

export function objectsTouch({obj1, obj2}) {
  return obj1.position.x + obj1.width >= obj2.position.x &&
    obj1.position.x <= obj2.position.x + obj2.width &&
    obj1.position.y + obj1.height >= obj2.position.y &&
    obj1.position.y <= obj2.position.y + obj2.height
}

export function collisionTop({obj1, obj2}) {

  // (rectangular collision detection)
  return obj1.position.y + obj1.height <= obj2.position.y &&
    obj1.position.y + obj1.height + obj1.velocity.y >= obj2.position.y &&
    obj1.position.x + obj1.width >= obj2.position.x &&
    obj1.position.x <= obj2.position.x + obj2.width

}

export function isCircleOnTopOfPlatform({object, platform}) {

  // (rectangular collision detection)
  return object.position.y + object.radius <= platform.position.y &&
    object.position.y + object.radius + object.velocity.y >= platform.position.y &&
    object.position.x + object.radius >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width

}
