<template>
  <div>
    <v-navigation-drawer v-model="sidebar" :disable-resize-watcher="true" app>
      <v-list>
        <v-list-item v-for="item in tabsMenu" :key="item.title" :to="item.path">
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="white" app>
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>

      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">{{ appTitle }}</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          large
          v-for="item in tabsMenu"
          :key="item.title"
          :to="item.path"
        >{{ item.title }}</v-btn>
      </v-toolbar-items>

      <div class="hidden-sm-and-down px-3">|</div>
      <v-toolbar-items>
        <v-btn
          text
          large
          v-for="profileItem in profileItems"
          :key="profileItem.title"
          :to="profileItem.path"
        >{{ profileItem.title }}</v-btn>

        <!-- v-show="getID===-1" -->
        <!-- <v-menu offset-y :open-on-hover="true">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" v-show="getID!==-1">
              <div>
                <h3>{{getEmail}}</h3>
                <div style="font-size: 75%">{{getType}}</div>
              </div>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">Logout</v-list-item>
          </v-list>
        </v-menu>-->
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      appTitle: "Send Foodz",
      sidebar: false,
      profileItems: [
        { title: "Sign Up", path: "/signup" },
        { title: "Log In", path: "/login" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      getUserType: "getUserType",
      getId: "getId",
      getEmail: "getEmail"
    }),
    
    foodBankTabs: function() {
      return [
        { title: "Stores", path: "/available-grocery-stores" },
        {
          title: " Active Orders",
          path: "/orders"
        }
      ];
    },
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
      return this.getUserType === "Food Bank"
        ? this.foodBankTabs
        : this.groceryStoreTabs;
    }
  }
  // methods: {
  // ...mapMutations(["setID","setEmail","setType"]),
  // logout() {
  //   this.setID(-1);
  //   this.setEmail("");
  //   this.setType("");
  //   // router.push("Login");
  // }
  // }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>