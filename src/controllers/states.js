import {List} from 'immutable';
import store from '@/store';
import {blankLine, getStartMatrix, blankMatrix} from '@/consts/matrix';
import {want, isClear, isOver} from '@/utils';
import {music} from '@/utils/music';
import {speeds, clearPoints, eachLines} from '@/consts';
import * as appMutations from '@/store/mutation-types';
import * as keyboardMutations from '@/store/modules/keyboard/mutation-types';

const states = {

  fallInterval: null,

  start: () => {
    if (music.start) {
      music.start();
    }
    const state = store.state;
    states.dispatchPoints(0);
    store.commit({type: appMutations.SPEED_RUN, data: state.speedStart});
    const startLines = state.startLines;
    const startMatrix = getStartMatrix(startLines);
    store.commit({type: appMutations.MATRIX, data: startMatrix});
    store.commit({type: appMutations.MOVE_BLOCK, data: {type: state.next}});
    store.commit({type: appMutations.NEXT_BLOCK});
    states.auto();
  },

  auto: (timeout) => {
    const out = (timeout < 0 ? 0 : timeout);
    let state = store.state;
    let cur = state.cur;
    const fall = () => {
      state = store.state;
      cur = state.cur;
      const next = cur.fall();
      if (want(next, state.matrix)) {
        store.commit({type: appMutations.MOVE_BLOCK, data: next});
        states.fallInterval = setTimeout(fall, speeds[state.speedRun - 1]);
      } else {
        let matrix = state.matrix;
        const shape = cur && cur.shape;
        const xy = cur && cur.xy;
        shape.forEach((m, k1) => (
          m.forEach((n, k2) => {
            if (n && xy.get(0) + k1 >= 0) {
              let line = matrix.get(xy.get(0) + k1);
              line = line.set(xy.get(1) + k2, 1);
              matrix = matrix.set(xy.get(0) + k1, line);
            }
          })
        ));
        states.nextAround(matrix);
      }
    };
    clearTimeout(states.fallInterval);
    states.fallInterval = setTimeout(fall,
      out === undefined ? speeds[state.speedRun - 1] : out);
  },

  nextAround: (matrix, stopDownTrigger) => {
    clearTimeout(states.fallInterval);
    store.commit({type: appMutations.LOCK, data: true});
    store.commit({type: appMutations.MATRIX, data: matrix});
    if (typeof stopDownTrigger === 'function') {
      stopDownTrigger();
    }

    const addPoints = (store.state.points + 10) + ((store.state.speedRun - 1) * 2);

    states.dispatchPoints(addPoints);

    if (isClear(matrix)) {
      if (music.clear) {
        music.clear();
      }
      return;
    }
    if (isOver(matrix)) {
      if (music.gameover) {
        music.gameover();
      }
      states.overStart();
      return;
    }
    setTimeout(() => {
      store.commit({type: appMutations.LOCK, data: false});
      store.commit({type: appMutations.MOVE_BLOCK, data: {type: store.state.next}});
      store.commit({type: appMutations.NEXT_BLOCK});
      states.auto();
    }, 100);
  },

  overStart: () => {
    clearTimeout(states.fallInterval);
    store.commit({type: appMutations.LOCK, data: false});
    store.commit({type: appMutations.RESET, data: true});
    store.commit({type: appMutations.PAUSE, data: false});
  },

  overEnd: () => {
    store.commit({type: appMutations.MATRIX, data: blankMatrix});
    store.commit({type: appMutations.MOVE_BLOCK, data: {reset: true}});
    store.commit({type: appMutations.RESET, data: false});
    store.commit({type: appMutations.LOCK, data: false});
    store.commit({type: appMutations.CLEAR_LINES, data: 0});
  },

  pause: (isPause) => {
    store.commit({type: appMutations.PAUSE, data: isPause});
    if (isPause) {
      clearTimeout(states.fallInterval);
      return;
    }
    states.auto();
  },

  focus: (isFocus) => {
    store.commit({type: appMutations.FOCUS, data: isFocus});
    if (!isFocus) {
      clearTimeout(states.fallInterval);
      return;
    }
    const state = store.state;
    if (state.cur && !state.reset && !state.pause) {
      states.auto();
    }
  },


  clearLines: (matrix, lines) => {
    const state = store.state;
    let newMatrix = matrix;
    lines.forEach(n => {
      newMatrix = newMatrix.splice(n, 1);
      newMatrix = newMatrix.unshift(List(blankLine));
    });
    store.commit({type: appMutations.MATRIX, data: newMatrix});
    store.commit({type: appMutations.MOVE_BLOCK, data: {type: state.next}});
    store.commit({type: appMutations.NEXT_BLOCK});
    states.auto();
    store.commit({type: appMutations.LOCK, data: false});
    const clearLines = state.clearLines + lines.length;
    store.commit({type: appMutations.CLEAR_LINES, data: clearLines});

    const addPoints = store.state.points + clearPoints[lines.length - 1];
    states.dispatchPoints(addPoints);

    const speedAdd = Math.floor(clearLines / eachLines);
    let speedNow = state.speedStart + speedAdd;
    speedNow = speedNow > 6 ? 6 : speedNow;
    store.commit({type: appMutations.SPEED_RUN, data: speedNow});
  },

  dispatchPoints: (point) => {
    store.commit({type: appMutations.POINTS, data: point});
    if (point > 0 && point > store.state.max) {
      store.commit({type: appMutations.MAX, data: point});
    }
  },
};

export default states;