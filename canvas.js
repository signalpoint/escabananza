// TODO all the environment.js usage in this file should probably be in something like main.js, it'd lighten up this
// module a whole bunch; keep it lean and mean for its animation purposes

// CANVAS

// Get canvas and declare 2d context.
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Set canvas width and height.
// 16:9 aspect ratio
canvas.width = 1024
canvas.height = 576

export {
  canvas,
  c
}
