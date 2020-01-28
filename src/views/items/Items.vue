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
              <v-icon class="mr-2">mdi-dropbox</v-icon> Data Items
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
              :options.sync="pagination"
              :items="dataItems"
              :server-items-length="dataItemsLength"
              :search="search"
              :loading="loading"
            >
              <template v-slot:item.aksi="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" :to="'items/item-detail/'+dataItems[dataItems.indexOf(item)].id" v-on="on" class="ma-4"><v-icon>mdi-table-eye</v-icon></v-btn>
                  </template>
                  <span>Detail Items</span>
                </v-tooltip>
              </template>
            </v-data-table>
            <v-divider/>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" :to="'items/add-item'"><v-icon>mdi-plus</v-icon>Tambah Item</v-btn>
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
    loading: true,
    pagination: {
      itemsPerPage: 5,
    },
    dataItems : [],
    dataItemsLength : null,
    dialog: false,
    drawer: null,
    items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          text: 'Items',
          disabled: true,
          href: '/items',
        },
      ],
    search: '',
        headers: [
          {
            text: 'Kode Item',
            sortable: false,
            value: 'kode_barang'
          },
          {
            text: 'Nama Item',
            value: 'name',
          },
          { text: 'Deskripsi', value: 'description' },
          {
            text: 'Aksi',
            sortable: false,
            value: 'aksi',
          },
        ],
  }),
  methods: {
    getItems(){
      this.loading = true
      axios.defaults.headers = {
        'Authorization': localStorage.getItem('access_token')
      }
      axios.get('/items')
      .then(response => {
          this.dataItemsLength =  response.data.items.length
      })
      .catch(error =>{
          console.log(error.response)
      })
    },
    getItemsPage(){
      this.loading = true
      axios.defaults.headers = {
        'Authorization': localStorage.getItem('access_token')
      }
      axios.get('/items?limit='+this.pagination.itemsPerPage+'&page='+this.pagination.page)
      .then(response => {
          this.dataItems =  response.data.items
          this.loading = false
      })
      .catch(error =>{
          console.log(error.response)
      })
    },
    searchItemsTotal(){
      this.loading = true
      axios.defaults.headers = {
        'Authorization': localStorage.getItem('access_token')
      }
      axios.post('/items/search', {
        query: this.search,
        pager: {
            limit: 100,
            page: 1
        }
      })
      .then(response => {
          this.dataItemsLength =  response.data.items.length
      })
      .catch(error =>{
          console.log(error.response)
      })
    },
    searchItems(){
      this.loading = true
      axios.defaults.headers = {
        'Authorization': localStorage.getItem('access_token')
      }
      axios.post('/items/search', {
        query: this.search,
        pager: {
            limit: this.pagination.itemsPerPage,
            page: 1
        }
      })
      .then(response => {
          this.dataItems =  response.data.items
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

};
</script>
