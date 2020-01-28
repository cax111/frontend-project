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
              :loading="loading"
              :options.sync="pagination"
              :server-items-length="dataSuppliersLength"
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
    dataSuppliersLength : null,
    pagination: {
      itemsPerPage: 5,
    },
    loading: false,
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
    getItems(){
      this.loading = true
      axios.defaults.headers = {
        'Authorization': this.$store.state.token
      }
      axios.get('/suppliers')
      .then(response => {
          this.dataSuppliersLength =  response.data.suppliers.length
      })
      .catch(error =>{
          console.log(error.response)
      })
    },
    getItemsPage(){
      this.loading = true
      axios.defaults.headers = {
        'Authorization': this.$store.state.token
      }
      axios.get('/suppliers?limit='+this.pagination.itemsPerPage+'&page='+this.pagination.page)
      .then(response => {
          this.dataSuppliers = response.data
          this.loading = false
      })
      .catch(error =>{
          console.log(error.response)
      })
    },
    searchItemsTotal(){
      this.loading = true
      axios.defaults.headers = {
        'Authorization': this.$store.state.token
      }
      axios.get('/suppliers/search?query='+this.search+'&pager.limit='+100+'&pager.page='+1)
      .then(response => {
          this.dataSuppliersLength =  response.data.gudangs.length
          //console.log(JSON.stringify(this.dataItems))
      })
      .catch(error =>{
          console.log(error.response)
      })
    },
    searchItems(){
      this.loading = true
      axios.defaults.headers = {
        'Authorization': this.$store.state.token
      }
      axios.get('/suppliers/search?query='+this.search+'&pager.limit='+this.pagination.itemsPerPage+'&pager.page='+1)
      .then(response => {
          this.dataSuppliers = response.data
          this.loading = false
      })
      .catch(error =>{
          console.log(error.response)
      })
    },
  },
  mounted(){
    this.getItems()
    this.getItemsPage()
  },
  watch: {
    pagination: function(){
      this.getItemsPage()
    },
    search: function(){
      if(this.search.length>2){
        this.searchItemsTotal()
        this.searchItems()
      }
      if(this.search.length==0){
        this.getItems()
        this.getItemsPage()
      }
    }
  },
}
</script>
