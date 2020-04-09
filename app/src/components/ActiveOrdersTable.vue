<template>
  <div>
    <h1 class="my-6 font-weight-regular">ACTIVE ORDERS</h1>
    <v-container v-if="getActiveOrders.length !== 0" fluid>
      <v-row>
        <v-col cols="8">
          <v-list class="list">
            <v-list-item-group v-model="selected" active-class="highlighted">
              <template v-for="(item, index) in getActiveOrders">
                <v-list-item :key="item.id">
                  <v-avatar color="primary" size="70">
                    <span class="white--text">
                      <div>Send Foodz</div>
                    </span>
                  </v-avatar>

                  <v-container fluid>
                    <v-row no-gutters>
                      <v-col class="py-0 name h2">Order #{{item.id}}</v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col class="h2 py-0 time">{{expDateFormated(item.received)}}</v-col>
                    </v-row>
                  </v-container>
                  <v-container fluid>
                    <v-row no-gutters>
                      <v-col class="py-0 status">{{item.status}}</v-col>
                    </v-row>
                  </v-container>
                </v-list-item>

                <v-divider v-if="index + 1 < getActiveOrders.length" :key="index"></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col>
          <div class="profile-box">
            <h2 class="pt-6 pb-0 font-weight-regular">Order #{{getActiveOrders[selected].id}}</h2>
            <h2 class="pt-0 pb-6 font-weight-regular">Inventory</h2>
            <v-list class="list">
              <v-list-item v-for="(item) in getActiveOrders[selected].inventory" :key="item.id">
                <v-container fluid>
                  <v-row no-gutters>
                    <v-col class="py-0 name h2">{{item.name}}</v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col class="h2 py-0 time">{{item.brand}}</v-col>
                  </v-row>
                </v-container>
                <v-container fluid>
                  <v-row no-gutters>
                    <v-col class="py-0 status">{{item.quantity}}</v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>

            <v-btn tile outlined x-large @click="changeStatus" class="mb-12 btn-outline" color="primary">{{btnType}}</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div v-else>
      <h2 class="empty font-weight-regular">EMPTY</h2>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      selected: 0
    };
  },
  computed: {
    ...mapGetters({
      getActiveOrders: "getActiveOrders",
      getUserType: "getUserType"
    }),
    btnType() {
      if (this.getUserType === "Food Bank") {
        return "Confirm Delivered";
      } else {
        return "Confirm Picked Up";
      }
    }
  },
  methods: {
    ...mapActions({
      updateOrderStatus: "updateOrderStatus"
    }),

    changeStatus() {
      var status;
      if (this.getUserType === "Grocery Store") {
        status = "Inventory picked up";
      } else if (this.getUserType === "Food Bank") {
        status = "Inventory Delivered";
      }
      this.updateOrderStatus({ id: this.getActiveOrders[this.selected].id, status: status });
    },
    expDateFormated(date) {
      return moment(String(date)).format("llll");
    }
  }
};
</script>
<style>
.profile-box {
  box-shadow: 0 2px 10px 0 rgba(47, 83, 151, 0.1);
  height: 70vh;
  transition: 300ms;
  flex-grow: 1;
}

.profile-box:hover {
  box-shadow: 0 0 20px 9px rgba(0, 0, 0, 0.03);
}

.list {
  max-width: 80vw;
  background-color: #fdfdfd;
}
.name {
  font-size: 1.5em;
}

.empty {
  margin-top: 30vh;
  color: #747474;
}

.status {
  font-size: 1.5em;
  color: #747474;
}

.time {
  font-size: 1em;
  color: #747474;
}
.h2 {
  text-align: justify;
}
.btn-outline {
  border-color: #ebebeb;
}
</style>


