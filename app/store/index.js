import Vue from 'vue'
import Vuex from 'vuex'
import PapaParse from "papaparse";
import axios from 'axios'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import createPersistedState from 'vuex-persistedstate';
import db from "../src/plugins/database"

Vue.use(Vuex, axios, vuexfireMutations)

const BASE_URL = "https://us-central1-send-foodz-1a677.cloudfunctions.net/app";

var store = new Vuex.Store({

	state: {
		id: "",
		email: "",
		token: "",
		tokenExpiry: new Date(),
		inventoryItems: [],
		groceryStores: [],
		activeOrders: [],
		userType: "",
		shoppingCart: [],
		loadingInProgress: false,
		shoppingCartGroceryStoreId: "",
		showPopupStartNewShoppingCart: false,
		showCheckoutError: false,
		showSuccessfullOrderPlace: false
	},


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
		getloadingInProgress: (state) => {
			return state.loadingInProgress
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
			state.userType = type;
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
		setloadingInProgress: (state, isloadingInProgress) => {
			state.loadingInProgress = isloadingInProgress;
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
			state.shoppingCartGroceryStoreId = ""
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
			bindFirestoreRef('activeOrders', db.firestore().collection("Orders").where(idType, "==", state.id)
				.where('status', 'in', ['Looking For Driver', 'Driver on route for pick up', 'Inventory picked up']))
		}),

		bindGroceryStores: firestoreAction(({ bindFirestoreRef }) => {
			bindFirestoreRef('groceryStores',
				db.firestore().collection("GroceryStores"))
		}),

		updateOrderStatus: firestoreAction((context, payload) => {

			axios.post(BASE_URL + "/order/statusUpdate", {
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
						
						axios.post(BASE_URL + "/groceryStore/updateInventory", {
							groceryStoreId: context.state.id,
							ediOrderNumber: "124AZ",
							inventory: items
						})
					}
				});
			}
		},
		deleteInventoryItems(context, payload) {
			axios.post(BASE_URL + "/groceryStore/removeInventoryItem", {
				groceryStoreId: payload.groceryStoreId,
				id: payload.id
			})
		},

		postOrder(context) {
			context.state.loadingInProgress = true;
			axios.post(BASE_URL + "/foodBank/placeOrder", {
				status: "Looking For Driver",
				groceryStoreId: context.state.shoppingCartGroceryStoreId,
				foodBankId: context.state.id,
				inventory: context.state.shoppingCart
			}).then(function (response) {
				context.state.loadingInProgress = false;
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
		}, postAccountUpdate(context, [type, id, name, number, address]) {
			var url = BASE_URL
			var data = {
				id: id,
				address: address
			};
			if (type === "Food Bank") {
				url += "/foodBank/updateUserAccount";
				data.name = name;
				data.locationId = number;
			} else if (type === "Grocery Store") {
				url += "/groceryStore/updateUserAccount";
				data.company = name;
				data.storeNumber = number;
			}
			return axios.post(url, data);
		}, postCheckAccountType(context, id) {
			return axios.post(BASE_URL + "/auth/checkUserType", {
				id: id,
				type: context.type === "Food Bank" ? "Foodbanks" : "GroceryStores"
			});
		}
	},
	plugins: [createPersistedState()]
})

axios.interceptors.request.use(async config => {
	if ((store.state.tokenExpiry!== undefined && new Date().getTime() > store.state.tokenExpiry.getTime()) || store.state.token==="") {
		await db.refreshToken();
	}
	const token = store.state.token;
	config.headers.Authorization = "Bearer " + token;
	return config;
});

export default store
