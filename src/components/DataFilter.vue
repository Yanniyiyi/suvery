<template>
  <select v-model="selectedOption">
    <option v-for="option in options" :key="option" :value="option">{{option}}</option>
  </select>
</template>

<script>
export default {
  name: "DataFilter",
  components: {},
  props: {
    options: Array,
    defaultOption: String
  },
  data() {
    return {
      selectedOption: this.$props.defaultOption
    };
  },
  methods: {},
  watch: {
    selectedOption() {
      this.$emit("select", this.selectedOption);
    }
  }
};
</script>

<style lang="scss">
</style>
