<template>
  <div>
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