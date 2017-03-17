
var vm=new Vue({
	el:'#app',
	data () {
		return {
			totalMoney:0,
			checkAllflag: false,
			productList:[]
		}
	},
	filters:{
		formatMoney (value, type) {
			return "￥" + value.toFixed(2) + type
		}
	},
	mounted:function(){

		this.$nextTick(function(){
			this.cartView()
		})
	
	},
	computed: {
		totalCount () {
			let itemTotal = 0;
			this.productList.forEach((value) => {
				itemTotal += value.productPrice * value.productQuentity;
			})
			return itemTotal
		}
	},
	methods:{
		cartView:function(){
			this.$http.get("data/cartData.json").then((res) => {
				console.log(res)		
				this.productList=res.body.result.list;
				this.totalMoney=res.body.result.totalMoney
				console.log(this.productList)
			})
		},
		changeMoney (item, type) {
			if (type > 0) {
				item.productQuentity++
			} else {
				item.productQuentity--
				if (item.productQuentity<0) {
					item.productQuentity = 0
				}
			}
		},
		checkGood (item) {
			if (!item.checked) {
				Vue.set(item, "checked", true)
			} else {
				item.checked = !item.checked
			}
		},
		checkAll (flag) {
			this.checkAllflag = flag;
			this.productList.forEach((item) => {
				if (!item.checked) {
					Vue.set(item, "checked", this.checkAllflag)
				} else {
					item.checked = this.checkAllflag
				}
			})
		},
		deleteGood (item) {
			if (confirm("确定删除此商品吗？")) {
				item.productQuentity = 0
				console.log('delete')
			}
		}
	}
})
//全局过滤器
Vue.filter("money", function(value, type) {
	return "￥" + value.toFixed(2) + type
})