<template>
   <div class="v-navigations">
      	<ul class="list-group">
				<router-link 
					v-for="item in menu"
					:key="item.route"
					:to="{ name: item.route }" 
					v-slot="{ route, isExactActive, navigate }" 
					:custom="true"
				>
					<li class="list-group-item" :class="isExactActive ? 'active' : ''">
						<a :href="route.fullPath" @click="navigate">{{ item.title }}</a>
                  <img src="" alt="">
					</li>
				</router-link>
			</ul>
   </div>
</template>

<script>
export default {
   data: () => ({
			menu: [
				{ route: 'catalog', title: 'Маршруты', imgSrc: '' },
			]
		}),
}
</script>

<style lang="less">

</style>