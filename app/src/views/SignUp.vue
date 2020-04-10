<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="mb-5 font-weight-light">LETS GET STARTED</h1>
      </v-flex>

      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form id="signup">
          <v-layout column>
            <v-flex>
              <v-btn-toggle mandatory v-model="toggle" tile>
                <v-btn outlined large class="btn-outline" color="primary" value="left">As a Store</v-btn>
                <v-btn outlined large class="btn-outline" color="primary" value="right">As a Charity</v-btn>
              </v-btn-toggle>
            </v-flex>
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
            <v-flex>
              <v-text-field name="name" label="Name" id="name" type="text" v-model="name" required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="address"
                label="Address"
                id="address"
                type="text"
                v-model="address"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="number"
                :label="'Location ID'"
                id="number"
                type="text"
                v-model="number"
                required
              ></v-text-field>
            </v-flex>
            <div v-show="message!==''" style="color:red">{{message}}</div>
            <v-flex mb-10 class="text-xs-center" mt-5>
              <v-btn
                tile
                outlined
                x-large
                class="btn-outline"
                color="primary"
                type="submit"
                :loading="inProgress"
              >Sign Up</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import firebase from "../plugins/database";

export default {
  data() {
    return {
      message: "",
      inProgress: false,
      toggle: "",
      name: "",
      number: "",
      address: ""
    };
  },
  computed: {
    userType: function() {
      return this.toggle === "left" ? "Grocery Store" : "Food Bank";
    }
  },

  methods: {
    ...mapMutations(["setUserType"]),
    ...mapActions(["postAccountUpdate"])
  },
  mounted() {
    firebase.database.auth().onAuthStateChanged(async user => {
      if (user) {
        var currentUser = firebase.database.auth().currentUser;
        if (
          this.name !== "" &&
          this.number !== "" &&
          this.address !== "" &&
          currentUser.metadata.creationTime ==
            currentUser.metadata.lastSignInTime
        ) {
          this.postAccountUpdate([
            this.userType,
            user.uid,
            this.name,
            this.number,
            this.address
          ])
            .then(response => {
              console.log("Response", response.data);
            })
            .catch(error => {
              console.log("Error", error);
            });
        }
      }
    });

    document.forms["signup"].addEventListener("submit", async event => {
      event.preventDefault();

      this.inProgress = true;
      if (event.target.password.value !== event.target.confirmPassword.value) {
        this.message = "Passwords Do Not Match";
      } else {
        this.setUserType(this.userType);
        var response = await firebase.signup(
          event.target.email.value,
          event.target.password.value
        );
        if (
          "The email address is already in use by another account." == response
        ) {
          this.message = response;
        }
      }
      this.inProgress = false;
    });
  }
};
</script>
