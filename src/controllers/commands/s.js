import event from '@/utils/event';
import * as appMutations from '@/store/mutation-types';
import * as keyboardMutations from '@/store/modules/keyboard/mutation-types';


const down = (store) => {
  store.commit({type: keyboardMutations.KEY_MUSIC, data: true});
  if (store.state.lock) {
    return;
  }
  event.down({
    key: 's',
    once: true,
    callback: () => {
      if (store.state.lock) {
        return;
      }
      store.commit({type: appMutations.MUSIC, data: !store.state.music});
    },
  });
};

const up = (store) => {
  store.commit({type: keyboardMutations.KEY_MUSIC, data: false});
  event.up({
    key: 's',
  });
};


export default {
  down,
  up,
};
