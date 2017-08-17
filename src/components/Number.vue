<template>
  <div class="number">
    <span v-for="(e, k) in getNumber" class="bg" v-bind:class="getClass(e)"></span>
  </div>
</template>

<script>
  export default {
    name: 'number',
    props: {
      number: {
        type: Number,
      },
      length: {
        type: Number,
        default: 6
      }
    },
    data() {
      return {
        time_count: false,
        time: new Date()
      }
    },
    computed: {
      getNumber() {
        const num = `${this.number}`.split('');
        for (let i = 0, len = this.length - num.length; i < len; i++) {
          num.unshift('n');
        }
        return num;
      }
    },
    methods: {
      getClass(e) {
        return `s_${e}`;
      }
    }
  }
</script>

<style lang="less">
  .number{
    height:24px;
    font-size:14px;
    float:right;
    span{
      float:left;
      width:14px;
      height:24px;
    }
    .s_0{background-position:-75px -25px;}
    .s_1{background-position:-89px -25px;}
    .s_2{background-position:-103px -25px;}
    .s_3{background-position:-117px -25px;}
    .s_4{background-position:-131px -25px;}
    .s_5{background-position:-145px -25px;}
    .s_6{background-position:-159px -25px;}
    .s_7{background-position:-173px -25px;}
    .s_8{background-position:-187px -25px;}
    .s_9{background-position:-201px -25px;}
    .s_n{background-position:-215px -25px;}
    .s_d{background-position:-243px -25px;}
    .s_d_c{background-position:-229px -25px;}
  }
</style>