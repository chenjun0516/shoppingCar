new Vue({
	el: '.container',
	data () {
		return {
			address: [],
			limitNum: 3,
			currentIndex: 0,
			shippingIndex: 1
		}
	},
	mounted () {
		this.$nextTick(() => {
			this.getAddressList()
		});
	},
	computed: {
		filterAddress () {
			return this.address.slice(0, this.limitNum)
		}
	},
	methods: {
		getAddressList () {
			this.$http.get("data/address.json").then((res) => {
				res = res.body;
				console.log(res)
				if (res.status == 0) {
					this.address = res.result
					console.log(this.address.length)
				}
			})
		},
		showAll () {
			this.limitNum = this.address.length
		},
		setDefault (addressId) {
			this.address.forEach(function(item){
				if (item.addressId == addressId) {
					item.isDefault = true
				} else {
					item.isDefault = false
				}
			})
		}
	}
})