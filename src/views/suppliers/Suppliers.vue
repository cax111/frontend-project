<template>
  <v-app id="inspire">
    <!-- header -->
    <Header/>
    <!-- tutup header -->

    <v-content>
      <v-container>
        <v-breadcrumbs :items="items">
        </v-breadcrumbs>
          <v-card>
            <v-card-title>
              <v-icon class="mr-2">mdi-home-city-outline</v-icon> Data Suppliers
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="dataSuppliers.suppliers"
              :search="search"
            >
              <template v-slot:item.aksi="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" :to="'suppliers/supplier-detail/'+dataSuppliers.suppliers[dataSuppliers.suppliers.indexOf(item)].id" v-on="on" class="ma-4"><v-icon>mdi-table-eye</v-icon></v-btn>
                  </template>
                  <span>Detail Supplier</span>
                </v-tooltip>
              </template>
            </v-data-table>
            <v-divider/>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" :to="'suppliers/add-supplier'"><v-icon>mdi-plus</v-icon>Tambah Supplier</v-btn>
            </v-card-actions>
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
          text: 'Suppliers',
          disabled: true,
        },
      ],
    dataSuppliers : [],
    dialog: false,
    drawer: null,
    search: '',
        headers: [
          {
            text: 'Nama Supplier',
            align: 'left',
            sortable: false,
            value: 'nama',
          },
          { text: 'Alamat', value: 'alamat' },
          {
            text: 'Aksi',
            align: 'left',
            sortable: false,
            value: 'aksi',
          },
        ],
  }),
  methods: {
  },
  mounted(){
    axios.defaults.headers = {
      'Authorization': window.localStorage.getItem('access_token')
    }
    axios.get('/suppliers')
    .then(response => {
        this.dataSuppliers = response.data
        //console.log(JSON.stringify(response.data))
    })
    .catch(error =>{
        console.log(error.response)
    })
  }
};
</script>
