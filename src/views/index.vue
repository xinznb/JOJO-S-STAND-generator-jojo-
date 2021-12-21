<template>
	<div >
		<fieldset class="diy" v-show="showdiy">
			<legend>替身生成器</legend>
			<a-input placeholder="请输入替身名" v-model="standName" :maxLength=20 class="input-name" />
			<a-input placeholder="请输入替身主人名字" v-model="standNameTmp" class="input-name" :maxLength=20 />
			<a-button type="primary" class="gen-button" @click="generatorStand">
				生成替身
			</a-button>
		</fieldset>
		<div class="stand-panel" v-show="!showdiy" :style="container">
			<a-button class="back" @click="showdiy=!showdiy">
				返回
			</a-button>
			<div class="left" :style="fontStyle">
				<div class="left-top">
					<p class="stand-title">
						[STAND MASTER] <span class="stand-cn-title">「替身使者」</span>
					</p>
					<p class="stand-master">
						<span>{{standMasterJPName}}<br></span>
						{{ standMasterName }}
					</p>
				</div>
				<div class="left-bottom">
					<div id="panel">

					</div>
				</div>
			</div>
			<div class="right" :style="fontStyle">
				<p class="stand-title">
					<span class="stand-cn-title">「替身使者」</span> [STAND NAME]
				</p>
				<p class="stand-jp-name">{{standJPName}}</p>
				<p class="stand-name">{{ standName }}<span>{{standCNName}}({{standENName}})</span></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				container:{
					'background':''
				},
				fontStyle:{
					'text-shadow': ''
				},
				standMasterName: '', //替身主人名字
				standMasterCNName: '', //替身主人中文名
				standMasterJPName: '', //替身主人日文名
				standCNName: '', //替身中文名
				standENName: '', //替身英文名
				standJPName: '', //替身日文名
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
			this.drawBack()
			let myChart = this.draw()
			window.addEventListener('resize', () => {
				myChart.resize()
			})
		},
		methods: {
			drawBack(){
				let color1 = parseInt(Math.random() * 255);
				let color2 = parseInt(Math.random() * 255);
				let color3 = parseInt(Math.random() * 255);
				let color4 = parseInt(Math.random() * 255);
				let color5 = parseInt(Math.random() * 255);
				let color6 = parseInt(Math.random() * 255);
				let random = parseInt(Math.random() * 2);
				let random3 = parseInt(Math.random() * 2);
				let softLine = parseInt(Math.random() * 100);
				
				let baccolor1 = color1.toString(16)+color2.toString(16)+color3.toString(16)
				let baccolor2 = color4.toString(16)+color5.toString(16)+color6.toString(16)
				let arr = ['linear-gradient','radial-gradient']
				let arr2 = ['to right','to bottom right','to top']
				let arr3 = ['circle','ellipse']
				let random2 = parseInt(Math.random() * arr2.length);
				
				if(arr[random] == 'linear-gradient'){
					this.container.background = `linear-gradient(${arr2[random2]},#${baccolor1},${softLine}%,#${baccolor2})`
				}else{
					this.container.background = `radial-gradient(${arr3[random3]},#${baccolor1},${softLine}%,#${baccolor2})`
				}
				this.fontStyle["text-shadow"] = `0.04rem 0.02rem 0.16rem #${baccolor1}`
			},
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
				let sign = this.$md5(this.appid + q + uuid + 'e9uWK7L_VAnk3lAlFFkI')

				this.$axios({
					method: 'post',
					// data: {
					// 	q,
					// 	from: 'auto',
					// 	to,
					// 	appid: this.appid,
					// 	salt: uuid,
					// 	sign: this.$md5(this.appid + q + uuid +
					// 		'e9uWK7L_VAnk3lAlFFkI'),
					// 	signType: 'v3',
					// },
					url: `/fyapi/trans/vip/translate?q=${q}&from=auto&to=${to}&appid=${this.appid}&salt=${uuid}&sign=${sign}`,
					// url: `/fyapi/trans/vip/translate`,
				}).then((res) => {
					if (res.data.to == 'jp') {
						console.log(res.data.trans_result[0]);
						let str = res.data.trans_result[0].dst
						let arr = str.split('、')
						this.standJPName = arr[1]
						this.standMasterJPName = arr[0]
					} else if (res.data.to == 'en') {
						this.standENName = res.data.trans_result[0].dst
					}
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
				if(!this.standName || !this.standNameTmp){
					this.$Message.error('请填写替身名和主人名，若想随机生成请等下个版本');
					return
				}
				this.standMasterName = this.standNameTmp
				this.getTran('en', this.standName)
				this.getTran('jp', `${this.standNameTmp}、${this.standName}`)
				this.showdiy = !this.showdiy
				this.draw()
				this.drawBack()
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

			p {
				display: inline;
			}

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
			display: flex;
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
					font-size: 0.48rem;
				}
			}

			.stand-jp-name {
				font-size: 0.48rem;
				font-family: "yc";
			}

			.left {
				width: 50%;
				color: whitesmoke;
				.left-top {
					margin-right: 1.6rem;
					.stand-master {
						font-family: 'sj';
						font-size: 0.32rem;
						display: flex;
						flex-direction: column;
						align-items: center;
						span{
							font-size: 0.48rem;
							font-family: "yc";
						}
					}
				}

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
				align-self: flex-end;
				text-align: right;
				width: 50%;
				color: whitesmoke;

				.stand-name {
					font-family: 'sj';
					font-size: 0.32rem;
					span{
						font-family: "Philosopher";
					}
				}
			}
		}
</style>
