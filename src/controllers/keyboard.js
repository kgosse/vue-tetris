import store from '@/store';
import commands from './commands';

const keyboard = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  32: 'space',
  83: 's',
  82: 'r',
  80: 'p',
};

let keydownActive;

const boardKeys = Object.keys(keyboard).map(e => parseInt(e, 10));

export const keyDown = (e) => {
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
    return;
  }
  const type = keyboard[e.keyCode];
  if (type === keydownActive) {
    return;
  }
  keydownActive = type;
  commands[type].down(store);
};

export const keyUp = (e) => {
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
    return;
  }
  const type = keyboard[e.keyCode];
  if (type === keydownActive) {
    keydownActive = '';
  }
  commands[type].up(store);
};


