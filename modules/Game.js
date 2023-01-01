import { canvas, c } from '../canvas.js'

export class Game {

  constructor({
    level,
    userInputDisabled = false,
    musicEnabled = false,
    musicPlaying = false
  }) {

    this.level = level
    this.userInputDisabled = userInputDisabled
    this.musicEnabled = musicEnabled
    this.musicPlaying = musicPlaying

  }

  getLevel() { return this.level }
  setLevel(level) { this.level = level }

  disableUserInput() { this.userInputDisabled = true }
  enableUserInput() { this.userInputDisabled = false }

  userInputIsDisabled() { return this.userInputDisabled }
  userInputIsEnabled() { return !this.userInputDisabled }

  musicIsEnabled() { return this.musicEnabled }
  musicIsDisabled() { return !this.musicEnabled }

  musicIsPlaying() { return this.musicPlaying }

}
