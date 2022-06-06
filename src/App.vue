<template>
   <h1>Hello new priject</h1>
   <mechanismCard/>
</template>

<script>
import mechanismCard from '@/components/UI/v-mechanism_card'

export default {
  components:{
    mechanismCard
  }
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

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
