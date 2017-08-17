<template>
  <div class="decorate">
    <div class="topBorder">
      <span class="l mr" v-bind:style="{width: '40px'}"></span>
      <span class="l mr"></span>
      <span class="l mr"></span>
      <span class="l mr"></span>
      <span class="l mr"></span>

      <span class="r ml" v-bind:style="{width: '40px'}"></span>
      <span class="r ml"></span>
      <span class="r ml"></span>
      <span class="r ml"></span>
      <span class="r ml"></span>
    </div>
    <h1>Tetris</h1>
    <div class="view">
      <b class="c"></b>
      <div class="clear"></div>
      <b class="c"></b>
      <b class="c"></b>
      <div class="clear"></div>
      <em></em>
      <b class="c"></b>
      <p></p>
      <em></em>
      <b class="c"></b>
      <div class="clear"></div>
      <b class="c"></b>
      <b class="c"></b>
      <div class="clear"></div>
      <em></em>
      <b class="c"></b>
      <p></p>
      <b class="c"></b>
      <b class="c"></b>
      <b class="c"></b>
      <b class="c"></b>
      <p></p>
      <b class="c"></b>
      <div class="clear"></div>
      <b class="c"></b>
      <b class="c"></b>
      <div class="clear"></div>
      <b class="c"></b>
      <p></p>
      <b class="c"></b>
      <b class="c"></b>
      <div class="clear"></div>
      <b class="c"></b>
      <div class="clear"></div>
      <b class="c"></b>
      <p></p>
      <em></em>
      <b class="c"></b>
      <div class="clear"></div>
      <em></em>
      <b class="c"></b>
      <div class="clear"></div>
      <em></em>
      <b class="c"></b>
      <div class="clear"></div>
      <em></em>
      <b class="c"></b>
    </div>

    <div class="view l">
      <em></em>
      <b class="c"></b>
      <div class="clear"></div>
      <b class="c"></b>
      <b class="c"></b>
      <div class="clear"></div>
      <b class="c"></b>
      <em></em>
      <p></p>
      <b class="c"></b>
      <em></em>
      <div class="clear"></div>
      <b class="c"></b>
      <b class="c"></b>
      <div class="clear"></div>
      <b class="c"></b>
      <em></em>
      <p></p>
      <b class="c"></b>
      <b class="c"></b>
      <b class="c"></b>
      <b class="c"></b>
      <p></p>
      <em></em>
      <b class="c"></b>
      <div class="clear"></div>
      <b class="c"></b>
      <b class="c"></b>
      <div class="clear"></div>
      <em></em>
      <b class="c"></b>
      <p></p>
      <b class="c"></b>
      <b class="c"></b>
      <div class="clear"></div>
      <em></em>
      <b class="c"></b>
      <div class="clear"></div>
      <em></em>
      <b class="c"></b>
      <p></p>
      <b class="c"></b>
      <em></em>
      <div class="clear"></div>
      <b class="c"></b>
      <em></em>
      <div class="clear"></div>
      <b class="c"></b>
      <em></em>
      <div class="clear"></div>
      <b class="c"></b>
      <em></em>
    </div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: 'decorate',
    data() {
      return {
      }
    },
    computed: {
    },
    components: {
    }
  }
</script>

<style lang="less">
  .decorate {
    h1 {
      position: absolute;
      width: 100%;
      text-align: center;
      font-weight: normal;
      top: -12px;
      left: 0;
      margin: 0;
      padding: 0;
      font-size: 30px;
    }
    .topBorder {
      position: absolute;
      height: 10px;
      width: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      overflow: hidden;
      span {
        display: block;
        width: 10px;
        height: 10px;
        overflow: hidden;
        background: #000;
        &.mr {
          margin-right: 10px;
        }
        &.ml{
          margin-left: 10px;
        }
      }
    }
    .view{
      position: absolute;
      right: -70px;
      top: 20px;
      width: 44px;
      em {
        display: block;
        width: 22px;
        height: 22px;
        overflow: hidden;
        float: left;
      }
      p {
        height: 22px;
        clear: both;
      }
      &.l{
        right: auto;
        left: -70px;
      }
    }
  }
</style>
