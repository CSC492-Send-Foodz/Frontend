import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		id: null,
		inventoryItems: []
	},

	getters: {
		getAllInventoryItems: (state) => {
			return state.inventoryItems
		},

		getInventoryCount: (state, getters) => {
			
			return getters.getAllInventoryItems.length
		},

		getInventoryItem: (state) => (index) => {
			return state.inventoryItems[index]
		}
	},

	mutations: {
		addInventoryItem (state, item) {
			state.inventoryItems.push(item)
		}
	}
	
})