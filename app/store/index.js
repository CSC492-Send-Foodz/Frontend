import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		id: null,
		inventoryItems: [
			{
				id: 1,
				name: "apple",
				brand: "sun",
				groceryStoreId: 8054,
				quantity: 15,
				expirationDate: "now",
				ediOrderNumber: "abc123"
			}, {
				id: 1,
				name: "apple",
				brand: "sun",
				groceryStoreId: 8054,
				quantity: 15,
				expirationDate: "now",
				ediOrderNumber: "abc123"
			}
			, {
				id: 1,
				name: "orange",
				brand: "sun",
				groceryStoreId: 8054,
				quantity: 15,
				expirationDate: "now",
				ediOrderNumber: "abc123"
			},
			{
				id: 1,
				name: "apple",
				brand: "sun",
				groceryStoreId: 8054,
				quantity: 15,
				expirationDate: "now",
				ediOrderNumber: "abc123"
			}

		]
	},
	mutations: {
		addInventoryItems(state, items) {
			state.inventoryItems.push(items)
		}
	}
})