<template>
  <div id="app" class="app"  v-bind:style="size">
    <div v-bind:class="rectStyle">
      <decorate></decorate>
      <div class="screen">
        <div class="panel">
          <matrix></matrix>
          <div class="state">
            <Point></Point>
            <p>Start Line</p>
            <number v-bind:number="0"></number>
            <p>Level</p>
            <number v-bind:number="1" v-bind:length="1"></number>
            <p>Next</p>
            <next v-bind:data="nextType"></next>
          </div>
        </div>
      </div>
    </div>
    <keyboard v-bind:filling="filling"></keyboard>
  </div>
</template>

<script>
  import Hello from './components/Hello';
  import Decorate from '@/components/Decorate';
  import Matrix from '@/components/Matrix';
  import Point from '@/components/Point';
  import Number from '@/components/Number';
  import Next from '@/components/Next';
  import Keyboard from '@/components/Keyboard';
  import {blockShape} from '@/const';


  const blockType = Object.keys(blockShape);

  function getNextType() { // 随机获取下一个方块类型
    const len = blockType.length;
    return blockType[Math.floor(Math.random() * len)];
  }

  export default {
    name: 'app',
    data() {
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
        rectStyle: {
          rect: true,
          drop: false
        },
        nextType: getNextType()
      }
    },
    computed: {
      filling() {
        const w = this.w;
        const h = this.h;
        const ratio = h / w;
        let fill = 0;
        let scale;
        if (ratio < 1.5) {
          return fill;
        } else {
          scale = w / 640;
          fill = (h - (960 * scale)) / scale / 3;
        }
        return fill;
      },
      size() {
        const w = this.w;
        const h = this.h;
        const ratio = h / w;
        let filling = 0;
        let scale;
        let css = {};
        if (ratio < 1.5) {
          scale = h / 960;
        } else {
          scale = w / 640;
          filling = (h - (960 * scale)) / scale / 3;
          css = {
            paddingTop: Math.floor(filling) + 42,
            paddingBottom: Math.floor(filling),
            marginTop: Math.floor(-480 - (filling * 1.5)),
          };
        }
        css.transform = `scale(${scale})`;
        return css;
      }
    },
    components: {
      Decorate,
      Matrix,
      Point,
      Number,
      Next,
      Keyboard
    }
  }
</script>

<style lang="less">
  body {
    background: #009688;
    padding: 0;
    margin:0;
    font: 20px/1 "HanHei SC","PingHei","PingFang SC","STHeitiSC-Light","Helvetica Neue","Helvetica","Arial",sans-serif;
    overflow: hidden;
    cursor: default;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings: 'liga', 'kern';
    direction: ltr;
    text-align: left;
  }

  :global {

    .r {
      float: right;
    }
    .l {
      float: left;
    }

    .clear {
      clear: both;
    }

    b {
      display: block;
      width: 20px;
      height: 20px;
      padding: 2px;
      border: 2px solid #879372;
      margin: 0 2px 2px 0;
      float: left;
      &:after{
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        background: #879372;
        overflow: hidden;
      }
      &.c
      {
        border-color:#000;
        &:after{
          background:#000;
        }
      }
      &.d{
        border-color:#560000;
        &:after{
          background:#560000;
        }
      }
    }

    .bg {
      background: url('//img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png') no-repeat;
      overflow: hidden;
    }

  }

  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .app {
    width: 640px;
    padding-top: 42px;
    box-shadow: 0 0 10px #fff inset;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -480px 0 0 -320px;
    background: #efcc19;
  }

  .rect {
    width: 480px;
    padding: 45px 0 35px;
    border: #000 solid;
    border-width: 0 10px 10px;
    margin: 0 auto;
    position: relative;
    &.drop {
      -webkit-transform: translateY(5px);
      transform: translateY(5px);
    }
  }

  .screen{
    width: 390px;
    height: 478px;
    border: solid 5px;
    border-color: #987f0f #fae36c #fae36c #987f0f;
    margin: 0 auto;
    position: relative;
    .panel{
      width: 380px;
      height: 468px;
      margin: 0 auto;
      background: #9ead86;
      padding: 8px;
      border: 2px solid #494536;
    }
  }

  .state {
    width: 108px;
    position: absolute;
    top: 0;
    right: 15px;
    p {
      line-height: 47px;
      height: 57px;
      padding: 10px 0 0;
      white-space: nowrap;
      clear: both;
    }
    .bottom {
      position: absolute;
      width: 114px;
      top: 426px;
      left: 0;
    }
  }
</style>
