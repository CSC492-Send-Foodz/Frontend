import Vue from 'vue'
import Vuex from 'vuex'
import PapaParse from "papaparse";
import axios from 'axios'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import db from "../src/plugins/database"


Vue.use(Vuex, axios, vuexfireMutations)

export default new Vuex.Store({

	state: {
		id: -1,
		email: "",
		type: "",
		inventoryItems: [],
		activeOrders: [],
		foodbankOrders: []
	},

	getters: {
		getFoodBankOrders: (state) => {
			return state.foodbankOrders
		},
		
		getAllInventoryItems: (state) => {
			return state.inventoryItems;
		},

		getInventoryItem: (state) => (index) => {
			return state.inventoryItems[index];
		},

		getID: (state) => {
			return state.id;
		},

		getEmail: (state) => {
			return state.email;
		},

		getType: (state) => {
			return state.type;
		},

		getActiveOrders: (state) => {
			return state.activeOrders;
		}
	},

	mutations: {
		...vuexfireMutations,
		setID: (state, id) => {
			state.id = id;
		},
		setEmail: (state, email) => {
			state.email = email;
		},
		setType: (state, type) => {
			state.type = type;
		}
	},

	actions: {
		bindInventoryItems: firestoreAction(({ bindFirestoreRef }) => {
			bindFirestoreRef('inventoryItems',
				db.collection("GroceryStores").doc("6773").collection("InventoryCollection").doc("Items"))
		}),

		postStatusUpdate: firestoreAction((context, ediOrderNumber) => {
			if (ediOrderNumber !== undefined) {
				db.collection("Orders").doc(ediOrderNumber.toString())
					.update({ status: "Picked up" })
					.then(() => {
						console.log("Status updated");
					})
			}
		}),

		bindActiveOrders: firestoreAction(({ bindFirestoreRef }) => {
			return bindFirestoreRef('activeOrders', db.collection("Orders").where("groceryStoreId", "==", "3351"))
		}),

		mapOrderToFoodBank: firestoreAction((context, order) => {
			db.collection("FoodBank").get().then(banks => {
				banks.forEach(bank => {
					let fb = bank.data()
					if (order.foodBankId == bank.id) {
						order.foodBank = fb.name
					}
				})
			})
			return order
		}),		
		
		bindFoodBankOrders: firestoreAction(({ bindFirestoreRef }) => {
			return bindFirestoreRef('foodbankOrders', db.collection("Orders").where("foodBankId", "==", "8054"))
		}),

		mapOrderToGroceryStore: firestoreAction((context, order) => {
			db.collection("GroceryStores").get().then(stores => {
				stores.forEach(store => {
					//console.log("this is store id:" + store.id)
					let gs = store.data()
					if (order.groceryStoreId == store.id) {
						order.groceryStore = gs.company
					}
				})
			})
			return order
		}),
		postInventoryItems(context, uploadedInventoryFile) {
			if (uploadedInventoryFile !== undefined) {
				PapaParse.parse(uploadedInventoryFile, {
					complete: function (results) {
						var items = []
						results.data.forEach(resultData => {
							items.push({
								id: resultData[0],
								name: resultData[1],
								brand: resultData[2],
								groceryStoreId: resultData[3],
								quantity: resultData[4],
								expirationDate: resultData[5]
							})
						})
						axios.post("http://localhost:5000/send-foodz-1a677/us-central1/app/groceryStore/updateInventory", {
							groceryStoreId: "6773",
							ediOrderNumber: "124AZ",
							inventory: items
						})
							.then(function (response) {
								console.log(response.data);
							})
					}
				});
			}
		},
		deleteInventoryItems(context, payload) {
			axios.post("http://localhost:5000/send-foodz-1a677/us-central1/app/groceryStore/removeInventoryItem", {
				groceryStoreId: payload.groceryStoreId,
				id: payload.itemId
			})
		}
	}
})