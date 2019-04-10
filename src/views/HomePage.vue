<template>
  <div class="container">
    <Chart
      :chartData="fruitChart.chartData"
      :options="fruitChart.options"
      type="bar"
      id="chart-1"
      v-if="filteredResults.length > 0"
    ></Chart>
    <Chart
      :chartData="colorChart.chartData"
      :options="colorChart.options"
      type="bar"
      id="chart-2"
      v-if="filteredResults.length > 0"
    ></Chart>
    <div class="filter-container">
      <div class="filter-group">
        <span class="filter-label">Gender:</span>
        <DataFilter
          class="filter"
          @select="filterByGender"
          :options="genderOptions"
          :defaultOption="genderOptions[0]"
        ></DataFilter>
      </div>
      <div class="filter-group">
        <span class="filter-label">Fruit:</span>
        <DataFilter
          class="filter"
          @select="filterByFruit"
          :options="fruitOptions"
          :defaultOption="fruitOptions[0]"
        ></DataFilter>
      </div>
      <div class="filter-group">
        <span class="filter-label">Color:</span>
        <DataFilter
          class="filter"
          @select="filterByColor"
          :options="colorOptions"
          :defaultOption="colorOptions[0]"
        ></DataFilter>
      </div>
    </div>

    <FlexTable :items="pageResults" :columns="columns" v-if="hasResult"></FlexTable>
    <div class="pagination-container">
      <Pagination
        :page-size="pageSize"
        :total-items="filteredResults.length"
        @pageChanged="onPageChange"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import FlexTable from "@/components/FlexTable";
import DataFilter from "@/components/DataFilter";
import Pagination from "@/components/Pagination";
import Chart from "@/components/Chart";
export default {
  name: "HomePage",
  components: {
    FlexTable,
    DataFilter,
    Pagination,
    Chart
  },
  data() {
    return {
      results: [],
      genderOptions: ["all"],
      fruitOptions: ["all"],
      colorOptions: ["all"],
      pageSize: 25,
      currentPage: 1,
      filter: {
        gender: "all",
        fruit: "all",
        color: "all"
      },
      columns: [
        {
          name: "Name",
          value: "name"
        },
        {
          name: "Gender",
          value: "gender"
        },
        {
          name: "Age",
          value: "age"
        },
        {
          name: "Favorite Fruit",
          value: "favoriteFruit"
        },
        {
          name: "Favorite Color",
          value: "favoriteColor"
        }
      ],
      fruitChart: null,
      colorChart: null
    };
  },
  methods: {
    unique(arr) {
      return Array.from(new Set(arr)).sort();
    },
    filterByGender(value) {
      this.filter.gender = value;
    },
    filterByColor(value) {
      this.filter.color = value;
    },
    filterByFruit(value) {
      this.filter.fruit = value;
    },
    fetchSurveyResults() {
      this.axios.get("/cfwESJfBBu").then(response => {
        this.results = response.data;
        this.genderOptions = this.genderOptions.concat(
          this.unique(
            this.results.map(result => {
              return result.gender;
            })
          )
        );
        this.fruitOptions = this.fruitOptions.concat(
          this.unique(
            this.results.map(result => {
              return result.favoriteFruit;
            })
          )
        );
        this.colorOptions = this.colorOptions.concat(
          this.unique(
            this.results.map(result => {
              return result.favoriteColor;
            })
          )
        );
      });
    },
    onPageChange(currentPage) {
      this.currentPage = currentPage;
    },
    mapChartData(arr, attr) {
      let data = {};
      arr.forEach(result => {
        if (!data[result[attr]]) {
          data[result[attr]] = {
            male: 0,
            female: 0
          };
        }

        if (result.gender == "male") {
          data[result[attr]].male++;
        }

        if (result.gender == "female") {
          data[result[attr]].female++;
        }
      });
      let maleData = [];
      let femaleData = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          maleData.push(element.male);
          femaleData.push(element.female);
        }
      }
      return {
        maleData: maleData,
        femaleData: femaleData,
        labels: Object.keys(data)
      };
    },
    createChartData(dataSource, gender) {
      let datasets = [];
      if (gender == "all") {
        datasets = [
          {
            label: "Male",
            backgroundColor: "#003b46",
            data: dataSource.maleData
          },
          {
            label: "Female",
            backgroundColor: "#66a5ad",
            data: dataSource.femaleData
          }
        ];
      }

      if (gender == "male") {
        datasets = [
          {
            label: "Male",
            backgroundColor: "#003b46",
            data: dataSource.maleData
          }
        ];
      }

      if (gender == "female") {
        datasets = [
          {
            label: "Female",
            backgroundColor: "#66a5ad",
            data: dataSource.femaleData
          }
        ];
      }

      return {
        chartData: {
          labels: dataSource.labels,
          datasets: datasets
        },
        options: {
          title: {
            display: true,
            text: this.chartTitle
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      };
    }
  },
  computed: {
    hasResult() {
      return this.results.length > 0;
    },
    pageResults() {
      let startPosition = (this.currentPage - 1) * this.pageSize;
      let endPosition = startPosition + (this.pageSize - 1);
      return this.filteredResults.slice(startPosition, endPosition);
    },
    filteredResults() {
      return this.results.filter(result => {
        const genderMatched =
          this.filter.gender == "all" || result.gender == this.filter.gender;
        const colorMatched =
          this.filter.color == "all" ||
          result.favoriteColor == this.filter.color;
        const fruitMatched =
          this.filter.fruit == "all" ||
          result.favoriteFruit == this.filter.fruit;
        return genderMatched && colorMatched && fruitMatched;
      });
    },
    chartTitle(){
        return `Gender: ${this.filter.gender}; Fruit: ${this.filter.fruit}; Color: ${this.filter.color}`
    }
  },
  watch: {
    filteredResults: {
      handler() {
        let fruitChartDataSource = this.mapChartData(
          this.filteredResults,
          "favoriteFruit"
        );

        let colorChartDataSource = this.mapChartData(
          this.filteredResults,
          "favoriteColor"
        );
        this.fruitChart = this.createChartData(
          fruitChartDataSource,
          this.filter.gender
        );

        this.colorChart = this.createChartData(
          colorChartDataSource,
          this.filter.gender
        );
      },
      deep: true
    }
  },
  mounted() {
    this.fetchSurveyResults();
  }
};
</script>

<style lang="scss">
.container {
  width: 90%;
  max-width: 1200px;
  margin: auto;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1rem;
}

.filter {
  display: inline-block;
  width: 100%;
  max-width: 200px;
  height: 2rem;
  font-size: 1.2rem;
  font-weight: 300;
}

.filter-label {
  display: inline-block;
  padding: 0.5em;
}

.filter-group {
  flex: 1 1;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}
</style>
