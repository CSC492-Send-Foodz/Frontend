<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign Up</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form id="signup">
          <v-layout column>
            <v-flex>
              <v-text-field name="email" label="Email" id="email" type="email" required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field name="password" label="Password" id="password" type="password" required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                required
              ></v-text-field>
            </v-flex>
            <input type="hidden" name="type" value="GroceryStores" />
            <div v-show="message!==''" style="color:red">{{message}}</div>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit" name="signUp" :loading="inProgress">Sign Up</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import firebase from "../plugins/database";

export default {
  data() {
    return {
      message: "",
      inProgress: false
    };
  },
  methods: {
    ...mapMutations(["setID", "setEmail"])
  },
  mounted() {
    document.forms["signup"].addEventListener("submit", async event => {
      event.preventDefault();
      this.inProgress = true;
      if (event.target.password.value !== event.target.confirmPassword.value) {
        this.message = "Passwords Do Not Match";
      } else {
        this.message = await firebase.signup(
          event.target.email.value,
          event.target.password.value
        );
      }
      this.inProgress=false;
    });
  }
};
</script>
