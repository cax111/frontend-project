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
            Edit Account
          </v-card-title>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
            <v-card-text>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nama"
                required
                ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              label="No. Telepon"
              required
            ></v-text-field>
            <v-select
              v-model="role"
              :items="tipeAkun"
              label="Tipe Akun"
              v-if="roleUserLogin==='SUPERADMIN'"
            ></v-select>
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
            text: 'Edit Akun',
            disabled: true,
            href: 'breadcrumbs_link_2',
          },
        ],
        tipeAkun: ['USER','WAREHOUSE_ADMIN','ADMIN'],
      valid: true,
      name: '',
      dataUser: [],
      nameRules: [
        v => !!v || 'Name harus diisi',
        //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail harus diisi',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'No. Telepon harus diisi',
      ],
      checkbox: false,
      roleUserLogin: window.localStorage.getItem('role'),
      role: null
    }),

    methods: {
      editAccount () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          if(window.localStorage.getItem('role')==="ADMIN" || window.localStorage.getItem('role')==="WAREHOUSE_ADMIN"){
            this.role="USER";
          }
          axios.put('/users/'+this.$route.params.id, {
            id: this.$route.params.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            role: this.role,
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
      reset () {
        this.$refs.form.reset()
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
          this.role = this.dataUser.role
      })
      .catch(error =>{
          console.log(error.response)
      })
    }
  }
</script>
