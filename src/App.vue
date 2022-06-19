<template>
   <header class="header">
     <div class="bread-crumbs">
        <span class="bread-crumbs__text">
            {{TEXT}}
        </span>
        <p class="bread-crumbs__title">
            {{TITLE}}
        </p>
     </div>
     <div class="datapicker-wrap">
        <Datepicker 
          v-model="date"
          :enableTimePicker="false"
          position="right" 
          dark range multiCalendars 
          locale="ru"
          :format="format"
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
       <img :src="require('@/assets/img/'+ 'logo_dark.svg')" alt="logo"/>
     </div>
     
     <v-nav></v-nav>

   </aside>
   <main class="main">
    <div class="container">
      <router-view></router-view>
    </div>
   </main>
    <footer class="footer">
      <h2>Footer</h2>
    </footer>

   
</template>

<script>
import vNav from './views/NavigationView'
import { ru } from 'date-fns/locale';
import { ref, onMounted } from 'vue';

import { mapGetters, mapActions } from 'vuex';
export default {
  setup(){
    const date = ref(new Date());

		onMounted(() => {
            const startDate = new Date();//new Date(new Date().setDate(new Date().getDate() - 1));
            const endDate = new Date();//new Date(new Date().setDate(new Date().getDate() + 1));
            date.value = [startDate, endDate];
        })

        const format = (date) => {
          const day_1 = date[0].toLocaleDateString("ru-RU");
          const day_2 = date[1].toLocaleDateString("ru-RU");
          return `${day_1} - ${day_2}`;
        }

        const handleDate = (modelData) => {
          date.value = modelData;
        }

    return {
            date,
            format,
            ru,
            handleDate
        }
  },
  components:{
    vNav,
  },
  data(){
    return{
      date: null,
    }
  },
  computed:{
    ...mapGetters('navigationData',
    [
      'TITLE', 
      'TEXT',
    ]),
  },
  methods:{
    ...mapActions('navigationData',
    [
      'SET_START_DATE',
      'SET_END_DATE',
    ]),
    handleDate(modelData){
      if(modelData != null){
        this.SET_START_DATE(modelData[0]);
        this.SET_END_DATE(modelData[1]);
      }
        

    }
  },
}
</script>

<style lang="less">
:root{
--clr_bg     : #212121;
--clr_bg2    : #131313;
--clr_menu   : #000000;
--clr_icon   : #FE5E38;
--clr_gray0  : #ffffff;
--clr_gray1  : rgba(255, 255, 255, 0.54);
--clr_gray2  : rgba(255, 255, 255, 0.38);
--clr_gray3  : rgba(255, 255, 255, 0.12);
--clr_gray4  : rgba(255, 255, 255, 0.08);
--clr_state_warning      : #FF9900;
--clr_state_alarm        : #FF0000;
--clr_state_ok           : #179433;
--clr_state_repair       : #2D4EC4;
}

 @import (css) '../src/assets/css/normalize.min';
 @import (css) '../src/assets/css/fonts';

.container{
  max-width: 920px;
  margin: 0 auto;
}

html,
body{
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  color: #fff;
  background: E5E5E5;
}

.body{
  height: 100vh;
}

::-webkit-scrollbar-thumb{
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
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #fff;
  display: grid;
  grid-template-areas:  "nav header"
                        "nav main"
                        "footer footer";
  grid-template-columns: minmax(200px, 264px) auto;
  grid-template-rows: 90px auto 80px;
  max-width: 1200px;
  margin: 0 auto;
  background: var(--clr_bg);
  box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.1);
}


.header{
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 65px 20px 65px;
}

  .bread-crumbs{
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 0.18px;
    text-align: left;

    &__text{
      font-style: normal;
      font-weight: 400;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.25px;
      color: rgba(255, 255, 255, 0.54);
      display: inline-block;
    }

    &__title{
      text-align: left;
      margin: 0;
    }
  }

.main{
  grid-area: main;
}

.nav{
  grid-area: nav;
  background: #000000;
  padding-top: 28px;
  padding-bottom: 100px;

  .logo img{
    display: flex;
    margin-left: 28px;
    margin-bottom: 38px;
  }
}

.footer{
  grid-area: footer;
  border: 1px solid tan;
}

</style>
