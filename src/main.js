// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import {subscribeRecord} from './utils/storage';
import {keyDown, keyUp} from './controllers/keyboard';

// subscribeRecord(store);

document.addEventListener('keydown', keyDown, true);
document.addEventListener('keyup', keyUp, true);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
});
