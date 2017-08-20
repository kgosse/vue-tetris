import event from '@/utils/event';
import * as keyboardMutations from '@/store/modules/keyboard/mutation-types';
import states from '../states';


const down = (store) => {
  store.commit({type: keyboardMutations.KEY_RESET, data: true});
  if (store.state.lock) {
    return;
  }
  if (store.state.cur !== null) {
    event.down({
      key: 'r',
      once: true,
      callback: () => {
        states.overStart();
      },
    });
  } else {
    event.down({
      key: 'r',
      once: true,
      callback: () => {
        if (store.state.lock) {
          return;
        }
        states.start();
      },
    });
  }
};

const up = (store) => {
  store.commit({type: keyboardMutations.KEY_RESET, data: false});
  event.up({
    key: 'r',
  });
};

export default {
  down,
  up,
};
