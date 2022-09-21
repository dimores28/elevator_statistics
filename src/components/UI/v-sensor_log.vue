<template>
  <div class="v-sensor_log sensor-log">
    <div class="sensor-log__led" :class="logType"></div>
    <div class="sensor-log__text">
      {{ log.Text1 }}
    </div>
    <div class="sensor-log__date">
      {{ log.DateTime }}
    </div>
  </div>
</template>

<script>
// Class
//
// Text1
export default {
  props: {
    log: {
      type: Object
    }
  },
  computed: {
    logType() {
      if (this.log.Class === 70) return "error";
      else if (this.log.Class === 72) return "repair";
      else return "";
    }
  }
};
</script>

<style lang="less">
.sensor-log {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid var(--clr_gray2);
  padding: 10px 20px 16px 0;

  &__led {
    position: absolute;
    top: 4px;
    left: 0;
    bottom: 6px;
    width: 8px;
    border-radius: 0px 8px 8px 0px;
  }
}

.error {
  background: var(--clr_state_alarm);
}

.repair {
  background: var(--clr_state_repair);
}
</style>
