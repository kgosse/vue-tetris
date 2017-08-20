import event from '@/utils/event';
import * as keyboardMutations from '@/store/modules/keyboard/mutation-types';
import states from '../states';

const down = (store) => {
  store.commit({type: keyboardMutations.KEY_PAUSE, data: true});
  event.down({
    key: 'p',
    once: true,
    callback: () => {
      const state = store.state;
      if (state.lock) {
        return;
      }
      const cur = state.cur;
      const isPause = state.pause;
      if (cur !== null) {
        states.pause(!isPause);
      } else {
        states.start();
      }
    },
  });
};

const up = (store) => {
  store.commit({type: keyboardMutations.KEY_PAUSE, data: false});
  event.up({
    key: 'p',
  });
};


export default {
  down,
  up,
};
