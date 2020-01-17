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
              <v-list-item-title class="headline">{{ dataItems.keperluan }}</v-list-item-title>
              <v-list-item-subtitle>{{ dataItems.note }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="title">Penerima</v-list-item-title>
              <v-list-item-subtitle>{{ dataPenerima.name }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ dataPenerima.email }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ dataPenerima.phone }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-spacer/>
            <v-list-item-content>
              <v-list-item-title class="title">Pengirim</v-list-item-title>
              <v-list-item-subtitle>{{ dataPengirim.name }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ dataPengirim.email }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ dataPengirim.phone }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">Status ACC</v-list-item-title>
              <v-list-item-subtitle>{{dataItems.acc_status}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-spacer/>
            <v-list-item-content>
              <v-list-item-title class="title">Status Delivery</v-list-item-title>
              <v-list-item-subtitle>{{dataItems.delivery_status}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">Gudang Pengirim</v-list-item-title>
              <v-list-item-subtitle>{{dataGudangPengirim.name}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{dataGudangPengirim.alamat}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{dataGudangPengirim.status}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-spacer/>
            <v-list-item-content>
              <v-list-item-title class="title">Gudang Penerima</v-list-item-title>
              <v-list-item-subtitle>{{dataGudangPenerima.name}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{dataGudangPenerima.alamat}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{dataGudangPenerima.status}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>

          <v-card-actions>
            <v-btn color="warning" :to="'/orders'">Kembali</v-btn>
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
          text: 'Orders',
          disabled: false,
          href: '/orders',
        },
        {
          text: 'Order Detail',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    dataItems : [],
    dataPengirim : [],
    dataPenerima : [],
    dataGudangPengirim : [],
    dataGudangPenerima : [],
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
      'Authorization': this.$store.state.token
    }
    axios.get('/stok/'+this.$route.params.id)
    .then(response => {
        this.dataItems = response.data
        this.dataPengirim = this.dataItems.pj
        this.dataPenerima = this.dataItems.penerima
        this.dataGudangPengirim = this.dataItems.gdg_sender
        this.dataGudangPenerima = this.dataItems.gdg_rec
        //this.dataGudang = response.data.loc_qty.gudang_qty
        //this.dataSupplier = response.data.sup_ids.sup_ids
        //this.categoriesLength = this.dataItems.categories.length
        console.log(this.dataItems)
    })
    .catch(error =>{
        console.log(error.response)
    })
  }
};
</script>
