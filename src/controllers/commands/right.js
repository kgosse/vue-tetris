import { want } from '@/utils';
import event from '@/utils/event';
import * as appMutations from '@/store/mutation-types';
import * as keyboardMutations from '@/store/modules/keyboard/mutation-types';
import states from '../states';
import { speeds, delays } from '@/consts';
import { music } from '@/utils/music';


const down = (store) => {
  store.commit({type: keyboardMutations.KEY_RIGHT, data: true});
  event.down({
    key: 'right',
    begin: 200,
    interval: 100,
    callback: () => {
      const state = store.state;
      if (state.lock) {
        return;
      }
      if (music.move) {
        music.move();
      }
      const cur = state.cur;
      if (cur !== null) {
        if (state.pause) {
          states.pause(false);
          return;
        }
        const next = cur.right();
        const delay = delays[state.speedRun - 1];
        let timeStamp;
        if (want(next, state.matrix)) {
          next.timeStamp += parseInt(delay, 10);
          store.commit({type: appMutations.MOVE_BLOCK, data: next});
          timeStamp = next.timeStamp;
        } else {
          cur.timeStamp += parseInt(parseInt(delay, 10) / 1.5, 10); // 真实移动delay多一点，碰壁delay少一点
          store.commit({type: appMutations.MOVE_BLOCK, data: cur});
          timeStamp = cur.timeStamp;
        }
        const remain = speeds[state.speedRun - 1] - (Date.now() - timeStamp);
        states.auto(remain);
      } else {
        let speed = state.speedStart;
        speed = speed + 1 > 6 ? 1 : speed + 1;
        store.commit({type: appMutations.SPEED_START, data: speed});
      }
    },
  });
};

const up = (store) => {
  store.commit({type: keyboardMutations.KEY_RIGHT, data: false});
  event.up({
    key: 'right',
  });
};

export default {
  down,
  up,
};
