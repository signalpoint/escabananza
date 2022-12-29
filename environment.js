// TODO move game stuff to game.js?

let game = null

let scrollOffset = 0 // SCROLL OFFSET
const scrollOffsetFinish = 7650 // WIN: level 1
//const scrollOffsetFinish = 720 // WIN: test

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

function getGameOption(name) {
  return getGame()[name]
}

function setGameOption(name, value) {
  getGame()[name] = value
}

function getScrollOffset() {
  return scrollOffset
}

function setScrollOffset(_scrollOffset) {
  scrollOffset = _scrollOffset
}

function getGravity() {
  return gravity
}

function setGravity(_gravity) {
  gravity = _gravity
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

function setPlatforms(_platforms) {
  platforms = platforms
}

function resetPlatforms() {
  getPlatforms().length = 0
}

function getGenericObjects() {
  return genericObjects
}

function setGenericObjects(_genericObjects) {
  genericObjects = _genericObjects
}

function resetGenericObjects() {
  getGenericObjects().length = 0
}

function getBackgrounds() {
  return backgrounds
}

function setBackgrounds(_backgrounds) {
  backgrounds = _backgrounds
}

function resetBackgrounds() {
  getBackgrounds().length = 0
}

function getForegrounds() {
  return foregrounds
}

function setForegrounds(_foregrounds) {
  foregrounds = _foregrounds
}

function resetForegrounds() {
  getForegrounds().length = 0
}

function getBadBushes() {
  return badbushes
}

function setBadBushes(_badbushes) {
  badbushes = _badbushes
}

function resetBadBushes() {
  getBadBushes().length = 0
}

function getParticles() {
  return particles
}

function setParticles(_particles) {
  particles = _particles
}

function resetParticles() {
  getParticles().length = 0
}

function addParticle(particle) {
  getParticles().push(particle)
}

function getSnowFlowers() {
  return snowflowers
}

function setSnowFlowers(_snowflowers) {
  snowflowers = _snowflowers
}

function resetSnowFlowers() {
  getSnowFlowers().length = 0
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
  getGameOption,
  setGameOption,

  getScrollOffset,
  setScrollOffset,
  scrollOffsetFinish,

  gravity,
  getGravity,
  setGravity,

  getPlayer,
  setPlayer,

  getPlatforms,
  setPlatforms,
  resetPlatforms,

  getGenericObjects,
  setGenericObjects,
  resetGenericObjects,

  getBackgrounds,
  setBackgrounds,
  resetBackgrounds,

  getForegrounds,
  setForegrounds,
  resetForegrounds,

  getBadBushes,
  setBadBushes,
  resetBadBushes,

  getParticles,
  setParticles,
  resetParticles,
  addParticle,

  getSnowFlowers,
  setSnowFlowers,
  resetSnowFlowers,

  getFlagPole,
  setFlagPole
}
