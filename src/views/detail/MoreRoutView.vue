<template>
  <div class="more-rout">
    <div class="time-line">
      <h2 class="h2">{{ $route.params.rout }}</h2>
      <div class="time-line__wrap">
        <apexchart
          type="rangeBar"
          height="180"
          :options="timlinePreset"
          :series="timlineData"
        >
        </apexchart>
      </div>
    </div>

    <div class="rout-info">
      <div class="rout-info__events rout-info__substrate">
        <h3 class="h3">Події у маршруті</h3>
        <div class="rout-info__events_wrap">
          <v-route-log
            v-for="(log, i) in LOGS"
            :key="i"
            :text="log.RouteMessage"
            :datatime="log.LastAccess"
            :error="log.MesIDMes"
          >
          </v-route-log>
        </div>
      </div>
      <div class="rout-info__charts rout-info__substrate">
        <h3 class="h3">Работа/Зупинено</h3>
        <div class="charts-wrap">
          <div class="charts">
            <apexchart
              type="pie"
              :options="chartOptions"
              :series="series"
              id="pie"
            ></apexchart>
          </div>
          <div class="charts__legend">
            <v-legend
              text="В роботі"
              :precent="series[1]"
              :time="PERIOD_TIME"
            />
            <v-legend
              text="У простої"
              :precent="series[0]"
              :time="SIMPLE_ROUTE_TIME"
              activeColor="#2D4EC4"
            />
            <p>{{ ALL_TIME }}</p>
          </div>
        </div>
      </div>
      <div class="rout-info__device-list rout-info__substrate">
        <h3 class="h3">Механізми у маршруті</h3>
        <div class="rout-info__device-list_wrap">
          <v-device
            v-for="(dev, i) in MECHANISMS"
            :key="i"
            :content="dev.PText5"
            :status="dev.Status"
            @click="detailsMechanism(dev.PValue3, dev.PText5)"
          >
          </v-device>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vRouteLog from "@/components/UI/v-rout_log";
import vDevice from "@/components/UI/v-device";
import VueApexCharts from "vue3-apexcharts";
import chartPreset from "@/core/presetApexchart";
import vLegend from "@/components/UI/v-legend";
import timlinePreset from "@/core/presetTimeLine";
import toISODate from "@/api/workWithDate";

export default {
  components: {
    vRouteLog,
    vDevice,
    apexchart: VueApexCharts,
    vLegend
  },
  data() {
    this.timlineData = [];
    return {
      chartOptions: chartPreset,
      timlinePreset: timlinePreset
      // timlineData : []
    };
  },
  computed: {
    ...mapGetters("routList", [
      "LOGS",
      "MECHANISMS",
      "SIMPLE_ROUTE",
      "PERIOD",
      "PERIOD_TIME",
      "SIMPLE_ROUTE_TIME",
      "ALL_TIME"
    ]),
    series() {
      if (this.PERIOD || this.SIMPLE_ROUTE) {
        let work = Math.round(
          ((this.PERIOD - this.SIMPLE_ROUTE) * 100) / this.PERIOD
        );
        let stoped = Math.round((this.SIMPLE_ROUTE * 100) / this.PERIOD);
        return [stoped, work];
      } else {
        return [1, 1];
      }
    }
  },
  methods: {
    ...mapActions("routList", [
      "LOAD_ROUT_LOGS",
      "LOAD_MECHANISMS",
      "LOAD_ROUTE_ALARM",
      "LOG_ROUTE_STOPS"
    ]),
    ...mapActions("navigationData", ["SET_TITLE", "SET_TEXT"]),
    loadTimlineData() {
      let rezData = [];

      let worked = { name: "В роботі", data: [] };
      let stopped = { name: "У простої", data: [] };

      let startTime = null;
      let stopTime = null;

      let breaking = null;
      let restarted = null;

      //Смещение времени по часовому поясу
      let offset = new Date().getTimezoneOffset() * -1 * 60000;

      this.LOGS.forEach((elem) => {
        // 1 - Запущен; 2 -перезапущен; 4 - Остановлен; 5 - Авария;

        //В работе
        if ((elem.MesIDMes === 1 || elem.MesIDMes === 2) && !startTime) {
          startTime = new Date(toISODate(elem.LastAccess)) - 0 + offset;
        } else if ((elem.MesIDMes === 4 || elem.MesIDMes === 5 || elem.MesIDMes === 3) && !stopTime) {
          stopTime = new Date(toISODate(elem.LastAccess)) - 0 + offset;
        }

        if (stopTime && !startTime) {
          stopTime = null;
        }

        if (startTime && stopTime) {
          worked.data.push({ x: "w", y: [startTime, stopTime] });
          startTime = null;
          stopTime = null;
        }

        //В простое
        if (elem.MesIDMes === 5 && !breaking) {
          breaking = new Date(toISODate(elem.LastAccess)) - 0 + offset;
        } else if (elem.MesIDMes === 2 && !restarted) {
          restarted = new Date(toISODate(elem.LastAccess)) - 0 + offset;
        }

        if (!breaking && restarted) {
          restarted = null;
        }

        if (breaking && restarted) {
          stopped.data.push({ x: "w", y: [breaking, restarted] });
          breaking = null;
          restarted = null;
        }
      });

      rezData.push(worked);
      rezData.push(stopped);

      return rezData;
    },
    detailsMechanism(id, name) {
      this.SET_TITLE("Механізми");
      this.SET_TEXT(`Механізми > ${name}`);
      this.$router.push({ name: "details", params: { id: id, name: name } });
    }
  },
  watch: {
    LOGS() {
      this.timlineData = this.loadTimlineData();
    }
  },
  mounted() {
    this.LOAD_ROUT_LOGS(this.$route.params.id);
    this.LOAD_MECHANISMS(this.$route.params.id);
    this.LOAD_ROUTE_ALARM(this.$route.params.id);
    this.LOG_ROUTE_STOPS(this.$route.params.id);

    let context = this;

    setTimeout(() => {
      context.timlineData = context.loadTimlineData();
    }, 100);
  }
};
</script>

<style lang="less">
.time-line {
  max-width: 1118px;
}

.rout-info {
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 1fr;

  &__events {
    grid-column: 1;
    grid-row: 1 / 3;

    &_wrap {
      height: 493px;
      overflow: auto;
    }
  }

  &__device-list {
    overflow: auto;
    scrollbar-width: 3px;
    scrollbar-color: var(--clr_gray2);

    &_wrap {
      height: 320px;
      overflow: auto;
    }
  }

  &__substrate {
    background: var(--clr_gray3);
    padding: 8px;
  }
}

.charts-wrap {
  display: flex;
}

.charts {
  &__legend {
    flex: 1 1;
    text-align: right;
    p {
      padding-right: 8px;
      margin-bottom: 0;
    }
  }
}

#pie {
  width: 180px;
}

@media (max-width: 1100px) {
  .time-line {
    padding: 0 20px 0 20px;
  }

  .rout-info {
    padding: 0 25px;
  }
}

@media (max-width: 992px) {
  .rout-info {
    grid-template-columns: 1fr;
    padding: 0 20px;

    &__events {
      grid-column: 1;
      grid-row: 2;
    }

    .time-line {
      padding: 0 20px 0 20px;
    }

    #pie {
      width: 180px;
    }
  }
}

@media (max-width: 510px) {
  .time-line {
    height: auto;
  }
  .time-line__wrap {
    display: none;
  }

  .charts-wrap {
    flex-direction: column;
  }

  #pie {
    margin: 0 auto;
  }
}
</style>
