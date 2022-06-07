<template>
   <div class="v-navigations">
      	<nav class="list-group">
				<router-link 
					v-for="item in menu"
					:key="item.route"
					:to="{ name: item.route }" 
					v-slot="{ route, isExactActive, navigate }" 
					:custom="true"
				>
					<li class="list-group__item" :class="isExactActive ? 'active' : ''">
					<span :class="isExactActive ? 'list-group__item_led' : ''"></span>
						<img 
							:src="require('@/assets/img/'+ item.icon)" 
							:alt="item.title"
							width="24"
						>
						<a :href="route.fullPath" @click="navigate">{{ item.title }}</a>
					</li>
				</router-link>
			</nav>
   </div>
</template>

<script>
export default {
   data: () => ({
			menu: [
				{ route: 'routes', title: 'Маршруты', icon: 'Icon_Rouds.svg' },
			   { route: 'sensors', title: 'Датчики', icon: 'Icon_Sensors.svg' },
				{ route: 'card', title: 'Нории', icon: 'Icon_Noriya.svg' },
			]
		}),
}
</script>

<style lang="less">
	.list-group{

		&__item{
			list-style: none;
			text-transform: uppercase;
			display: flex;
			font-weight: 500;
			font-size: 14px;
			line-height: 16px;
			padding: 10px;
			text-align: center;
			position: relative;

			img{
				margin-right: 16px;
				margin-left: 28px;
			}

			&_led{
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				width: 5px;
				border-radius: 0px 3px 3px 0px;
				background: var(--clr_icon);
			}
		}


		a{
			text-decoration: none;
			color: #fff;
		}
		
	}

	 .active {
		background: var(--clr_bg);
	}
</style>