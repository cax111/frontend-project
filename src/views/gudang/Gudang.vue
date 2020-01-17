<template>
  <v-app id="inspire">
    <!-- header -->
    <Header/>
    <!-- tutup header -->

    <v-content>
      <v-container>
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-forward</v-icon>
          </template>
        </v-breadcrumbs>
          <v-card>
            <v-card-title>
              <v-icon class="mr-2">mdi-warehouse</v-icon> Data Gudang
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
              :items="dataGudang.gudangs"
              :search="search"
              :loading="loading"
              :options.sync="pagination"
              :server-items-length="dataGudangLength"
            >
              <template v-slot:item.aksi="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" :to="'gudang/gudang-detail/'+dataGudang.gudangs[dataGudang.gudangs.indexOf(item)].id" v-on="on" class="ma-4"><v-icon>mdi-table-eye</v-icon></v-btn>
                  </template>
                  <span>Detail Gudang</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn color="error" @click="deleteGudang(dataGudang.gudangs[dataGudang.gudangs.indexOf(item)].id)" v-on="on" class="ma-4"><v-icon>mdi-delete-forever</v-icon></v-btn>
                  </template>
                  <span>Delete Data ?</span>
                </v-tooltip>
              </template>
            </v-data-table>
            <v-divider/>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" :to="'gudang/add-gudang'"><v-icon>mdi-plus</v-icon>Tambah Gudang</v-btn>
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
    items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          text: 'Gudang',
          disabled: true,
          href: '/show-accounts',
        },
      ],
    dataGudang : [],
    dataGudangLength : 0,
    dialog: false,
    drawer: null,
    search: '',
    pagination: {
      itemsPerPage: 5,
    },
        headers: [
          {
            text: 'Nama Gudang',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Alamat', value: 'alamat' },
          { text: 'Status', value: 'status' },
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
      axios.get('/gudang')
      .then(response => {
          this.dataGudangLength =  response.data.gudangs.length
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
      axios.get('/gudang?limit='+this.pagination.itemsPerPage+'&page='+this.pagination.page)
      .then(response => {
          this.dataGudang = response.data
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
      axios.get('/gudang/search?query='+this.search+'&pager.limit='+100+'&pager.page='+1)
      .then(response => {
          this.dataGudangLength =  response.data.gudangs.length
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
      axios.get('/gudang/search?query='+this.search+'&pager.limit='+this.pagination.itemsPerPage+'&pager.page='+1)
      .then(response => {
          this.dataGudang = response.data
          this.loading = false
      })
      .catch(error =>{
          console.log(error.response)
      })
    },
    deleteGudang(id){
      var hapus = confirm("Apakah anda yakin akan menghapus gudang ini ?");
      if(hapus){
        this.$router.push("gudang/delete-gudang/"+id)
        console.log(id)
      }else{
        alert("Anda batal menghapus gudang...")
      }
    }
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
