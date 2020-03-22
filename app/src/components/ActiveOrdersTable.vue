<template>
  <div>
    <v-data-table
      :headers="fields"
      :items="activeOrders"
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="name"
      class="elevation-1"
      show-expand
      :hide-default-footer="true"
      :fixed-header="true"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td
          v-for="food in item.inventory"
          :colspan="headers.length-2"
          :key="food.id"
        >
        <strong>{{food.ediOrderNumber}} </strong><br/>
          {{ food.name }}: {{ food.quantity }}
        </td>
      </template>
      <template v-slot:item.response="row">
        <td>
          <v-btn
            icon
            id="response"
            :disabled="shouldDisable(row.item)"
            @click="changeStatus(row.item)"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn
            icon
            id="response"
            :disabled="shouldDisable(row.item)"
            @click="removeOrder(row.item)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  created() {
    this.activeOrders = this.getActiveOrders;
    if (this.activeOrders.length === 0) {
      this.activeOrders = [];
      return;
    }
    for (let index = 0; index < this.activeOrders.length; index++) {
      this.mapOrderToFoodBank(this.activeOrders[index]).then(order => {
        if (order.status === 'Order is unable to completed' || order.status === 'Driver has dropped off the inventory at the food bank') {
          this.activeOrders.splice(index, 1);
          console.log(this.activeOrders.length)
        } else {
          this.activeOrders[index] = order; 
        }
      });
    }
  },
  data() {
    return {
      expanded: [],
      activeOrders: [],
      fields: [
        { text: "Order ID", value: "id", align: "center" },
        { text: "Food Bank", value: "foodBank", align: "center" },
        { text: "Time", value: "recieved", align: "center" },
        { text: "Order Status", value: "status", align: "center" },
        { text: "", value: "response", align: "center" },
        { text: "", value: "data-table-expand", align: "center" }
      ]
    };
  },
  computed: {
    ...mapGetters(["getActiveOrders"]),
    selected() {
      return this.activeOrders.indexOf(this.expanded[0]);
    }
  },
  methods: {
    ...mapActions({
      postStatusUpdate: "postStatusUpdate",
      mapOrderToFoodBank: "mapOrderToFoodBank"
    }),
    changeStatus(item) {
      let index = this.activeOrders.indexOf(item);
      this.activeOrders[index].status = "Picked up";
      this.postStatusUpdate(this.activeOrders[index].id);
    },
    removeOrder(item) {
      let index = this.activeOrders.indexOf(item);
      this.activeOrders.splice(index, 1);
    },
    shouldDisable(item) {
      let index = this.activeOrders.indexOf(item);
      if (this.activeOrders[index].status == "Picked up") {
        return true;
      }
      return false;
    }
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
