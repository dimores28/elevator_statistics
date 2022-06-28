<template>
   <div class="error">
		<h1>{{ title }}</h1>
      <p> {{detail}} </p>
		 <router-link :to="{name: 'routes'}">Start from routes page</router-link>
	</div>
</template>

<script>
export default {
   props: {
			title: {
				type: String,
				default: "От халепа."
			},
         detail: {
				type: String,
				default: "Сторінку не знайдено. Перепрошуємо, та давайте рухатись далі."
			},
		}
}
</script>

<style lang="less">

.error{
   color: #fff;
   width: 100%;
   background: url('../../assets/img/404.gif');
   padding: 40px 20px;
   text-align: center;
}

.error h1{
   font-size: 40px;
}

.error a{
   color: #fff;
   text-decoration: none;
   border: 1px solid #fff;
   padding: 12px ;
   display: inline-block;
   margin-top: 225px;
}

</style>