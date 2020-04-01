import Vue from 'vue'
import Vuex from 'vuex'
import PapaParse from "papaparse";
import axios from 'axios'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import createPersistedState from 'vuex-persistedstate';
import db from "../src/plugins/database"

Vue.use(Vuex, axios, vuexfireMutations)

var store = new Vuex.Store({

	state: {
		id: "8054",
		email: "",
		token: "",
		tokenExpiry: new Date(),
		inventoryItems: [],
		groceryStores: [],
		activeOrders: [],
		shopingCart: [],
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
			return state.email
		},
		getOrderFromGroceryStore: (state) => {
			return state.shoppingCart
		},
		getShoppingCartGroceryStoreId: (state) => {
			return state.shoppingCartGroceryStoreId
		},
		getShowPopupStartNewShoppingCart: (state) => {
			return state.showPopupStartNewShoppingCart
		},
		getShoppingCart: (state) => {
			return state.shoppingCart
		},
		getShoppingCartIndex: (state) => (id) => {
			return state.shoppingCart.indexOf(state.shoppingCart.find(item => item.id == id))
		},
		getShowCheckoutError: (state) => {
			return state.showCheckoutError
		},
		getShowSuccessfullOrderPlace: (state) => {
			return state.showSuccessfullOrderPlace
		},
	},

	mutations: {
		...vuexfireMutations,
		setId: (state, id) => {
			state.id = id;
		},
		setEmail: (state, email) => {
			state.email = email;
		},
		setUserType: (state, type) => {
			state.type = type;
		},
		setShoppingCartGroceryStoreId: (state, shoppingCartGroceryStoreId) => {
			state.shoppingCartGroceryStoreId = shoppingCartGroceryStoreId
		},
		setShowPopupStartNewShoppingCart: (state, showPopupStartNewShoppingCart) => {
			state.showPopupStartNewShoppingCart = showPopupStartNewShoppingCart
		},
		setShowCheckoutError: (state, showCheckoutError) => {
			state.showCheckoutError = showCheckoutError;
		},
		setShowSuccessfullOrderPlace: (state, showSuccessfullOrderPlace) => {
			state.showSuccessfullOrderPlace = showSuccessfullOrderPlace;
		},
		addInventoryItemToCart: (state, payload) => {
			if (payload.quantity > 0) {
				payload.item.quantity = payload.quantity
				state.shoppingCart.push(payload.item)
			}
		},
		updateInventoryItemInCart: (state, payload) => {
			state.shoppingCart[payload.index].quantity = payload.quantity
		},
		removeInventoryItemFromCart: (state, index) => {
			state.shoppingCart.splice(index, 1)
		},
		clearShoppingCart: (state) => {
			state.shoppingCart = []
		},
	},

	actions: {
		bindInventoryItems: firestoreAction(({ bindFirestoreRef }, id) => {
			bindFirestoreRef('inventoryItems',
				db.firestore().collection("GroceryStores").doc(id).collection("InventoryCollection").doc("Items"))
		}),


		bindActiveOrders: firestoreAction(({ bindFirestoreRef, state }) => {
			var idType;
			if (state.userType === "Grocery Store") {
				idType = "groceryStoreId"
			}
			else if (state.userType === "Food Bank") {
				idType = "foodBankId"
			}
			bindFirestoreRef('activeOrders', db.firestore().collection("Orders").where(idType, "==", state.id))
		}),

		bindGroceryStores: firestoreAction(({ bindFirestoreRef }) => {
			bindFirestoreRef('groceryStores',
				db.firestore().collection("GroceryStores"))
		}),

		updateOrderStatus: firestoreAction((context, payload) => {

			axios.post("https://us-central1-send-foodz-1a677.cloudfunctions.net/app/order/statusUpdate", {
				id: payload.id,
				status: payload.status
			}).catch(error => {
				console.log(error.response);
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
						axios.post("https://us-central1-send-foodz-1a677.cloudfunctions.net/app/groceryStore/updateInventory", {
							groceryStoreId: context.state.id,
							ediOrderNumber: "124AZ",
							inventory: items
						}).catch(error => {
							console.log(error.response);
						})
					}
				});
			}
		},
		deleteInventoryItems(context, payload) {
			axios.post("https://us-central1-send-foodz-1a677.cloudfunctions.net/app/groceryStore/removeInventoryItem", {
				groceryStoreId: payload.groceryStoreId,
				id: payload.id
			}).catch(error => {
				console.log(error.response);
			})
		},

		postOrder(context) {
			axios.post("http://localhost:5000/send-foodz-1a677/us-central1/app/foodBank/placeOrder", {
				status: "Looking For Driver",
				groceryStoreId: context.state.shoppingCartGroceryStoreId,
				foodBankId: context.state.id,
				inventory: context.state.shoppingCart
			}).then(function (response) {
				if (response.status == 200) {
					if (response.data.status === "Order is unable to completed") {
						context.state.showCheckoutError = true
					} 
					else {
						context.state.showSuccessfullOrderPlace = true
						context.state.shoppingCart = []
					}
				}
			})
		}
	},
	plugins: [createPersistedState()]
})

axios.interceptors.request.use(async config => {
	if(new Date().getTime()>store.state.tokenExpiry.getTime()){
		await db.refreshToken();
	}
	const token = store.state.token;
	config.headers.Authorization = "Bearer " + token;
	return config;
});

export default store
