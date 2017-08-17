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
    ></btn>
    <btn
      color="blue"
      size="s1"
      v-bind:top="180"
      v-bind:left="374"
      label="Down"
      arrow="translate(0,-71px) rotate(180deg)"
      v-bind:active="false"
    ></btn>
    <btn
      color="blue"
      size="s1"
      v-bind:top="90"
      v-bind:left="284"
      label="Left"
      arrow="translate(60px, -12px) rotate(270deg)"
      v-bind:active="false"
    ></btn>
    <btn
      color="blue"
      size="s1"
      v-bind:top="90"
      v-bind:left="464"
      label="Right"
      arrow="translate(-60px, -12px) rotate(90deg)"
      v-bind:active="false"
    ></btn>
    <btn
      color="blue"
      size="s0"
      v-bind:top="100"
      v-bind:left="52"
      label="Drop (SPACE)"
      v-bind:active="false"
    ></btn>
    <btn
      color="red"
      size="s2"
      v-bind:top="0"
      v-bind:left="196"
      label="Reset(R)"
      v-bind:active="false"
    ></btn>
    <btn
      color="green"
      size="s2"
      v-bind:top="0"
      v-bind:left="106"
      label="Sound(S)"
      v-bind:active="false"
    ></btn>
    <btn
      color="green"
      size="s2"
      v-bind:top="0"
      v-bind:left="16"
      label="Pause(P)"
      v-bind:active="false"
    ></btn>
  </div>
</template>

<script>
  import Btn from '@/components/ui/Btn';
  export default {
    name: 'keyboard',
    props: {
      filling: {
        type: Number,
        required: true
      }
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