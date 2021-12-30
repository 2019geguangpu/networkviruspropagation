<template>
  <div style="height: 500px; width: 100%" id="chart"></div>
</template>

<script>
import Event from "@/util/event.js";
import { EEvent, ECommand } from "@/util/enum";
export default {
  data() {
    return {
      options: {
        title: {
          text: "各仓室实时动态折线图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          x: "right",
          y: "top",
          orient: "vertical",
          data: [
            "suscepible computer",
            "infected computer",
            "immunted computer",
            "suscepible terminal",
            "explosive terminal",
            "latent terminal",
          ],
        },
        xAxis: {
          type: "category",
          splitLine: {
            show: false,
          },
          data: [],
          minInterval: 1,
          maxInterval: 60,
        },
        yAxis: {
          type: "value",
          boundaryGap: false,
          splitLine: {
            show: true,
          },
        },
        dataZoom: [
          {
            type: "inside", //
            yAxisIndex: 0, //表示y轴折叠
            start: 100,
            end: 1,
          },
        ],
        series: [
          {
            name: "suscepible computer",
            type: "line",
            showSymbol: true,
            data: [],
          },
          {
            name: "infected computer",
            type: "line",
            showSymbol: false,
            data: [],
          },
          {
            name: "immunted computer",
            type: "line",
            showSymbol: false,
            data: [],
          },
          {
            name: "suscepible terminal",
            type: "line",
            showSymbol: false,
            data: [],
          },
          {
            name: "explosive terminal",
            type: "line",
            showSymbol: false,
            data: [],
          },
          {
            name: "latent terminal",
            type: "line",
            showSymbol: false,
            data: [],
          },
        ],
      },
      myChart: {},
    };
  },
  mounted() {
    let chartDiv = document.getElementById("chart");
    this.myChart = this.$echarts.init(chartDiv);
    this.myChart.setOption(this.options);

    const callback = (command, timeCounter, computerNumber, terminalNumber) => {
      if (command === ECommand.STOP) {
        this.options.xAxis.data.splice(0, this.options.xAxis.data.length);
        this.options.series.forEach((item) => {
          item.data.splice(0, item.data.length);
        });
      } else {
        this.options.xAxis.data.push(timeCounter);

        const barnRoomsNumber = [
          computerNumber.susceptible,
          computerNumber.infected,
          computerNumber.immunte,
          terminalNumber.susceptible,
          terminalNumber.latent,
          terminalNumber.explosive,
        ];
        this.options.series.forEach((item, index) => {
          item.data.push(barnRoomsNumber[index]);
        });
      }

      this.myChart.setOption(this.options);
    };
    Event.$on(EEvent.SET_CHART_DATA, callback);
  },
};
</script>

<style>
</style>