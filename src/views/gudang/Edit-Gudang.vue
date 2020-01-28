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
          Edit Gudang
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
              v-model="alamat"
              :rules="alamatRules"
              label="Alamat"
              required
            ></v-text-field>
            <v-select
              v-model="select"
              :items="dataSelect"
              :rules="[v => !!v || 'Status harus diisi']"
              label="Status"
              required
            ></v-select>
            <v-spacer></v-spacer>
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
            <v-spacer />
            <v-btn
              color="success"
              class="mr-4"
              @click="editGudang"
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
  name: "home",
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
          text: 'Gudang',
          disabled: false,
          href: '/gudang',
        },
        {
          text: 'Tambah Gudang',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],

    valid: true,
    select: null,
    dataSelect: [
      'TETAP',
      'SEMENTARA',
    ],
    checkbox: false,
    dataGudang : [],
        name: '',
        nameRules: [
          v => !!v || 'Nama harus diisi',
          //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        alamat: '',
        alamatRules: [
          v => !!v || 'Alamat harus diisi',
        ],
  }),
  methods: {
    editGudang(){
      if (this.$refs.form.validate()) {
        this.snackbar = true
        axios.defaults.headers = {
          'Authorization': this.$store.state.token
        }
        axios.put('/gudang/'+this.$route.params.id, {
          name: this.name,
          alamat: this.alamat,
          status: this.select,
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
      'Authorization': this.$store.state.token
    }
    axios.get('/gudang/'+this.$route.params.id)
    .then(response => {
        this.dataGudang =  response.data
        this.name = this.dataGudang.name
        this.alamat = this.dataGudang.alamat
        this.select = this.dataGudang.status
        console.log(JSON.stringify(response.data))
    })
    .catch(error =>{
        console.log(error.response)
    })
  }
};
</script>
