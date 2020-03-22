<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Log In</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form
          id="login"
          action="http://localhost:5000/send-foodz-1a677/us-central1/app/login/authenticate"
          method="post"
          enctype="application/x-www-form-urlencoded"
        >
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
              <v-btn color="primary" type="submit" :loading="inProgress">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import router from "../router/index";

export default {
  data() {
    return {
      message: "",
      inProgress: false
    };
  },
  methods: {
    ...mapMutations(["setID","setEmail","setType"])
  },
  mounted() {
    document.forms["login"].addEventListener("submit", event => {
      event.preventDefault();
      this.inProgress = true;
      fetch(event.target.action, {
        method: "POST",
        body: new URLSearchParams(new FormData(event.target))
      })
        .then(resp => {
          return resp.json();
        })
        .then(body => {
          if (body.message.startsWith("ERROR: ")) {
            this.message = body.message.substring(7);
          } else {
            this.setID(body.id);
            this.setEmail(body.email);
            this.setType(body.type);
            router.push("../")
          }
          this.inProgress = false;
        })
        .catch(error => {
          this.message = "Something went wrong. Try agian Later";
          this.inProgress = false;
          console.log(error);
        });
    });
  }
};
</script>
