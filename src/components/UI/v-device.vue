<template>
  <div class="v-device">
    <div class="v-device__led" :class="status === 5 ? 'error' : ''"></div>
    <div class="v-device__content">
      {{ content }}
    </div>
    <img
      :src="require('@/assets/img/sort_down_small.svg')"
      alt="arrow"
      class="v-device__arrow"
    />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      tupe: String,
      default: ""
    },
    status: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style lang="less">
.v-device {
  border-bottom: 1px solid #fff;
  padding: 10px 10px 10px 40px;
  position: relative;
  text-align: left;

  :hover {
    cursor: pointer;
  }

  &__led {
    position: absolute;
    top: 5px;
    left: 0;
    bottom: 5px;
    width: 8px;
    border-radius: 0 8px 8px 0;
    background: var(--clr_state_ok);
  }

  &__content {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
  }

  &__arrow {
    position: absolute;
    left: 50%;
    bottom: 0;
    top: 105%;
  }

  .error {
    background: var(--clr_state_alarm);
  }
}
</style>
