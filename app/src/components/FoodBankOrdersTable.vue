<template>
  <div>
    <v-data-table 
      :headers="fields"
      :items="activeOrders"
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
    this.activeOrders = this.getActiveOrders;
    console.log("this is active orders" + JSON.stringify(this.activeOrders));
    for (let index = 0; index < this.activeOrders.length; index++) {
      this.mapOrderToGroceryStore(this.activeOrders[index]).then(order => {
        this.activeOrders[index] = order;
      });
    }
  },
  data() {
    return {
      expanded: [],
      activeOrders: [],
      fields: [
        { text: "EDI Number", value: "id", align: "center" },
        { text: "Grocery Store", value: "groceryStore", align: "center" },
        { text: "Order PlacedTime", value: "recieved", align: "center" },
        { text: "Order Status", value: "status", align: "center" },
        { text: "Drop-off Time", value: "completed", align: "center" },
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
