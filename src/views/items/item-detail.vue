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
        <v-card
          class="mx-auto"
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">{{ dataItems.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ dataItems.kode_barang }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="title">Kategori</v-list-item-title>
              <v-list-item-subtitle v-if="categoriesLength===0">Tidak ada data</v-list-item-subtitle>
              <v-list-item-subtitle v-for="item in dataItems.categories" :key="item.u">{{ item }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
            <v-card-title>
              Lokasi Gudang
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search1"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="dataGudang"
                :search="search1"
              >
              </v-data-table>
            </v-card-text>
          <v-divider></v-divider>
            <v-card-title>
              Suppliers
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search2"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers2"
                :items="dataSupplier"
                :search="search2"
              >
              </v-data-table>
            </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="warning" :to="'/items'">Kembali</v-btn>
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
          text: 'Items',
          disabled: false,
          href: '/items',
        },
        {
          text: 'Item Detail',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    dataItems : [],
    dataGudang : [],
    dataSupplier : [],
    categoriesLength : null,
    dialog: false,
    drawer: null,
    search1: '',
    search2: '',
        headers: [
          {
            text: 'Nama Gudang',
            value: 'nama_gudang',
          },
          { text: 'Under', value: 'under' },
          { text: 'Upper', value: 'upper' },
          {
            text: 'Qty',
            value: 'qty',
          },
        ],
        headers2: [
          {
            text: 'Nama Supplier',
            value: 'nama_supplier',
          },
          {
            text: 'Kode Barang Supplier',
            value: 'kode_barang_supplier',
          },
          {
            text: 'Nama Barang Supplier',
            value: 'nama_barang_supplier',
          },
          { text: 'Harga Min', value: 'harga_min' },
          { text: 'Harga Max', value: 'harga_max' },
          { text: 'Harga Avg', value: 'harga_avg' },
        ],
  }),
  methods: {
  },
  mounted(){
    axios.defaults.headers = {
      'Authorization': localStorage.getItem('access_token')
    }
    axios.get('/items/'+this.$route.params.id)
    .then(response => {
        this.dataItems = response.data
        this.dataGudang = response.data.loc_qty.gudang_qty
        this.dataSupplier = response.data.sup_ids.sup_ids
        this.categoriesLength = this.dataItems.categories.length
        console.log(JSON.stringify(this.dataItems))
    })
    .catch(error =>{
        console.log(error.response)
    })
  }
};
</script>
