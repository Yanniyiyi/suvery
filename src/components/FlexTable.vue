<template>
  <div class="flex-table">
    <div class="flex-table-header">
      <div class="flex-table-row">
        <div
          class="flex-table-row--data"
          v-for="(column, index) in columns"
          :key="`flex-table-header-${index}`"
        >{{column.name}}</div>
      </div>
    </div>
    <div class="flex-table-body">
      <template v-if="items.length > 0">
        <div
          class="flex-table-row"
          v-for="(item,index) in items"
          :key="`flex-table-item-column-${index}`"
        >
          <div
            class="flex-table-row--data"
            v-for="(column, index) in columns"
            :key="`row-${index}`"
          >{{item[column.value]}}</div>
        </div>
      </template>
      <template v-else>
        <div class="no-result">No Result</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlexTable",
  components: {},
  props: {
    items: Array,
    columns: Array
  },
  data() {
    return {
      results: []
    };
  },
  methods: {}
};
</script>

<style lang="scss">
$border-color: #e7e7e7;
$row-hover-color: #07575b;
$header-backgroud: #eee;
$primary: #c4dfe6;
.flex-table {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  &-row {
    display: flex;
    flex-flow: row wrap;
    flex-grow: 1;
    transition: 500ms;
    &:hover {
      background: $row-hover-color;
      color: $primary;
    }
    &:last-child {
      border-bottom: 1px solid $border-color;
    }
    &--data {
      height: 2rem;
      justify-content: center;
      display: flex;
      flex-flow: column wrap;
      padding: 0.5em 0.5em;
      flex: 1 1;
      border-top: 1px solid $border-color;
      border-left: 1px solid $border-color;
      &:last-of-type {
        border-right: 1px solid $border-color;
      }
    }
  }

  &-header {
    display: flex;
    flex-flow: row wrap;
    background: $header-backgroud;
  }

  &-body {
    display: flex;
    flex-flow: column wrap;
    .flex-table-row {
      &:nth-child(odd) {
        background: $primary;
      }
      &:hover {
        background: $row-hover-color;
      }
    }
  }

  .no-result {
    text-align: center;
    margin: 2rem;
  }

  @media all and (max-width: 768px) {
  }
  @media all and (max-width: 575px) {
    &-row {
      flex-flow: column wrap;
    }
  }
}
</style>
