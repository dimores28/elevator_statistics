<template>
   <header class="header">
     <h2>Header</h2>
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



export default {
  components:{
    vNav,

  },
  data:()=>({
    cardProps: {id:1, title:'H2', errorsNum: 2, state: 4}
  })
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
  background: var(--clr_bg) !important;
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
  grid-template-rows: 82px auto 80px;
  max-width: 1200px;
  margin: 0 auto;
}


.header{
  grid-area: header;
  border: 1px solid red;
}

.main{
  grid-area: main;
  border: 1px solid green;
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
