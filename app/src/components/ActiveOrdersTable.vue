<template>
  <div>
    <v-data-table
      :headers="fields"
      :items="activeOrders"
      class="elevation-1"
      hide
      actions
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
export default {
  data() {
    return {
      activeOrders: [
        {
          EDINumber: 3232,
          foodBank: "Eden",
          time: Date(),
          orderStatus: "Searching for Driver",
          items: [
            { name: "apple", qty: 45 },
            { name: "orange", qty: 100 },
            { name: "banana", qty: 60 }
          ]
        },
        {
          EDINumber: 4671,
          foodBank: "Seva",
          time: Date(),
          orderStatus: "Picked up",
          items: [
            { name: "guava", qty: 22 },
            { name: "pineapple", qty: 500 },
            { name: "acorn", qty: 40 }
          ]
        }
      ],
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

    },
    sendStatus() {

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

<template>
  <div>
    <v-data-table
      :headers="fields"
      :items="activeOrders"
      class="elevation-1"
      hide
      actions
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
export default {
  data() {
    return {
      activeOrders: [
        {
          EDINumber: 3232,
          foodBank: "Eden",
          time: Date(),
          orderStatus: "Searching for Driver",
          items: [
            { name: "apple", qty: 45 },
            { name: "orange", qty: 100 },
            { name: "banana", qty: 60 }
          ]
        },
        {
          EDINumber: 4671,
          foodBank: "Seva",
          time: Date(),
          orderStatus: "Picked up",
          items: [
            { name: "guava", qty: 22 },
            { name: "pineapple", qty: 500 },
            { name: "acorn", qty: 40 }
          ]
        }
      ],
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
      
    },
    sendStatus() {

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
