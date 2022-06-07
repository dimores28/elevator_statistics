<template>
   <header class="header">
     <h2>Header</h2>
   </header>
   <aside class="nav">
     <h2>Logo and nav</h2>
   </aside>
   <main class="main">
     <h1>Hello new priject</h1>
    <div class="container">
      <h2>Content</h2>
      <!-- <router-view></router-view> -->
    </div>
    <footer class="footer">
      <h2>Footer</h2>
    </footer>
   </main>


   
</template>

<script>
import vCard from '@/components/UI/v-mechanism_card'

export default {
  components:{
    vCard
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

// @import url('@/assets/style/normalize.min.css');
// @import url('@/assets/style/fonts.css');

.container{
  max-width: 920px;
  margin: 0 auto;
}

.card-wrapper{
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(154px, 1fr));
  padding: 20px;
}

html,
body{
  background: var(--clr_bg);
}

#app {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #fff;
  display: grid;
  grid-template-areas:  "nav header"
                        "nav main"
                        "footer footer";
  max-width: 1200px;
  margin: 0 auto;
}


.header{
  grid-area: header;

}

.main{
  grid-area: main;
}

.nav{
  grid-area: nav;
  background: #000000;
}

.footer{
  grid-area: footer;
}

</style>
