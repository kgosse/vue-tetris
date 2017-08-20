import { want } from '@/utils';
import event from '@/utils/event';
import * as appMutations from '@/store/mutation-types';
import * as keyboardMutations from '@/store/modules/keyboard/mutation-types';
import states from '../states';
import { music } from '@/utils/music';


const down = (store) => {
  store.commit({type: keyboardMutations.KEY_ROTATE, data: true});
  if (store.state.cur !== null) {
    event.down({
      key: 'rotate',
      once: true,
      callback: () => {
        const state = store.state;
        if (state.lock) {
          return;
        }
        if (state.pause) {
          states.pause(false);
        }
        const cur = state.cur;
        if (cur === null) {
          return;
        }
        if (music.rotate) {
          music.rotate();
        }
        const next = cur.rotate();
        if (want(next, state.matrix)) {
          store.commit({type: appMutations.MOVE_BLOCK, data: next});
        }
      },
    });
  } else {
    event.down({
      key: 'rotate',
      begin: 200,
      interval: 100,
      callback: () => {
        if (store.state.lock) {
          return;
        }
        if (music.move) {
          music.move();
        }
        const state = store.state;
        const cur = state.cur;
        if (cur) {
          return;
        }
        let startLines = state.startLines;
        startLines = startLines + 1 > 10 ? 0 : startLines + 1;
        store.commit({type: appMutations.START_LINES, data: startLines});
      },
    });
  }
};

const up = (store) => {
  store.commit({type: keyboardMutations.KEY_ROTATE, data: false});
  event.up({
    key: 'rotate',
  });
};

export default {
  down,
  up,
};
