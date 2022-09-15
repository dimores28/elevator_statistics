<template>
  <header class="header" @onresize="resize">
    <div class="burger">
      <burger-btn @open="showMenu"> </burger-btn>
    </div>
    <div class="bread-crumbs">
      <span class="bread-crumbs__text">
        {{ TEXT }}
      </span>
      <p class="bread-crumbs__title">
        {{ TITLE }}
      </p>
    </div>
    <div class="datapicker-wrap">
      <Datepicker
        v-model="date"
        :enableTimePicker="false"
        position="right"
        dark
        range
        :multiCalendars="multi"
        locale="ru"
        placeholder="Выберите дату"
        :format="format"
        class="dp__theme_dark"
        @update:modelValue="handleDate"
      >
        <template #calendar-header="{ index, day }">
          <div :class="index === 5 || index === 6 ? 'red-color' : ''">
            {{ day }}
          </div>
        </template>
      </Datepicker>
    </div>
  </header>
  <aside class="nav">
    <div class="logo">
      <img :src="require('@/assets/img/' + 'logo_dark.svg')" alt="logo" />
    </div>

    <v-nav></v-nav>
  </aside>
  <main class="main">
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
  <footer class="footer">
    <div class="container">
      <span>© 2022 | igc-ua</span
      ><a href="https://igc-ua.com/" target="_blank">Intellect Group Company</a>
    </div>
  </footer>
</template>

<script>
import vNav from "./views/NavigationView";
import { ru } from "date-fns/locale";
import { ref, onMounted } from "vue";
import BurgerBtn from "@/components/UI/butger-btn.vue";

import { mapGetters, mapActions } from "vuex";
export default {
  setup() {
    const date = ref(new Date());

    onMounted(() => {
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - 1);
      const endDate = new Date();

      date.value = [startDate, endDate];
    });

    const format = (date) => {
      const day_1 = date[0].toLocaleDateString("ru-RU");
      const day_2 = date[1].toLocaleDateString("ru-RU");
      return `${day_1} - ${day_2}`;
    };

    const handleDate = (modelData) => {
      date.value = modelData;
    };

    return {
      date,
      format,
      ru,
      handleDate
    };
  },
  components: {
    vNav,
    BurgerBtn
  },
  data() {
    return {
      multi: true
    };
  },
  computed: {
    ...mapGetters("navigationData", ["TITLE", "TEXT", , "TIME_RANGE"])
  },
  methods: {
    ...mapActions("navigationData", ["SET_START_DATE", "SET_END_DATE"]),
    handleDate(modelData) {
      if (modelData != null) {
        this.SET_START_DATE(modelData[0]);
        this.SET_END_DATE(modelData[1]);

        this.emitter.emit("select-datapicker", this.TIME_RANGE);
      }
    },
    showMenu() {
      document.querySelector(".nav").classList.toggle("naw-show");
    },
    resize() {
      console.log("resize");
    }
  },
  mounted() {
    this.SET_START_DATE(this.date[0]);
    this.SET_END_DATE(this.date[1]);
    this.multi = document.documentElement.clientWidth > 760;
  }
};
</script>

<style lang="less">
:root {
  --clr_bg: #212121;
  --clr_bg2: #131313;
  --clr_menu: #000000;
  --clr_icon: #fe5e38;
  --clr_gray0: #ffffff;
  --clr_gray1: rgba(255, 255, 255, 0.54);
  --clr_gray2: rgba(255, 255, 255, 0.38);
  --clr_gray3: rgba(255, 255, 255, 0.12);
  --clr_gray4: rgba(255, 255, 255, 0.08);
  --clr_state_warning: #ff9900;
  --clr_state_alarm: #ff0000;
  --clr_state_ok: #179433;
  --clr_state_repair: #2d4ec4;
}

.dp__theme_dark {
  --dp-background-color: #000 !important;
}

@import (css) "../src/assets/css/normalize.min";
@import (css) "../src/assets/css/fonts";

.container {
  max-width: 920px;
  margin: 0 auto;
}

html,
body {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  color: #fff;
  background: #2f3134;
}

.body {
  height: 100vh;
}

::-webkit-scrollbar-thumb {
  width: 8px;
  height: 30px;
  background: #000;
  border-radius: 10px;
  background-color: #171f1f;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #f9f9fd8a;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: var(--clr_gray2);
}

#app {
  font-family: "Roboto", sans-serif;
  text-align: center;
  color: #fff;
  display: grid;
  grid-template-areas:
    "nav header"
    "nav main"
    "footer footer";
  grid-template-columns: minmax(200px, 264px) auto;
  grid-template-rows: auto auto auto;
  max-width: 1200px;
  margin: 0 auto;
  background: var(--clr_bg);
  box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.1);
  --dp-background-color: #121212;
}

.header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px 10px 0px 8px;
}

.burger {
  display: none;
}

.bread-crumbs {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.18px;
  text-align: left;

  &__text {
    font-style: normal;
    font-weight: 400;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: rgba(255, 255, 255, 0.54);
    display: inline-block;
  }

  &__title {
    text-align: left;
    margin: 0;
  }
}

.main {
  grid-area: main;
  min-height: 82vh;
}

.nav {
  grid-area: nav;
  background: #000000;
  padding-top: 28px;
  padding-bottom: 100px;

  .logo img {
    display: flex;
    margin-left: 28px;
    margin-bottom: 38px;
  }
}

.footer {
  grid-area: footer;
  color: #747474;
  font-size: 12px;
  background: #151515;
  padding: 16px 0;

  a {
    color: #fff;
    text-decoration: none;
    margin: 0 15px;
  }
}

.hide {
  position: absolute;
  z-index: 3;
}

@media screen and (max-width: 780px) {
  .header {
    flex-direction: column;
    align-items: center;
  }

  .bread-crumbs {
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 760px) {
  #app {
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto;
  }

  .bread-crumbs {
    margin-bottom: 15px;
    text-align: center;

    &__title {
      text-align: center;
    }
  }

  .burger {
    display: block;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 15px;
  }

  .nav {
    position: absolute;
    top: 145px;
    left: 0;
    z-index: 11;
    transform: translateX(-100%);
    transition: all 0.6s ease-in;
  }

  .naw-show {
    transform: translateX(0);
  }
}
</style>
