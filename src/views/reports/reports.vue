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
                <v-icon class="mr-2">mdi-truck-fast-outline</v-icon> Data Rekap
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
              :items="dataOrders.rekap"
              :search="search"
            >
              <template v-slot:item.aksi="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" :to="'orders/order-detail/'+dataOrders.rekap[dataOrders.rekap.indexOf(item)].id" v-on="on" class="ma-4"><v-icon>mdi-table-eye</v-icon></v-btn>
                  </template>
                  <span>Detail Order</span>
                </v-tooltip>
              </template>
            </v-data-table>
            <v-divider/>
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
          text: 'Order',
          disabled: true,
          href: '/show-accounts',
        },
      ],
    dataOrders : [],
    dataOrdersLength : 0,
    dialog: false,
    drawer: null,
    search: '',
    pagination: {
      itemsPerPage: 5,
    },
        headers: [
          {
            text: 'Keperluan',
            align: 'left',
            sortable: false,
            value: 'keperluan',
          },
          { text: 'Keterangan', value: 'note' },
          { text: 'Pengirim', value: 'pj.name' },
          { text: 'Penerima', value: 'penerima.name' },
          { text: 'Acc Status', value: 'acc_status' },
          { text: 'Delivery Status', value: 'delivery_status' },
          {
            text: 'Aksi',
            align: 'left',
            sortable: false,
            value: 'aksi',
          },
        ],
  }),
  methods: {
    getItemsPage(){
      this.loading = true
      axios.get('/rekap/ambil?pager.limit='+100+'&pager.page='+1)
      .then(response => {
          this.dataOrders = response.data
          this.loading = false
          console.log(this.dataOrders)
      })
      .catch(error =>{
          console.log(error.response)
      })
    },
  },
  mounted(){
    this.getItemsPage()
  },
};
</script>
