let game = {}
let gravity = 0.5
let player = null
let platforms = []
let genericObjects = []
let backgrounds = []
let foregrounds = []
let badbushes = []
let particles = []
let snowflowers = []
let flagPole = null

function getGame() {
  return game
}

function setGame(_game) {
  game = _game
}

function getPlayer() {
  return player
}
function setPlayer(_player) {
  player = _player
}

function getPlatforms() {
  return platforms
}

function getGenericObjects() {
  return genericObjects
}

function getBackgrounds() {
  return backgrounds
}

function getForegrounds() {
  return foregrounds
}

function getBadBushes() {
  return badbushes
}

function getParticles() {
  return particles
}
function addParticle(particle) {
  getParticles().push(particle)
}

function getSnowFlowers() {
  return snowflowers
}

function getFlagPole() {
  return flagPole
}

function setFlagPole(_flagPole) {
  flagPole = _flagPole
}

export {
  getGame,
  setGame,
  gravity,
  getPlayer,
  setPlayer,
  getPlatforms,
  getGenericObjects,
  getBackgrounds,
  getForegrounds,
  getBadBushes,
  getParticles,
  addParticle,
  getSnowFlowers,
  getFlagPole,
  setFlagPole
}
