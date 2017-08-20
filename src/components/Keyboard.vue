<template>
  <div class="keyboard" v-bind:style="{marginTop: 20 + filling + 'px'}">
    <btn
      color="blue"
      size="s1"
      v-bind:top="0"
      v-bind:left="374"
      label="Rotation"
      arrow="translate(0, 63px)"
      v-bind:position="true"
      v-bind:active="false"
      ref="dom_up"
    ></btn>
    <btn
      color="blue"
      size="s1"
      v-bind:top="180"
      v-bind:left="374"
      label="Down"
      arrow="translate(0,-71px) rotate(180deg)"
      v-bind:active="false"
      ref="dom_down"
    ></btn>
    <btn
      color="blue"
      size="s1"
      v-bind:top="90"
      v-bind:left="284"
      label="Left"
      arrow="translate(60px, -12px) rotate(270deg)"
      v-bind:active="false"
      ref="dom_left"
    ></btn>
    <btn
      color="blue"
      size="s1"
      v-bind:top="90"
      v-bind:left="464"
      label="Right"
      arrow="translate(-60px, -12px) rotate(90deg)"
      v-bind:active="false"
      ref="dom_right"
    ></btn>
    <btn
      color="blue"
      size="s0"
      v-bind:top="100"
      v-bind:left="52"
      label="Drop (SPACE)"
      v-bind:active="false"
      ref="dom_space"
    ></btn>
    <btn
      color="red"
      size="s2"
      v-bind:top="0"
      v-bind:left="196"
      label="Reset(R)"
      v-bind:active="false"
      ref="dom_r"
    ></btn>
    <btn
      color="green"
      size="s2"
      v-bind:top="0"
      v-bind:left="106"
      label="Sound(S)"
      v-bind:active="false"
      ref="dom_s"
    ></btn>
    <btn
      color="green"
      size="s2"
      v-bind:top="0"
      v-bind:left="16"
      label="Pause(P)"
      v-bind:active="false"
      ref="dom_p"
    ></btn>
  </div>
</template>

<script>
  import Btn from '@/components/ui/Btn';
  import { mapState } from 'vuex';
  import commands from '@/controllers/commands';
  import store from '@/store';

  export default {
    name: 'keyboard',
    mounted: function () {
      const touchEventCatch = {};

      const mouseDownEventCatch = {};
      document.addEventListener('touchstart', (e) => {
        if (e.preventDefault) {
          e.preventDefault();
        }
      }, true);

      document.addEventListener('mousedown', (e) => {
        if (e.preventDefault) {
          e.preventDefault();
        }
      }, true);

      Object.keys(commands).forEach((key) => {
        this.$refs[`dom_${key}`].$el.addEventListener('mousedown', () => {
          if (touchEventCatch[key] === true) {
            return;
          }
          commands[key].down(store);
          mouseDownEventCatch[key] = true;
        }, true);
        this.$refs[`dom_${key}`].$el.addEventListener('mouseup', () => {
          if (touchEventCatch[key] === true) {
            touchEventCatch[key] = false;
            return;
          }
          commands[key].up(store);
          mouseDownEventCatch[key] = false;
        }, true);
        this.$refs[`dom_${key}`].$el.addEventListener('mouseout', () => {
          if (mouseDownEventCatch[key] === true) {
            commands[key].up(store);
          }
        }, true);
        this.$refs[`dom_${key}`].$el.addEventListener('touchstart', () => {
          touchEventCatch[key] = true;
          commands[key].down(store);
        }, true);
        this.$refs[`dom_${key}`].$el.addEventListener('touchend', () => {
          commands[key].up(store);
        }, true);
      });
    },
    props: {
      filling: {
        type: Number,
        required: true
      }
    },
    computed: {
      ...mapState([
        'matrix',
      ]),
    },
    components: {
      Btn
    }
  }
</script>

<style lang="less">
  .keyboard{
    width: 580px;
    height: 330px;
    margin: 20px auto 0;
    position:relative;
  }
</style>