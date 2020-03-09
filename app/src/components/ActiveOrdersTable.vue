<template>
  <div>
    <v-btn @click="getInventory">Get Data</v-btn>
    <v-data-table
      :headers="fields"
      :items="activeOrders"
      class="elevation-1"
      hide
      actions
      :hide-default-footer="true"
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.EDINumber }}</td>
          <td>{{ row.item.foodBank }}</td>
          <td>{{ row.item.time }}</td>
          <td>{{ row.item.orderStatus }}</td>
          <td>
            <v-btn icon id="response" @click="changeStatus(row.index)">
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn
              icon
              id="response"
              :disabled="shouldDisable(row.index)"
              @click="removeOrder(row.index)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import io from "socket.io-client";

export default {
  mounted() {
      this.sendStoreId();
    },
  data() {
    return {
      socket: io("localhost:3001"),
      activeOrders: [],
      fields: [
        { text: "EDI Number", value: "EDINumber" },
        { text: "Food Bank", value: "foodBank" },
        { text: "Time", value: "time" },
        { text: "Order Status", value: "orderStatus" },
        { text: "", value: "response" }
      ]
    };
  },
  methods: {
    changeStatus(index) {
      this.activeOrders[index].orderStatus = "Picked up";
    },
    removeOrder(index) {
      this.activeOrders.splice(index, 1);
    },
    shouldDisable(index) {
      if (this.activeOrders[index].orderStatus == "Picked up") {
        return true;
      }
      return false;
    },
    getInventory() {
      console.log("getting invent")
      this.activeOrders = [];
      this.socket.on("INVENTORY_DATA", items => {
        console.log(items);
      //   items.forEach(item => {
      //     this.activeOrders.push(item);
      //     console.log(item);
      //   });
      });
    },
    sendStoreId() {
      //event.preventDefault();
      // send storeID to back end to get inventory
      console.log("sending")
      this.socket.emit("STORE_ID", {
        param: "6773"
      });
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
