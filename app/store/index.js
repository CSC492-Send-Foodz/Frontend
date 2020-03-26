import Vue from 'vue'
import Vuex from 'vuex'
import PapaParse from "papaparse";
import axios from 'axios'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import db from "../src/plugins/database"

Vue.use(Vuex, axios, vuexfireMutations)

export default new Vuex.Store({


	//Stores permanent data
	state: {
		id: "8054",
		email: "",
		inventoryItems: [],
		groceryStores: [],
		activeOrders: [],
		shopingCart:[],
		userType: "Food Bank"
	},

	//Methods used to retrieve state data
	getters: {
		
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

	//Method used to modify state
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

	//Methods to perform any arbitrary asynchronous operations
	actions: {

		//bindFirestoreRef: Binds a collection, Query or Document to a property previously declared in the state
		//bind inventoryItems state with Items data from firestore


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

			//activeOrders is a list in state, and bindFIrestoreRef stores this data 
			bindFirestoreRef('activeOrders', db.collection("Orders").where(idType, "==", state.id)
			.where('status', 'in', ['Looking for Driver', 'Driveer on route for pick up', 'Inventory picked up']))
		}),

		//binds groceryStores with grocery store data in firestore
		bindGroceryStores: firestoreAction(({ bindFirestoreRef }) => {
			bindFirestoreRef('groceryStores',
				db.collection("GroceryStores"))
		}),

		//payload is the data passed to our mutation from the component committing the mutation
		//context is just a literal object with some properties from local, and other properties from store.
		updateOrderStatus: firestoreAction((context, payload) => {
			axios.post("http://localhost:5000/send-foodz-1a677/us-central1/app/order/statusUpdate", {
				id: payload.id,
				status: payload.status
			})
		}),

		//upload csv files to data
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