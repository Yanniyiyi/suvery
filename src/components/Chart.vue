<template>
  <div>
    <canvas :id="id" width="600" height="400"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "Chart",
  components: {},
  props: {
    id: String,
    type: String,
    options: Object,
    chartData: Object
  },
  data() {
    return {
      chart: null
    };
  },
  methods: {
    drawChart() {
      let ctx = document.getElementById(this.$props.id);
      this.chart = new Chart(ctx, {
        type: this.$props.type,
        data: this.$props.chartData,
        options: this.$props.options
      });
    }
  },
  watch: {
    chartData() {
      this.chart.data = this.$props.chartData;
      this.chart.options = this.$props.options;
      this.chart.update();
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>

<style lang="scss">
</style>
