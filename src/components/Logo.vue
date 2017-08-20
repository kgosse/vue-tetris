<template>
  <div v-if="!cur" class="logo"  v-bind:style="{display: display}">
    <div class="bg dragon" v-bind:class="getStyle"></div>
    <p>Tetris</p>
  </div>
</template>

<script>
  let timeout;

  export default {
    name: 'logo',
    data() {
      return {
        style: 'r1',
        display: 'none',
      }
    },
    beforeMount: function() {
      this.animate(this.$props);
    },
    computed: {
      getStyle() {
        return {
          [this.style]: true
        }
      }
    },
    props: {
      cur: {
        type: Boolean
      },
      reset: {
        type: Boolean,
        required: true
      }
    },
    watch: {
      '$props':{
        handler: function (nextProps, props) {
          if (
          (
            [props.cur, nextProps.cur].indexOf(false) !== -1 &&
            (props.cur !== nextProps.cur)
          ) ||
          (props.reset !== nextProps.reset)
          ) {
            this.animate(nextProps);
          }
        },
        deep: true
      }
    },
    methods: {
      animate({ cur, reset }) {
        clearTimeout(timeout);
        this.style = 'r1';
        this.display = 'none';
        if (cur || reset) {
          this.display = 'none';
          return;
        }

        let m = 'r';
        let count = 0;

        const set = (func, delay) => {
          if (!func) {
            return;
          }
          timeout = setTimeout(func, delay);
        };

        const show = (func) => {
          set(() => {
            this.display = 'block';
            if (func) {
              func();
            }
          }, 150);
        };

        const hide = (func) => {
          set(() => {
            this.display = 'none';
            if (func) {
              func();
            }
          }, 150);
        };

        const eyes = (func, delay1, delay2) => {
          set(() => {
            this.style = m + 2;
            set(() => {
              this.style = m + 1;
              if (func) {
                func();
              }
            }, delay2);
          }, delay1);
        };

        const run = (func) => {
          set(() => {
            this.style = m + 4;
            set(() => {
              this.style = m + 3;
              count++;
              if (count === 10 || count === 20 || count === 30) {
                m = m === 'r' ? 'l' : 'r';
              }
              if (count < 40) {
                run(func);
                return;
              }
              this.style = m + 1;
              if (func) {
                set(func, 4000);
              }
            }, 100);
          }, 100);
        };

        const dra = () => {
          count = 0;
          eyes(() => {
            eyes(() => {
              eyes(() => {
                this.style = m + 2;
                run(dra);
              }, 150, 150);
            }, 150, 150);
          }, 1000, 1500);
        };

        show(() => {
          hide(() => {
            show(() => {
              hide(() => {
                show(() => {
                  dra();
                });
              });
            });
          });
        });
      }
    }
  }
</script>

<style lang="less">
  .logo {
    width: 224px;
    height: 200px;
    position: absolute;
    top: 100px;
    left: 12px;
    text-align: center;
    overflow: hidden;
    p {
      position: absolute;
      width: 100%;
      line-height: 1.4;
      top: 100px;
      left: 0;
      font-family: initial;
      letter-spacing: 6px;
      text-shadow: 1px 1px 1px rgba(255, 255, 255,.35);
    }
    .dragon {
      width: 80px;
      height: 86px;
      margin: 0 auto;
      background-position: 0 -100px;
      &.r1,&.l1 {
        background-position: 0 -100px;
      }
      &.r2,&.l2 {
        background-position: -100px -100px;
      }
      &.r3,&.l3 {
        background-position: -200px -100px;
      }
      &.r4,&.l4 {
        background-position: -300px -100px;
      }
      &.l1,&.l2,&.l3,&.l4{
        transform: scale(-1, 1);
        -webkit-transform: scale(-1, 1);
        -ms-transform: scale(-1, 1);
        -moz-transform: scale(-1, 1);
        -o-transform: scale(-1, 1);
      }
    }
  }
</style>