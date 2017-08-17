<template>
  <div>
    <p>{{label}}</p>
    <number v-bind:number="0"></number>
  </div>
</template>

<script>
  import Number from '@/components/Number';

  export default {
    name: 'point',
    data() {
      return {
        label: 'MAX',
        number: 0,
      }
    },
    components: {
      Number
    }
  }
</script>

<style></style>