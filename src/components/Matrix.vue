<template>
  <div class="matrix">
    <p v-for="(p, k1) in getMatrix">
      <b v-for="(e, k2) in p.toArray()" v-bind:class="{c: e === 1, d: e === 2}">
      </b>
    </p>
  </div>
</template>

<script>
  import { List } from 'immutable';
  import { mapState } from 'vuex';
  import {isClear} from '@/utils/matrix';
  import states from '@/controllers/states';

  const t = setTimeout;

  export default {
    name: 'matrix',
    data() {
      return {
        clearLines: false,
        animateColor: 2,
        isOver: false,
        overState: null,
      }
    },
    props: {
      matrix: {
        type: Object,
        required: true
      },
      cur: {
        type: Object,
      },
      reset: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      getMatrix() {
        let matrix;
        if (this.isOver) {
          matrix = this.overState;
        } else {
          matrix = this.getResult();
        }
        return matrix.toArray();
      }
    },
    watch: {
      '$props':{
        handler: function (nextProps, props) {
          const clears = isClear(nextProps.matrix);
          const overs = nextProps.reset;
          this.clearLines = clears;
          this.isOver = overs;
          if (clears && !this.clearLines) {
            this.clearAnimate(clears);
          }
          if (!clears && overs && !this.isOver) {
            this.over(nextProps);
          }
        },
        deep: true
      }
    },
    methods: {

      clearAnimate() {
        const anima = (callback) => {
          t(() => {
            this.animateColor = 0;
            t(() => {
              this.animateColor = 2;
              if (typeof callback === 'function') {
                callback();
              }
            }, 100);
          }, 100);
        };
        anima(() => {
          anima(() => {
            anima(() => {
              t(() => {
                states.clearLines(this.matrix, this.clearLines);
              }, 100);
            });
          });
        });
      },

      getResult(props = this.$props) {
        const cur = props.cur;
        const shape = cur && cur.shape;
        const xy = cur && cur.xy;

        let matrix = props.matrix;
        const clearLines = this.clearLines;
        if (clearLines) {
          const animateColor = this.animateColor;
          clearLines.forEach((index) => {
            matrix = matrix.set(index, List([
              animateColor,
              animateColor,
              animateColor,
              animateColor,
              animateColor,
              animateColor,
              animateColor,
              animateColor,
              animateColor,
              animateColor,
            ]));
          });
        } else if (shape) {
          shape.forEach((m, k1) => (
            m.forEach((n, k2) => {
              if (n && xy.get(0) + k1 >= 0) { // 竖坐标可以为负
                let line = matrix.get(xy.get(0) + k1);
                let color;
                if (line.get(xy.get(1) + k2) === 1 && !clearLines) { // 矩阵与方块重合
                  color = 2;
                } else {
                  color = 1;
                }
                line = line.set(xy.get(1) + k2, color);
                matrix = matrix.set(xy.get(0) + k1, line);
              }
            })
          ));
        }
        return matrix;
      },

      over(nextProps) {
        let overState = this.getResult(nextProps);
        this.overState = overState;

        const exLine = (index) => {
          if (index <= 19) {
            overState = overState.set(19 - index, List(fillLine));
          } else if (index >= 20 && index <= 39) {
            overState = overState.set(index - 20, List(blankLine));
          } else {
            states.overEnd();
            return;
          }
          this.setState({
            overState,
          });
        };

        for (let i = 0; i <= 40; i++) {
          t(exLine.bind(null, i), 40 * (i + 1));
        }
      },
    }
  };
</script>

<style lang="less">
  .matrix{
    border:2px solid #000;
    padding:3px 1px 1px 3px;
    width:228px;
    p{
      width:220px;
      height:22px;
    }
  }
</style>