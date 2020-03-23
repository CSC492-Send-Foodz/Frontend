import Vue from 'vue'
import Vuex from 'vuex'
import PapaParse from "papaparse";
import axios from 'axios'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import db from "../src/plugins/database"

Vue.use(Vuex, axios, vuexfireMutations)

export default new Vuex.Store({

	state: {
		id: "3351",
		email: "",
		inventoryItems: [],
		groceryStores: [],
		activeOrders: [],
		shopingCart:[],
		userType: "Grocery Store"
	},

	
	getters: {
		getFoodBankOrders: (state) => {
			return state.foodbankOrders
		},
		
		getAllInventoryItems: (state) => {
			return state.inventoryItems;
		},
		getAllGroceryStores: (state) => {
			return state.groceryStores
		},
		getActiveOrders: (state) => {
			return state.activeOrders
		},
		getId: (state) => {
			return state.id
		},
		getUserType: (state) => {
			return state.userType
		},
		getEmail: (state) => {
			return state.email;
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
		setUserType: (state, type) => {
			state.type = type;
		},
		addInventoryItemToCart: (state, item) => {
			state.shopingCart.push(item)
			console.log("groceryStoreId: " + item.groceryStoreId + " itemId: " + item.id)
		}

	},

	
	actions: {
		bindInventoryItems: firestoreAction(({ bindFirestoreRef},id) => {
			bindFirestoreRef('inventoryItems',
				db.collection("GroceryStores").doc(id).collection("InventoryCollection").doc("Items"))
		}),
		bindActiveOrders: firestoreAction(({ bindFirestoreRef, state }) => {
			var idType;
			if (state.userType === "Grocery Store") {
				idType = "groceryStoreId"
			}
			else if (state.userType === "Food Bank") {
				idType = "foodBankId"
			}
			bindFirestoreRef('activeOrders', db.collection("Orders").where(idType, "==", state.id))
		}),
		bindGroceryStores: firestoreAction(({ bindFirestoreRef }) => {
			bindFirestoreRef('groceryStores',
				db.collection("GroceryStores"))
		}),

		updateOrderStatus: firestoreAction((context, payload) => {
			axios.post("http://localhost:5000/send-foodz-1a677/us-central1/app/order/statusUpdate", {
				id: payload.id,
				status: payload.status
			})
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
								groceryStoreId: context.state.id,
								quantity: resultData[4],
								expirationDate: resultData[5]
							})
						})
						axios.post("http://localhost:5000/send-foodz-1a677/us-central1/app/groceryStore/updateInventory", {
							groceryStoreId: context.state.id,
							ediOrderNumber: "124AZ",
							inventory: items
						})
					}
				});
			}
		},
		deleteInventoryItems(context, payload) {
			axios.post("http://localhost:5000/send-foodz-1a677/us-central1/app/groceryStore/removeInventoryItem", {
				groceryStoreId: payload.groceryStoreId,
				id: payload.id
			})
		}
	}
})