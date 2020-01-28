<template>
  <v-app id="inspire">
    <!-- header -->
    <Header/>
    <!-- tutup header -->

    <v-content>
      <v-container>
        <v-breadcrumbs :items="items">
        </v-breadcrumbs>
        <v-card
          class="mx-auto"
          >
          <v-card-title>
            Ganti Password
          </v-card-title>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
            <v-card-text>
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show1 ? 'text' : 'password'"
                label="Password Baru"
                hint="Minimal 8 karakter"
                @click:append="show1 = !show1"
                required
                ></v-text-field>

              <v-text-field
                v-model="passwordUlang"
                :rules="passwordUlangRules.concat(passwordRule)"
                type="password"
                label="Ulangi Password Baru"
                hint="Minimal 8 karakter"
                required
              ></v-text-field>

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'Anda harus setuju untuk melanjutkan!']"
                label="Apakah anda setuju ?"
                required
              ></v-checkbox>
            </v-card-text>
            <v-divider> </v-divider>
            <v-card-actions>
              <v-btn
                class="text-xs-right"
                color="warning"
                @click="kembali"
              >
                Kembali
              </v-btn>
              <!-- <v-btn
                color="error"
                class="mr-4"
                @click="reset"
              >
                Reset Form
              </v-btn> -->
              <v-spacer />
              <v-btn
                color="success"
                class="mr-4"
                @click="editAccount"
              >
                Simpan
              </v-btn>
            </v-card-actions>
            </v-form>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
  // @ is an alias to /src
  import Header from "@/components/header.vue";
  import axios from 'axios';

  export default {
    name: "edit-account",
    components: {
      Header
    },
    data: () => ({
      show1: false,
      items: [
          {
            text: 'Dashboard',
            disabled: false,
            href: '/',
          },
          {
            text: 'Kelola Akun',
            disabled: false,
            href: '/show-accounts',
          },
          {
            text: 'Ganti Password',
            disabled: true,
            href: 'breadcrumbs_link_2',
          },
        ],
      valid: true,
      dataUser: [],
      password: '',
      passwordRules: [
        v => !!v || 'Password harus diisi',
        v => v.length >= 8 || 'Password minimal 8 karakter',
        //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      passwordUlang: '',
      passwordUlangRules: [
        v => !!v || 'Password harus diisi',
        v => v.length >= 8 || 'Password minimal 8 karakter',
      ],
      checkbox: false,
    }),

    methods: {
      passwordRule(){
        return this.password === this.passwordUlang || "Password harus sama";
      },
      editAccount () {
        if (this.$refs.form.validate()) {
          this.snackbar = true

          axios.defaults.headers = {
            'Authorization': window.localStorage.getItem('access_token')
          }
          axios.put('/users/'+this.$route.params.id, {
            id: this.$route.params.id,
            password: this.password,
          })
          .then(response => {
              console.log(JSON.stringify(response.data))
              this.$router.back()
          })
          .catch(error =>{
              console.log(error.response)
          })
        }
      },
      kembali () {
        this.$router.back()
      },
    },
    mounted(){
      axios.defaults.headers = {
        'Authorization': window.localStorage.getItem('access_token')
      }
      axios.get('/users/'+this.$route.params.id)
      .then(response => {
          this.dataUser = response.data
          //console.log(JSON.stringify(response.data))

          this.name = this.dataUser.name
          this.email = this.dataUser.email
          this.phone = this.dataUser.phone
      })
      .catch(error =>{
          console.log(error.response)
      })
    }
  }
</script>
