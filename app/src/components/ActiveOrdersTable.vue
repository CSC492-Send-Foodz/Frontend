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
    for (let index = 0; index < this.activeOrders.length; index++) {
      this.mapOrderToFoodBank(this.activeOrders[index]).then(order => {
        
      });
    }
  },
  data() {
    return {
      expanded: [],
      activeOrders: [],
      fields: [
        { text: "EDI Number", value: "id", align: "center" },
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
