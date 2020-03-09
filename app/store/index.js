import Vue from 'vue'
import Vuex from 'vuex'
import PapaParse from "papaparse";

import axios from 'axios'
import VueAxios from 'vue-axios'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import db from "../src/plugins/database"


Vue.use(Vuex, VueAxios, axios, vuexfireMutations)

export default new Vuex.Store({

	state: {
		id: null,
		inventoryItems: []
	},

	getters: {
		getAllInventoryItems: (state) => {
			return state.inventoryItems
		},

		getInventoryItem: (state) => (index) => {
			return state.inventoryItems[index]
		}
	},

	mutations: {
		...vuexfireMutations,
	},

	actions: {
		bindInventoryItems: firestoreAction(({ bindFirestoreRef }) => {
			// return the promise returned by `bindFirestoreRef`
			bindFirestoreRef('inventoryItems',
				db.collection("GroceryStores").doc("6773").collection("InventoryCollection").doc("Items"))
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