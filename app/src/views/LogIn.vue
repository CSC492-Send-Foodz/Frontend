<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="font-weight-light">WELCOME</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form id="login">
          <v-layout column>
            <v-flex>
              <v-text-field name="email" label="Email" id="email" type="email" required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field name="password" label="Password" id="password" type="password" required></v-text-field>
            </v-flex>
            <h3
              v-show="this.$route.query.signup === 'ok' && this.message === ''"
              style="color:green;outline:2px solid limegreen;background:springgreen"
            >Account Successfully Created</h3>
            <div v-show="message!==''" style="color:red">{{message}}</div>
            <v-flex class="text-xs-center" mt-5>
              <v-btn
                tile
                outlined
                x-large
                class="btn-outline"
                color="primary"
                type="submit"
                :loading="getloadingInProgress"
              >Log In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import firebase from "../plugins/database";

import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapGetters(["getloadingInProgress"])
  },
  methods: {
    ...mapMutations(["setloadingInProgress"])
  },

  mounted() {
    document.forms["login"].addEventListener("submit", async event => {
      event.preventDefault();
      this.setloadingInProgress(true);
      var res = await firebase.signin(
        event.target.email.value,
        event.target.password.value
      );
      if (res !== undefined && !res.startsWith("{")) {
        this.message = res;
      }
    });
  }
};
</script>

<style>
.btn-outline {
  border-color: #ebebeb;
}
</style>
