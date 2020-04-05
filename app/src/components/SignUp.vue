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
              <b>Sign Up as:</b>
              <select v-model="type">
                <option>Grocery Store</option>
                <option>Food Bank</option>
              </select>
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
              <v-text-field
                name="name"
                label="Company Name"
                id="name"
                type="text"
                v-model="name"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="address"
                label="Company Address"
                id="address"
                type="text"
                v-model="address"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="number"
                :label="type==='Grocery Store'?'Company Number':'Location ID'"
                id="number"
                type="text"
                v-model="number"
                required
              ></v-text-field>
            </v-flex>
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
import { mapMutations, mapActions } from "vuex";
import firebase from "../plugins/database";

export default {
  data() {
    return {
      message: "",
      inProgress: false,
      type: "Grocery Store",
      name: "",
      number: "",
      address: ""
    };
  },
  methods: {
    ...mapMutations(["setUserType"]),
    ...mapActions(["postAccountUpdate"])
  },
  mounted() {
    firebase.database.auth().onAuthStateChanged(async user => {
      if (user) {
        var currentUser = firebase.database.auth().currentUser;
        console.log(this.name,this.number,this.address);
        if (
          this.name !== "" &&
          this.number !== "" &&
          this.address !== "" &&
          currentUser.metadata.creationTime ==
            currentUser.metadata.lastSignInTime
        ) {
          this.postAccountUpdate([
            this.type,
            user.uid,
            this.name,
            this.number,
            this.address
          ])
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
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
        this.setUserType(this.type);
        this.message = await firebase.signup(
          event.target.email.value,
          event.target.password.value
        );
      }
      this.inProgress = false;
    });
  }
};
</script>
