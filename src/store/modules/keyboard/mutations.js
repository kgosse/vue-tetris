import * as types from './mutation-types';

const mutations = {
  [types.KEY_DROP]: (state, payload) => {
    state.drop = payload.data;
  },
  [types.KEY_DOWN]: (state, payload) => {
    state.down = payload.data;
  },
  [types.KEY_LEFT]: (state, payload) => {
    state.left = payload.data;
  },
  [types.KEY_RIGHT]: (state, payload) => {
    state.right = payload.data;
  },
  [types.KEY_ROTATE]: (state, payload) => {
    state.rotate = payload.data;
  },
  [types.KEY_RESET]: (state, payload) => {
    state.reset = payload.data;
  },
  [types.KEY_MUSIC]: (state, payload) => {
    state.music = payload.data;
  },
  [types.KEY_PAUSE]: (state, payload) => {
    state.pause = payload.data;
  },
};

export default mutations;