<template>
  <div>
    <b-table :sticky-header="true" :items="activeOrders" :fields="fields">
      <template v-slot:cell(response)="row">
        <b-button id="response" @click="changeStatus(row.index)">
          <v-icon>mdi-check</v-icon>
        </b-button>
        <b-button
          id="response"
          :disabled="shouldDisable(row.index)"
          @click="removeOrder(row.index)"
        >
          <v-icon>mdi-close</v-icon>
        </b-button>
      </template>
      <template v-slot:cell(expand)="row">
        <b-button id="expand" size="sm" @click="row.toggleDetails" class="mr-2">
          <v-icon>{{
            row.detailsShowing ? "mdi-chevron-up" : "mdi-chevron-down"
          }}</v-icon>
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row v-for="item in row.item.items" :key="item"
            >{{ item.name }} : {{ item.qty }}</b-row
          >
        </b-card>
      </template>
    </b-table>
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
        "EDINumber",
        "foodBank",
        "time",
        "orderStatus",
        "response",
        "expand"
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
}
</style>
