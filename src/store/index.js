import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';
import {blankMatrix} from '@/consts/matrix';
import {getNextType} from '@/utils/matrix';
import {isFocus} from '@/utils';
import keyboard from './modules/keyboard';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    pause: false,
    lock: false,
    reset: false,
    music: true,
    matrix: blankMatrix,
    next: getNextType(),
    startLines: 0,
    max: 0,
    points: 0,
    speedStart: 1,
    speedRun: 1,
    clearLines: 0,
    drop: false,
    focus: isFocus(),
    cur: null
  },
  mutations,
  modules: {
    keyboard
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})