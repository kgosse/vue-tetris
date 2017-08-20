<template>
  <div>
    <p>{{label}}</p>
    <number :number="number"></number>
  </div>
</template>

<script>
  import Number from '@/components/Number';
  import {i18n, lan} from '@/utils/i18n/index';

  const DF = i18n.point[lan];
  const ZDF = i18n.highestScore[lan];
  const SLDF = i18n.lastRound[lan];

  let timeout;

  export default {
    name: 'point',
    beforeMount: function() {
      this.onChange(this.$props);
    },
    data() {
      return {
        label: '',
        number: 0,
      }
    },
    props: {
      cur: {
        type: Boolean,
      },
      max: {
        validator: function (value) {
          return value >= 0
        },
        required: true
      },
      score: {
        validator: function (value) {
          return value >= 0
        },
        required: true
      }
    },
    watch: {
      '$props':{
        handler: function (nextProps, props) {
          this.onChange(nextProps);
        },
        deep: true
      }
    },
    components: {
      Number
    },
    methods: {
      onChange({ cur, score, max }) {
        clearInterval(timeout);
        if (cur) {
          this.label = score >= max ? ZDF : DF;
          this.number = score;
        } else {
          const toggle = () => {
            this.label = SLDF;
            this.number = score;
            timeout = setTimeout(() => {
              this.label = ZDF;
              this.number = max;
              timeout = setTimeout(toggle, 3000);
            }, 3000);
          };

          if (score !== 0) {
            toggle();
          } else {
            this.label = ZDF;
            this.number = max;
          }
        }
      },
    },
  }
</script>

<style></style>