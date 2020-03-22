<template>
  <div>
    <v-data-table 
      :headers="fields"
      :items="foodbankOrders"
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      class="elevation-1"
      :hide-default-footer="true"
      :fixed-header="true"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td
          v-for="food in item.inventory"
          :colspan="headers.length"
          :key="food.id"
        >
           <strong>{{food.ediOrderNumber}} </strong><br/>
          {{ food.name }}: {{ food.quantity }}
        </td>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  created() {
    this.foodbankOrders = this.getFoodBankOrders;
    for (let index = 0; index < this.foodbankOrders.length; index++) {
      this.mapOrderToGroceryStore(this.foodbankOrders[index]).then(order => {
         if (order.status == "Driver has picked up inventory from the grocery store."){

          //Where I need to send push notification but console logging for now
          console.log("Following order " + order.id + " has status of: " + order.status);
        }

        //Don't display orders where their status is UNABLE_TO_COMPLETE or DELIVERED
        if (order.status == "Order is unable to completed" || order.status == "Driver has dropped off the inventory at the food bank") {
          console.log("Not displaying following order " + order.id);
          this.foodbankOrders.splice(index, 1);
        }else{
           this.foodbankOrders[index] = order;
        }
      });
    }
  },
  data() {
    return {
      expanded: [],
      foodbankOrders: [],
      fields: [
        { text: "Order ID", value: "id", align: "center" },
        { text: "Grocery Store", value: "groceryStore", align: "center" },
        { text: "Order PlacedTime", value: "recieved", align: "center" },
        { text: "Order Status", value: "status", align: "center" },
        { text: "Drop-off Time", value: "completed", align: "center" },
        { text: "", value: "data-table-expand", align: "center" }
      ]
    };
  },
  computed: {
    ...mapGetters(["getFoodBankOrders"]),
    selected() {
      return this.foodbankOrders.indexOf(this.expanded[0]);
    }
  },
  methods: {
    ...mapActions({
      postStatusUpdate: "postStatusUpdate",
      mapOrderToGroceryStore: "mapOrderToGroceryStore"
    })
  }
};
</script>
<style lang="scss" scoped>
#expand,
#response {
  background-color: white;
  color: #333;
  border: none;
  outline: none;
}
</style>
