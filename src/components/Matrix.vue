<template>
  <div class="matrix">
    <p v-for="(p, k1) in matrix.toArray()">
      <b v-for="(e, k2) in p.toArray()" v-bind:class="{b: e === 1, c: e === 2}">
      </b>
    </p>
  </div>
</template>

<script>
  import { List } from 'immutable';

  const blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const blankMatrix = (() => {
    const matrix = [];
    for (let i = 0; i < 20; i++) {
      matrix.push(List(blankLine));
    }
    return List(matrix);
  })();

  export default {
    name: 'matrix',
    data() {
      return {
        matrix: blankMatrix
      }
    },
    computed: {
      getResult() {
        const cur = props.cur;
        const shape = cur && cur.shape;
        const xy = cur && cur.xy;

        let matrix = this.matrix;
        const clearLines = this.state.clearLines;
        if (clearLines) {
          const animateColor = this.state.animateColor;
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
      }
    },
    components: {
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