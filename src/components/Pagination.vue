<template>
  <div class="pagination">
    <span href="#" @click="back">&laquo;</span>
    <span
      v-for="number in maxPage"
      :key="`page-${number}`"
      :class="[number == currentPage ? 'current-page' : '']"
      @click="nav(number)"
    >{{number}}</span>
    <span href="#" @click="next">&raquo;</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  components: {},
  props: {
    pageSize: Number,
    totalItems: Number
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    maxPage() {
      const maxPage = Math.ceil(this.totalItems / this.pageSize);
      return maxPage ? maxPage : 1;
    }
  },
  methods: {
    nav(number) {
      this.currentPage = number;
    },
    back() {
      this.currentPage == 1 ? "" : (this.currentPage = this.currentPage - 1);
    },
    next() {
      this.currentPage == this.maxPage
        ? ""
        : (this.currentPage = this.currentPage + 1);
    }
  },
  watch: {
    currentPage() {
      this.$emit("pageChanged", this.currentPage);
    },
    totalItems() {
      this.currentPage = 1;
    }
  }
};
</script>

<style lang="scss">
$primary: #c4dfe6;
$secondary: #66a5ad;
$span-hover-color: #003b46;
.pagination {
  display: inline-block;
  & span {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.5s;
  }

  & span:hover {
    color: $span-hover-color;
    background: $secondary;
  }
}

.current-page {
  background: $primary;
}
</style>
