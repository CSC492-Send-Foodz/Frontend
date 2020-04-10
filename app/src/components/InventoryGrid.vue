<template>
  <div>
    <div v-if="getAllInventoryItems != undefined && getAllInventoryItems.length != 0">
      <v-container>
        <v-row mb-5 justify="center" justify-md="start" max-width="600">
          <InventoryItem
            v-for="(item, index) in getAllInventoryItems"
            :key="index"
            class="ma-2 pa-1"
            :item="item"
          />
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <h2 class="empty font-weight-regular">EMPTY</h2>
    </div>
  </div>
</template>


<script>
import InventoryItem from "../components/InventoryGridItem.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAllInventoryItems"])
  },
  components: {
    InventoryItem
  }
};
</script>
<style scoped>
.empty {
  margin-top: 30vh;
  color: #747474;
}
</style>