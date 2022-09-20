<template>
  <div class="v-message-line">
    <div class="message">
      <div class="message__led" :class="classLight"></div>
      <p class="message__text">{{ message.Text1 }}</p>
      <p class="message__date">{{ message.DateTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object
    }
  },
  computed: {
    classLight() {
      if (this.message.ClassName == "Log") {
        return "log";
      } else if (this.message.ClassName == "NEW_Repeir") {
        return "repeir";
      } else if (this.message.ClassName == "Warning") {
        return "warning";
      } else if (this.message.ClassName == "NEW_ErrorsSens") {
        return "errors";
      } else if (this.message.ClassName == "Operator") {
        return "operator";
      } else if (this.message.ClassName == "Rout") {
        return "rout";
      }
    }
  }
};
</script>

<style lang="less">
.message {
  position: relative;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--clr_gray3);
  padding: 10px 24px 15px 32px;

  &__led {
    position: absolute;
    width: 8px;
    top: 6px;
    bottom: 8px;
    left: 0;
    background: var(--clr_state_ok);
    border-radius: 0px 8px 8px 0px;
  }

  &__text {
    text-align: left;
    margin: 0;
    flex-grow: 1;
  }

  &__date {
    text-align: right;
    margin: 0;
    margin-left: 10px;
    min-width: 150px;
  }
}

@media (max-width: 576px) {
  .message {
    flex-wrap: wrap;
    justify-content: center;

    &__text {
      text-align: center;
      margin-bottom: 10px;
    }
  }
}

.log {
  background: var(--clr_state_ok);
}

.repeir {
  background: var(--clr_state_repair);
}

.errors {
  background: var(--clr_state_alarm);
}

.warning {
  background: var(--clr_state_warning);
}
.operator {
  background: rgb(255, 153, 204);
}

.rout {
  background: rgb(255, 94, 252);
}
</style>
