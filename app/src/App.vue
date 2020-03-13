<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" :disable-resize-watcher="true" app>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
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
          v-for="item in menuItems"
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
          v-show="getID===-1"
        >{{ profileItem.title }}</v-btn>
        <v-menu offset-y :open-on-hover="true">
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
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view />
      <ActiveOrders />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import router from "./router/index";

export default {
  name: "App",
  data() {
    return {
      appTitle: "Send Foodz",
      sidebar: false,
      menuItems: [
        { title: "Inventory", path: "/inventory" },
        { title: "Orders", path: "/orders" },
        { title: "History", path: "/history" }
      ],
      profileItems: [
        { title: "Sign Up", path: "/signup" },
        { title: "Log In", path: "/login" }
      ]
    };
  },
  computed: {
    ...mapGetters(["getID", "getEmail", "getType"])
  },
  methods: {
    ...mapMutations(["setID","setEmail","setType"]),
    logout() {
      this.setID(-1);
      this.setEmail("");
      this.setType("");
      router.push("Login");
    }
  }
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