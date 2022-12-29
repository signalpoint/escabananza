import { audio } from './audio.js'
import { setGameOption } from './environment.js'

function playSound(name) {
  // If the sound is already playing, pause and reset it.
  if (!audio.sounds[name].paused) {
    audio.sounds[name].pause()
    audio.sounds[name].currentTime = 0;
  }
  audio.sounds[name].play()
}

function playMusic() {
//  assets.level1.loop = true
//  playSound('level1')
  setGameOption('musicPlaying', true)
}

function stopMusic() {
//  assets.level1.pause()
  setGameOption('musicPlaying', false)
}

function loadImages(assets) {

  let assetsToLoad = 0;

  // One asset set...

  if (!Array.isArray(assets)) {

    return new Promise(function(ok, err) {

      for (var name in assets) {

        if (!assets.hasOwnProperty(name)) { continue }

        var src = assets[name].src
        var filename = src.split('/').pop()

        // Get file extension. @credit https://stackoverflow.com/a/1203361/763010
        var type = filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;

        switch (type) {

          case 'png':

            assetsToLoad++

            var img = new Image()
            img.src = src
            img.setAttribute('data-name', name)

            img.onload = function() {

              var name = this.getAttribute('data-name')
//              console.log(`loaded ${name}`, this.src)

              assets[name] = this
              assetsToLoad--
              if (!assetsToLoad) ok()

            }

            break

          default:

            console.error(`${src} can't be loaded`)

            break

        }

      }

    })

  }

  // Multiple asset sets...

  return new Promise(function(ok, err) {

    for (let i = 0; i < assets.length; i++) {

      let asset = assets[i]

      for (var name in asset) {

        if (!asset.hasOwnProperty(name)) { continue }

        var src = asset[name].src
        var filename = src.split('/').pop()

        // Get file extension. @credit https://stackoverflow.com/a/1203361/763010
        var type = filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;

        switch (type) {

          case 'png':

            assetsToLoad++

            var img = new Image()
            img.src = src
            img.setAttribute('data-name', name)

            img.onload = function() {

              var name = this.getAttribute('data-name')
//              console.log(`loaded ${name}`, this.src)

              assets[i][name] = this
              assetsToLoad--
              if (!assetsToLoad) ok()

            }

            break

          default:

            console.error(`${src} can't be loaded`)

            break

        }

      }

    }
  })

}

function loadAudio(assets) {

  var assetsToLoad = 0;

  return new Promise(function(ok, err) {

    if (!assets)  {
      ok()
      return
    }

    for (var name in assets) {

      if (!assets.hasOwnProperty(name)) { continue }

      var src = assets[name].src
      var filename = src.split('/').pop()

      // Get file extension. @credit https://stackoverflow.com/a/1203361/763010
      var type = filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;

      switch (type) {

        case 'mp3':
        case 'wav':

          assetsToLoad++

          var sound = new Audio(src)
          sound.setAttribute('data-name', name)

          sound.addEventListener("canplay", (event) => {

            // The canplay event fires each time we play a sound, so we skip it once all assets are loaded.
            if (!assetsToLoad) return

            var self = event.target
            var name = self.getAttribute('data-name')
//            console.log('loaded', name, self.src)

            assets[name] = self
            assetsToLoad--
            if (!assetsToLoad) ok()

          });

          break

        default:

          console.error(`${src} can't be loaded`);

          break

      }

    }

  });

}

export {
  playSound,
  playMusic,
  stopMusic,
  loadImages,
  loadAudio
}
