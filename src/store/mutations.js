import * as types from './mutation-types';
import { hasWebAudioAPI } from '@/utils/music';
import {maxPoint} from '@/consts';
import Block from '@/models/Block';
import {getNextType} from '@/utils/matrix';

const mutations = {
  [types.LOCK]: (state, payload) => {
    state.lock = payload.data;
  },
  [types.RESET]: (state, payload) => {
    state.reset = payload.data;
  },
  [types.PAUSE]: (state, payload) => {
    state.pause = payload.data;
  },
  [types.MUSIC]: (state, payload) => {
    state.music = hasWebAudioAPI.data ? payload.data : false;
  },
  [types.MATRIX]: (state, payload) => {
    state.matrix = payload.data;
  },
  [types.NEXT_BLOCK]: (state, payload) => {
    const data = payload.data ? payload.data : getNextType();
    state.next = data;
  },
  [types.START_LINES]: (state, payload) => {
    state.startLines = payload.data;
  },
  [types.MAX]: (state, payload) => {
    state.max = payload.data > maxPoint ? maxPoint : payload.data;
  },
  [types.POINTS]: (state, payload) => {
    state.points = payload.data > maxPoint ? maxPoint : payload.data;
  },
  [types.SPEED_START]: (state, payload) => {
    state.speedStart = payload.data;
  },
  [types.SPEED_RUN]: (state, payload) => {
    state.speedRun = payload.data;
  },
  [types.CLEAR_LINES]: (state, payload) => {
    state.clearLines = payload.data;
  },
  [types.DROP]: (state, payload) => {
    state.drop = payload.data;
  },
  [types.FOCUS]: (state, payload) => {
    state.focus = payload.data;
  },
  [types.MOVE_BLOCK]: (state, payload) => {
    const data = payload.data.reset === true ? null : new Block(payload.data);
    state.cur = data;
  },
};

export default mutations;