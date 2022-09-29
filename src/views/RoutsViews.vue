<template>
  <div class="table-wrapper">
    <DataTable
      :value="ROUTS"
      responsiveLayout="stack"
      breakpoint="960px"
      v-model:selection="selected"
      selectionMode="single"
      dataKey="id"
      @click="more"
    >
      <Column field="Source" header="Начало маршрута" :sortable="true"></Column>
      <Column
        field="Receiver"
        header="Конец маршрута"
        :sortable="true"
      ></Column>
      <Column field="Culture" header="Культура" :sortable="true"></Column>
      <Column
        field="StartTime"
        header="Время запуска"
        :sortable="true"
      ></Column>
      <Column
        field="StopTime"
        header="Время останова"
        :sortable="true"
      ></Column>
    </DataTable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      selected: null
    };
  },
  computed: {
    ...mapGetters("routList", ["ROUTS"]),
    ...mapGetters("navigationData", ["TIME_RANGE"])
  },
  methods: {
    ...mapActions("routList", [
      "LOAD_ROUTE_LIST_BY_TIMERANGE",
      "SET_TIMERANGE"
    ]),
    ...mapActions("navigationData", ["SET_TITLE", "SET_TEXT"]),
    more() {
      if (this.selected) {
        this.SET_TEXT(
          "Маршруты  > " +
            `${this.selected.Source} --> ${this.selected.Receiver}`
        );
        this.SET_TITLE("");
        this.SET_TIMERANGE({
          StartTime: this.selected.StartTime,
          StopTime: this.selected.StopTime
        });
        this.$router.push({
          name: "rout",
          params: {
            id: this.selected.MesIDRout,
            rout: `${this.selected.Source} --> ${this.selected.Receiver}`
          }
        });
      }
    }
  },
  mounted() {
    this.SET_TITLE("Маршруты");
    this.SET_TEXT("");
    this.LOAD_ROUTE_LIST_BY_TIMERANGE(this.TIME_RANGE);

    const context = this;
    this.emitter.on("select-datapicker", function (timerange) {
      context.LOAD_ROUTE_LIST_BY_TIMERANGE(timerange);
    });
  }
};
</script>

<style lang="less">
.p-selectable-row td {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #ffffff;
  border-bottom: 1px solid white !important;
}

.p-column-header-content {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1.25px;
  text-align: left;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.56);
}

.p-column-title {
  text-align: left;
}

.table-wrapper {
  padding-top: 15px;
}

@media screen and (max-width: 1100px) {
  .table-wrapper {
    padding: 16px;
  }
}

@media screen and (max-width: 720px) {
  .table-wrapper {
    padding: 20px;
  }
}
</style>
