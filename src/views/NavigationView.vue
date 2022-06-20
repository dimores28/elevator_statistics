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
		<p class="separator">
			Механизмы
		</p>
		<nav class="list-group">
			<router-link 
				v-for="item in deviceNavigation"
				:key="item.route"
				:to="{ path: item.route + item.type + '/' + item.title}" 
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
				{ route: 'routes', title: 'Маршруты', icon: 'Icon_Rouds.svg'},
			    { route: 'sensors', title: 'Датчики', icon: 'Icon_Sensors.svg' },
			],
			deviceNavigation:[
				{ route: '/card/', title: 'Конвейеры скребковые', icon: 'Icon_Scraper.svg', type: '1' },
				{ route: '/card/', title: 'Конвейеры ленточные', icon: 'Icon_Tape.svg', type: '2' },
				{ route: '/card/', title: 'Перекедные клапана', icon: 'Icon_DiverterValve.svg', type: '7' },
				{ route: '/card/', title: 'Шлюзовые зтворы', icon: 'Icon_Gateway.svg', type: '8' },
				{ route: '/card/', title: 'Нории', icon: 'Icon_Noriya.svg', type: '9' },
				{ route: '/card/', title: 'Вентиляторы', icon: 'Icon_Fan.svg', type: '21' },
			]
		}),
}

//Коды элементов
    // 1 - Конвейер скребковый             (E_СonveyerScraper)
    // 2 - Конвейер ленточный              (E_СonveyerTape)
    // 3 - Конвейер скребковый с ЧП        (E_СonveyerScraperRPM)
    // 4 - Конвейер ленточный с ЧП         (E_СonveyerTapeRPM)
    // 5 - Конвейер скребковый с SIMOCODE  (E_СonveyerScraperSIMOCODE)
    // 6 - Конвейер ленточный с SIMOCODE   (E_СonveyerTapeSIMOCODE)
    // 7 - Перекидной клапан               (E_SwitchFlap)
    // 8 - Задвижка                        (E_Gate)
    // 9 - Нория                           (E_Noria)
    // 10- Силос                           (E_Silage)
    // 11- 3-х позиционный клапан          (E_3pFlip)
    // 12- Сушилка                         (E_Dryer)
    // 15- АВТО/ЖД загрузка/выгрузка
    // 20- Сепаратор
    // 21- Вентилятор
    // 22- Шлюзовой затвор
</script>

<style lang="less">
	.list-group{

		&__item{
			list-style: none;
			text-transform: uppercase;
			display: flex;
			align-items: center;
			font-weight: 500;
			font-size: 14px;
			line-height: 16px;
			padding: 10px;
			text-align: left;
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

	.separator{
		color: #636363;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 16px;
		text-transform: uppercase;
		letter-spacing: 1.25px;
		text-align: left;
		padding: 28px;
	}
</style>