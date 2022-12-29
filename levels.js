import { images } from './images.js'
import { audio } from './audio.js'
import { loadImages, loadAudio } from './media.js'

const levelsPlatformMap = {
  1: [
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
    'gap',
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
    'gap',
    'lg',
    'lg',
    'lg'
  ],
  2: [
    'lg',
    'gap',
    'tall',
    'gap',
    'xtall'
  ]
}

function loadLevel(number) {

  return loadImages(images.levels[number]).then(function() {

    console.log('loaded images', number);

    loadAudio(audio.levels[number]).then(function() {

      console.log('loaded audio', number);

    });

  });

}

export {

  levelsPlatformMap,
  loadLevel

}
