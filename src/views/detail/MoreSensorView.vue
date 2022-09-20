<template>
  <div class="more-sensor">
    <div class="line-wrap">
      <h2></h2>
      <div class="line-charts">
        <apexchart
          type="line"
          height="260"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>

    <div class="sensor-info">
      <div class="sensor__events sensor-info__item">
        <h3>События датчика</h3>
        <div class="sensor-info__events-wrap">
          <v-sens-log v-for="(log, i) in LOGS" :key="i" :log="log">
          </v-sens-log>
        </div>
      </div>
      <div class="sensor__alarms sensor-info__item">
        <h3>Количество аварий</h3>
        <div class="sensor-info__number-breakdowns">
          <div class="number-row">
            <span>Кол-во за выбраный период</span>
            <span>{{ QUANTITY }}</span>
          </div>
          <div class="number-row">
            <span>Кол-во за месяц</span>
            <span>{{ CRASH_STATISTICS[0] }}</span>
          </div>
          <div class="number-row">
            <span>Кол-во месяцем ранее</span>
            <span>{{ CRASH_STATISTICS[1] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vSensLog from "@/components/UI/v-sensor_log";
import VueApexCharts from "vue3-apexcharts";
import lineChartOptions from "@/core/presetLineChart";
export default {
  components: {
    vSensLog,
    apexchart: VueApexCharts
  },
  data() {
    return {
      series: [
        {
          name: "Срабатываний",
          data: []
        }
      ],
      chartOptions: lineChartOptions
    };
  },
  computed: {
    ...mapGetters("sensors", [
      "QUANTITY",
      "CRASH_STATISTICS",
      "LOGS",
      "TRENDS_DATA"
    ]),
    ...mapGetters("navigationData", ["TIME_RANGE"])
  },
  methods: {
    ...mapActions("sensors", ["LOAD_STAT", "LOAD_LOGS", "LOAD_CHARTS_DATA"])
  },
  watch: {
    TRENDS_DATA() {
      this.series[0].data = this.TRENDS_DATA.series;
      this.chartOptions.xaxis.categories = this.TRENDS_DATA.categories;
    }
  },
  async mounted() {
    let Msg = {};
    Msg.MsgN = this.$route.params.MsgNr;
    Msg.devID = this.$route.params.id;

    await this.LOAD_STAT(Msg);
    await this.LOAD_CHARTS_DATA(Msg);

    let fields = {};
    fields.MsNr = this.$route.params.MsgNr;
    fields.ID = this.$route.params.id;
    fields.SensName = this.$route.params.Name;
    fields.range = this.TIME_RANGE;

    await this.LOAD_LOGS(fields);

    this.chartOptions.xaxis.categories = this.TRENDS_DATA.categories;
  }
};
</script>

<style lang="less">
.line-wrap {
  max-width: 1118px;
}

.sensor-info {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;

  &__item {
    background: var(--clr_gray3);
    padding: 8px;
  }

  &__events-wrap {
    height: 493px;
    overflow: auto;
  }

  &__number-breakdowns {
    padding-bottom: 25px;
  }
}

.number-row {
  display: flex;
  justify-content: space-between;
  text-align: left;
  padding: 15px 20px 10px;
  border-bottom: 1px solid #fff;
}

@media (max-width: 992px) {
  .sensor-info {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .line-charts {
    padding: 0 20px;
  }
}

@media (max-width: 510px) {
}
</style>
