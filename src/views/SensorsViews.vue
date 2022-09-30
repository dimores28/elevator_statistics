<template>
  <div class="sensors-logs">
    <DataTable
      :value="MESSAGES"
      responsiveLayout="stack"
      breakpoint="960px"
      v-model:selection="selected"
      selectionMode="single"
      @click="more"
    >
      <Column field="Text1" header="Датчик" :sortable="true"></Column>
      <Column field="PText5" header="Механізм" :sortable="true"></Column>
      <Column field="Quantity" header="Кількість" :sortable="true">
        <template #body="slotProps">
          <div class="center">
            {{ slotProps.data.Quantity }}
          </div>
        </template>
      </Column>
      <Column field="dynamics" header="Динаміка" :sortable="true"></Column>
    </DataTable>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      selected: null
    };
  },
  computed: {
    ...mapGetters("sensors", ["MESSAGES"]),
    ...mapGetters("navigationData", ["TIME_RANGE"])
  },
  methods: {
    ...mapActions("navigationData", ["SET_TITLE", "SET_TEXT"]),
    ...mapActions("sensors", ["LOAD_ALL", "SET_QUANTITY"]),
    more() {
      if (this.selected) {
        const start = this.selected.Text1.indexOf('"');
        const name = this.selected.Text1.substring(
          start + 1,
          this.selected.Text1.length - 2
        );

        this.SET_TEXT("Датчики > " + this.selected.PText5 + " > " + name);
        this.SET_QUANTITY(this.selected.Quantity);
        this.$router.push({
          name: "more-sensor",
          params: {
            id: this.selected.PValue3,
            MsgNr: this.selected.MsgNr,
            Name: name
          }
        });
      }
    }
  },
  mounted() {
    this.SET_TITLE("Датчики");
    this.SET_TEXT("");
    this.LOAD_ALL(this.TIME_RANGE);

    const context = this;
    this.emitter.on("select-datapicker", function (timerange) {
      context.LOAD_ALL(timerange);
    });
  }
};
</script>

<style lang="less">
.p-column-header-content {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.56);
}

.p-selectable-row td {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #ffffff;
  border-bottom: 1px solid white !important;
}

.sensors-logs {
  padding-top: 15px;
}

.center {
  text-align: center;
}

.p-column-title {
  text-align: center;
}
</style>
