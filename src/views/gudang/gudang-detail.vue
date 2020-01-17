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
              <v-list-item-title class="headline">{{ dataGudang.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ dataGudang.alamat }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn color="warning"  :to="'/gudang/edit-gudang/'+dataGudang.id" v-on="on" class="ma-4"><v-icon>mdi-tooltip-edit</v-icon></v-btn>
              </template>
              <span>Edit Data ?</span>
            </v-tooltip>
          </v-list-item>
            <v-card-title>
              Items
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="dataItems"
                :search="search"
              >
              </v-data-table>
            </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="warning" :to="'/gudang'">Kembali</v-btn>
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
          text: 'Gudang',
          disabled: false,
          href: '/gudang',
        },
        {
          text: 'Detail Gudang',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    dataGudang : [],
    dataItems : [],
    dialog: false,
    drawer: null,
    search: '',
        headers: [
          {
            text: 'Nama Item',
            align: 'left',
            sortable: false,
            value: 'nama_item',
          },
          { text: 'Under', value: 'under' },
          { text: 'Upper', value: 'upper' },
          {
            text: 'Qty',
            align: 'left',
            sortable: false,
            value: 'qty',
          },
        ],
  }),
  methods: {
  },
  mounted(){
    axios.defaults.headers = {
      'Authorization': localStorage.getItem('access_token')
    }
    axios.get('/gudang/'+this.$route.params.id)
    .then(response => {
        this.dataGudang = response.data
        this.dataItems = this.dataGudang.inventory
        console.log(JSON.stringify(response.data))
    })
    .catch(error =>{
        console.log(error.response)
    })
  }
};
</script>
