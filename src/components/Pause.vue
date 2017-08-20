<template>
  <div class="bg pause" :class="{c: showPause}"></div>
</template>

<script>
  let timeout = null;

  export default {
    name: 'pause',
    data() {
      return {
        showPause: false,
      }
    },
    props: {
      data: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    watch: {
      '$props':{
        handler: function ({data}, props) {
          this.setShake(data);
        },
        deep: true
      }
    },
    methods: {
      setShake(bool) {
        if (bool && !timeout) {
          timeout = setInterval(() => {
            this.showPause = !this.showPause;
          }, 250);
        }
        if (!bool && timeout) {
          clearInterval(timeout);
          this.showPause = false;
          timeout = null;
        }
      },
    },
    mounted: function() {
      this.setShake(this.data);
    },
  }
</script>

<style lang="less">
  .pause {
    width: 20px;
    height: 18px;
    background-position: -100px -75px;
    position: absolute;
    top: 3px;
    left: 18px;
    &.c {
      background-position: -75px -75px;
    }
  }
</style>