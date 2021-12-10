<template>
	<div class="container">
		<fieldset class="diy" v-show="showdiy">
			<legend>替身生成器</legend>
			<a-input placeholder="请输入替身名" v-model="standNameTmp" :maxLength=20 class="input-name" />
			<a-input placeholder="请输入替身主人名字" v-model="standName" class="input-name" :maxLength=20 />
			<a-button type="primary" class="gen-button" @click="generatorStand">
				生成替身
			</a-button>
		</fieldset>
		<div class="stand-panel" v-show="!showdiy">
			<a-button class="back" @click="showdiy=!showdiy">
				返回
			</a-button>
			<div class="left">
				<div class="left-top">
					<p class="stand-title">
						[STAND MASTER] <span class="stand-cn-title">「替身使者」</span>
					</p>
					<p class="stand-master">{{ standMasterName }}<span>{{standMasterCNName}}</span></p>
				</div>
				<div class="left-bottom">
					<div id="panel">

					</div>
				</div>
			</div>
			<div class="right">
				<p class="stand-title">
					<span class="stand-cn-title">「替身使者」</span> [STAND NAME]
				</p>
				<p class="stand-name">{{ standName }}<span>{{standCNName}}({{standENName}})</span></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				standMasterName: '', //替身主人名字
				standMasterCNName: '', //替身主人中文名
				standCNName: '', //替身中文名
				standENName: '', //替身英文名
				standName: '', //替身名字
				standNameTmp: '',
				standFNM: '', //替身姓
				standLNM: '', //替身名
				showdiy: true,
				appid: '20211210001024561',
				option: {
					radar: [{
						indicator: [{
								text: 'A',
								max: 6,
								min: 0
							},
							{
								text: 'A',
								max: 6,
								min: 0
							},
							{
								text: 'A',
								max: 6,
								min: 0
							},
							{
								text: 'A',
								max: 6,
								min: 0
							},
							{
								text: 'A',
								max: 6,
								min: 0
							},
							{
								text: 'A',
								max: 6,
								min: 0
							}
						],
						axisName: {
							show: true,
							formatter: '{value}',
							fontSize: 26,
							color: '#ffffff',
							textShadowColor: "rgba(0, 0, 0, 0.8)",
							textShadowBlur: 3,
							textShadowOffsetX: 2,
							textShadowOffsetY: 2,
							fontWeight: 'bold',
							padding: [-7, -7, -7, -7]
						},
						center: ['50%', '50%'],
						radius: '57%',
						startAngle: 90,
						splitNumber: 5,
						shape: 'circle',
						splitArea: {
							areaStyle: {
								// color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
								shadowColor: 'rgba(0, 0, 0, 0.2)',
								shadowBlur: 10
							}
						},
						axisLine: {
							lineStyle: {
								color: 'rgba(238, 240, 244, 0.8)'
							}
						},
						splitLine: {
							lineStyle: {
								color: 'rgba(238, 240, 244, 0.8)'
							}
						}
					}],
					series: [{
						type: 'radar',
						emphasis: {
							lineStyle: {
								width: 4
							}
						},
						data: [{
							value: [1, 1, 1, 1, 1, 1],
							areaStyle: {
								color: 'rgba(255, 228, 52, 0.6)'
							}
						}]
					}]
				}
			}
		},
		mounted() {
			let myChart = this.draw()
			window.addEventListener('resize', () => {
				myChart.resize()
			})
		},
		methods: {
			uuid() {
				var s = [];
				var hexDigits = "0123456789abcdef";
				for (var i = 0; i < 36; i++) {
					s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
				}
				s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
				s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
				s[8] = s[13] = s[18] = s[23] = "-";

				var uuid = s.join("");
				return uuid;
			},
			getTran(to, q) { //获取翻译
				// let input = this.iterateStr(q)
				let uuid = this.uuid()

				this.$axios({
					method: 'post',
					data: {
						q,
						from: 'auto',
						to,
						appid: this.appid,
						salt: uuid,
						sign: this.$md5(this.appid + q + uuid +
							'Y7KLq4Ce7F_9z4X8OQQu'),
						signType: 'v3',
					},
					url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
				}).then((res) => {
					console.log(res);
				})
			},
			iterateStr(q) {
				if (q.length <= 20) {
					return q;
				} else {
					return q.substr(0, 9) + q.length + q.substr(-1, -9);
				}
			},
			generatorStand() {
				this.getTran('JA', this.standNameTmp)
				this.standName = this.standNameTmp
				this.standMasterName = this.standName
				this.showdiy = !this.showdiy
			},
			draw() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('panel'))

				this.option.radar[0].indicator.map((item, index) => {
					let random = parseInt(Math.random() * 100);
					// console.log(random);
					switch (true) {
						case 0 <= random && random <= 1: //1%
							item.text = '∞';
							this.option.series[0].data[0].value[index] = 6
							break;
						case 1 < random && random <= 15: //14%
							item.text = 'A';
							this.option.series[0].data[0].value[index] = 5
							break;
						case 15 < random && random <= 38: //23%
							item.text = 'B';
							this.option.series[0].data[0].value[index] = 4
							break;
						case 38 < random && random <= 68: //30%
							item.text = 'C';
							this.option.series[0].data[0].value[index] = 3
							break;
						case 68 < random && random <= 88: //20%
							item.text = 'D';
							this.option.series[0].data[0].value[index] = 2
							break;
						case 88 < random && random <= 100: //12%
							item.text = 'E';
							this.option.series[0].data[0].value[index] = 1
							break;
					}
				})

				// 绘制图表
				myChart.setOption(this.option);

				return myChart
			}
		}

	}
</script>

<style scoped lang="scss">
	.container {
		.diy {
			width: 4.5rem;
			height: 4.0rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 0.05rem;
			border: 1px solid rgba(52, 122, 221, 0.8);
			text-align: center;
			background-color: rgba(52, 122, 221, .1);
			margin: 0 auto;

			legend {
				width: auto;
				color: #347add;
				padding: 0.05rem;
				font-weight: 700;
				// text-shadow: 0.02rem 0.02rem 0.02rem rgb(52,122,221);
			}

			.input-name {
				margin-top: 0.2rem;
				width: 3.5rem;
			}

			.gen-button {
				margin-top: 0.55rem;
			}
		}

		.stand-panel {
			width: auto;
			padding: 0.4rem 1rem;

			.back {
				position: absolute;
				right: 0;
			}

			.stand-title {
				font-size: 0.5rem;
				font-family: "Philosopher";

				.stand-cn-title {
					font-size: 0.38rem;
				}
			}

			.left {
				.stand-master {
					font-family: "yc";
				}

				.left-top {}

				.left-bottom {
					width: 4rem;
					height: 4rem;
					background-image: url(../assets/img/panelBack.png);
					background-position: center;
					background-size: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 2rem;

					#panel {
						width: 4rem;
						height: 4rem;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: transparent;
					}
				}
			}

			.right {
				text-align: right;

				.stand-name {
					font-family: "yc";
				}
			}
		}
	}
</style>
