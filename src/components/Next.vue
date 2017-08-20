<template>
  <div class="next">
    <div v-for="(arr, k1) in build()">
      <b v-for="(e, k2) in arr" v-bind:class="{c: !!e}"></b>
    </div>
  </div>
</template>

<script>
  import {blockShape} from '@/consts/matrix';

  const xy = { // 方块在下一个中的坐标
    I: [1, 0],
    L: [0, 0],
    J: [0, 0],
    Z: [0, 0],
    S: [0, 0],
    O: [0, 1],
    T: [0, 0],
  };

  const empty = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  export default {
    name: 'next',
    props: {
      data: {
        type: String
      }
    },
    data() {
      return {
        block: empty
      };
    },
    methods: {
      build(type = this.data) {
        console.log(type);
        const shape = blockShape[type];
        const block = empty.map(e => ([...e]));
        shape.forEach((m, k1) => {
          m.forEach((n, k2) => {
            if (n) {
              block[k1 + xy[type][0]][k2 + xy[type][1]] = 1;
            }
          });
        });
        return block;
      }
    }
  }
</script>

<style lang="less">
  .next{
    div{
      height: 22px;
      width: 88px;
      float: right;
    }
  }
</style>