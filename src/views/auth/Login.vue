<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login Form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-form>
              <v-card-text>
                  <v-text-field
                    v-model="username"
                    label="Email"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  />
                <p>{{ username }}</p>
                <p>{{ password }}</p>
                <v-alert v-if="isError" type="error">
                  Email atau Password anda salah.
                </v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="login" @keyup.enter="login">Login</v-btn>
              </v-card-actions>
            </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data : () => ({
      username : "",
      password : "",
      isError : false,
    }),
    methods: {
      login(){
        this.isError = false
        this.$store.dispatch('loginAuth', {
          email: this.username,
          password: this.password
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          this.isError = true
          console.log(error.response)
        })
      },
    }
  }
</script>
