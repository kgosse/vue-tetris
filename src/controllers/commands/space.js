import { want } from '@/utils';
import event from '@/utils/event';
import * as appMutations from '@/store/mutation-types';
import * as keyboardMutations from '@/store/modules/keyboard/mutation-types';
import states from '../states';
import { music } from '@/utils/music';


const down = (store) => {
  store.commit({type: keyboardMutations.KEY_DROP, data: true});
  event.down({
    key: 'space',
    once: true,
    callback: () => {
      console.log('space');
      const state = store.state;
      if (state.lock) {
        return;
      }
      console.log('space2');
      const cur = state.cur;
      console.log('space2', cur);
      if (cur !== null) { // 置底
        if (state.pause) {
          states.pause(false);
          return;
        }
        if (music.fall) {
          music.fall();
        }
        let index = 0;
        let bottom = cur.fall(index);
        while (want(bottom, state.matrix)) {
          bottom = cur.fall(index);
          index++;
        }
        let matrix = state.matrix;
        bottom = cur.fall(index - 2);
        store.commit({type: appMutations.MOVE_BLOCK, data: bottom});
        const shape = bottom.shape;
        const xy = bottom.xy;
        shape.forEach((m, k1) => (
          m.forEach((n, k2) => {
            if (n && xy[0] + k1 >= 0) { // 竖坐标可以为负
              let line = matrix.get(xy[0] + k1);
              line = line.set(xy[1] + k2, 1);
              matrix = matrix.set(xy[0] + k1, line);
            }
          })
        ));
        store.commit({type: appMutations.DROP, data: true});
        setTimeout(() => {
          store.commit({type: appMutations.DROP, data: false});
        }, 100);
        states.nextAround(matrix);
      } else {
        states.start();
      }
    },
  });
};

const up = (store) => {
  store.commit({type: keyboardMutations.KEY_DROP, data: false});
  event.up({
    key: 'space',
  });
};

export default {
  down,
  up,
};
