import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/font.css';
import 'ant-design-vue/dist/antd.css';
import {
	Button,
	Input,
	message
} from 'ant-design-vue';
import * as echarts from 'echarts/core';
import {
	TitleComponent,
	LegendComponent
} from 'echarts/components';
import {
	RadarChart
} from 'echarts/charts';
import {
	CanvasRenderer
} from 'echarts/renderers';
import axios from 'axios'
import md5 from 'js-md5';

Vue.use(Button);
Vue.use(Input);
echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

Vue.prototype.$md5 = md5;
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$Message = message
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: function(h) {
		return h(App)
	}
}).$mount('#app')
