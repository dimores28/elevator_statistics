<template>
  <div class="v-rout-line">
    <div class="rout-log">
      <div class="rout-log__souce">{{ log.Source }}</div>
      <div class="rout-log__recive">{{ log.Recive }}</div>
      <div class="rout-log__culture">{{ log.RouteCulture }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    log: {
      type: Object
    }
  }
};
</script>

<style scoped lang="less">
.v-rout-line:hover {
  cursor: pointer;
}

.rout-log {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--clr_gray2);
  padding: 15px 8px;
}
</style>
