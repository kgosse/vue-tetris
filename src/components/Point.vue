<template>
  <div>
    <p>{{label}}</p>
    <number v-bind:number="0"></number>
  </div>
</template>

<script>
  import Number from '@/components/Number';
  import { mapState } from 'vuex';

  export default {
    name: 'point',
    data() {
      return {
        label: 'MAX',
        number: 0,
      }
    },
    computed: {
      ...mapState({
        cur: 'cur',
        max: 'max',
        point: 'points'
      }),
    },
    components: {
      Number
    }
  }
</script>

<style></style>