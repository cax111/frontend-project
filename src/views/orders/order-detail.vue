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
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">{{ dataItems.keperluan }}</v-list-item-title>
              <v-list-item-subtitle>Tracking ID : {{ dataItems.tracking_id }}</v-list-item-subtitle>
              <v-list-item-subtitle>Catatan : {{ dataItems.note }}</v-list-item-subtitle>
              <v-list-item-subtitle>Status Konfirmasi : {{ dataItems.confirmation }}</v-list-item-subtitle>
              <v-list-item-subtitle>Tipe Order : {{ dataItems.tipe_order }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-spacer/>
            <v-dialog
                v-model="dialog2"
                width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                  color="yellow darken-3"
                  dark
                  v-on="on"
                  text
                  >
                  <v-icon large>
                    mdi-tooltip-edit
                  </v-icon>
                  </v-btn>
                </template>

                  <v-card>
                    <v-card-title
                    class="headline yellow darken-3 white--text"
                    primary-title
                    >
                    Update Status ACC
                  </v-card-title>

                  <v-card-text class="mt-4">
                    <v-select
                    :items="status2"
                    label="Status Pengiriman"
                    v-model="statusPilih2"
                    :rules="[v => !!v || 'Status harus diisi']"
                    ></v-select>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    color="primary"
                    text
                    @click="gantiStatusACC"
                    >
                    Update
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
              <v-row>
                <v-col
                  cols="6"
                >
                <v-dialog
                  v-model="dialog2"
                  width="500"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="yellow darken-3"
                      dark
                      v-on="on"
                    >
                      Update Status
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title
                      class="headline yellow darken-3 white--text"
                      primary-title
                    >
                      Update Status ACC
                    </v-card-title>

                    <v-card-text class="mt-4">
                      <v-select
                        :items="status2"
                        label="Status Pengiriman"
                        v-model="statusPilih2"
                        :rules="[v => !!v || 'Status harus diisi']"
                      ></v-select>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="gantiStatusACC"
                      >
                        Update
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                </v-col>
              </v-row>
            </v-list-item-content>
            <v-spacer/>
            <v-list-item-content>
                <v-list-item-title class="title">Status Delivery</v-list-item-title>
                <v-list-item-subtitle>{{dataItems.delivery_status}}</v-list-item-subtitle>
                <v-row>
                  <v-col
                    cols="6"
                  >
                  <v-dialog
                    v-model="dialog1"
                    width="500"
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="yellow darken-3"
                        v-on="on"
                        dark
                      >
                        Update Status
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title
                        class="headline yellow darken-3 white--text"
                        primary-title
                      >
                        Update Status Pengiriman
                      </v-card-title>

                      <v-card-text class="mt-4">
                        <v-select
                          :items="status1"
                          label="Status Pengiriman"
                          v-model="statusPilih1"
                          :rules="[v => !!v || 'Status harus diisi']"
                        ></v-select>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="gantiStatusPengiriman"
                        >
                          Update
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-col>
                </v-row>
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
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">Dikirim Pada</v-list-item-title>
              <v-list-item-subtitle v-if="new Date(dataItems.arrived_at).getFullYear()==1">Belum Dikirim.</v-list-item-subtitle>
              <v-list-item-subtitle v-else>{{gantiFormatDate(new Date(dataItems.delivered_at))}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-spacer/>
            <v-list-item-content>
              <v-list-item-title class="title">Diterima Pada</v-list-item-title>
              <v-list-item-subtitle v-if="dataItems.delivered_at>dataItems.arrived_at">Belum Sampai.</v-list-item-subtitle>
              <v-list-item-subtitle v-else-if="new Date(dataItems.arrived_at).getFullYear()==1">Belum Dikirim.</v-list-item-subtitle>
              <v-list-item-subtitle v-else>{{gantiFormatDate(new Date(dataItems.arrived_at))}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">Items Order</v-list-item-title>
                <v-data-table
                  :headers="headers"
                  :items="dataOrderItems"
                  :search="search"
                >
                </v-data-table>
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
import moment from 'moment';

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
    status1: ['DELIVERY_CANCELLED', 'DELIVERY_PROCESSED', 'DELIVERY_SENT', 'DELIVERY_ARRIVED'],
    statusPilih1: '',
    status2: ['ORDER_CANCELLED', 'ORDER_PENDING', 'ORDER_ACC'],
    statusPilih2: '',
    dataItems : [],
    dataOrderItems : [],
    dataPengirim : [],
    dataPenerima : [],
    dataGudangPengirim : [],
    dataGudangPenerima : [],
    dataSupplier : [],
    categoriesLength : null,
    dialog1: false,
    dialog2: false,
    drawer: null,
    search: '',
    search2: '',
        headers: [
          {
            text: 'Nama Item',
            value: 'item_name',
          },
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
    gantiFormatDate(date){
      moment.locale('id');
      return moment(date).format('LLLL');
    },
    gantiStatusPengiriman(){
      axios.put('/stok/'+this.$route.params.id,{
        delivery_status: this.statusPilih1,
      })
      .then(response => {
          console.log(response.data);
          window.location.reload();
      })
      .catch(error =>{
          console.log(error.response);
      })
    },
    gantiStatusACC(){
      axios.put('/stok/'+this.$route.params.id,{
        acc_status: this.statusPilih2,
      })
      .then(response => {
          console.log(response.data);
          window.location.reload();
      })
      .catch(error =>{
          console.log(error.response);
      })
    },
  },
  mounted(){
    axios.get('/stok/'+this.$route.params.id)
    .then(response => {
        this.dataItems = response.data
        this.dataOrderItems = response.data.order_items.order_items
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
