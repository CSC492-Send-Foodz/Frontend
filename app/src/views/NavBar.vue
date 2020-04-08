<template>
  <div>
    <v-navigation-drawer v-model="sidebar" :disable-resize-watcher="true" app>
      <v-list>
        <v-list-item v-for="item in tabsMenu" :key="item.title" :to="item.path">
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container fluid>
      <v-row >
        <v-toolbar flat>
          <span class="hidden-md-and-up">
            <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
          </span>

          <v-toolbar-title class="brand">{{ appTitle }}</v-toolbar-title>
        </v-toolbar>

        <v-col class="hidden-sm-and-down">
          <v-tabs right grow height=60 >
            <v-tab v-for="item in tabsMenu"  :key="item.title" :to="item.path">{{ item.title }}</v-tab>

            <v-tab v-if="this.getUserType === 'Food Bank'" text :to="'/cart'">
              <v-badge left color="black">
                <span slot="badge">{{getOrderFromGroceryStore.length}}</span>
                <v-icon>shopping_cart</v-icon>
              </v-badge>
            </v-tab>

            <v-tab v-if="getId!==''" @click="logout">Logout</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import firebase from "../plugins/database";
import router from "../router/index";

export default {
  data() {
    return {
      appTitle: "SEND FOODZ",
      sidebar: false,
      profileItems: [
        { title: "Sign Up", path: "/signup" },
        { title: "Log In", path: "/login" }
      ],
      foodBankTabs: [
        { title: "Stores", path: "/available-grocery-stores" },
        {
          title: " Active Orders",
          path: "/orders"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      getUserType: "getUserType",
      getId: "getId",
      getEmail: "getEmail",
      getOrderFromGroceryStore: "getOrderFromGroceryStore"
    }),

    groceryStoreTabs: function() {
      return [
        {
          title: "Inventory",
          path: "/grocery-store/" + this.getId + "/inventory"
        },
        {
          title: " Active Orders",
          path: "/orders"
        }
      ];
    },

    tabsMenu: function() {
      if (this.getUserType === "Food Bank") {
        return this.foodBankTabs;
      } else if (this.getUserType === "Grocery Store") {
        return this.groceryStoreTabs;
      } else {
        return this.profileItems;
      }
    }
  },
  methods: {
    logout() {

      firebase.signout();
      router.push("login");
    }
  }
};
</script>

<style>
#app  {
  font-family: Product Sans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

.brand {
   font-size: 2rem!important;
   color: #000000c4;
}


</style>