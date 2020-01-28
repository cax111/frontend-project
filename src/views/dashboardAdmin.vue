<template>
  <v-app id="inspire">
    <!-- header -->
    <Header/>
    <!-- tutup header -->

    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="3">
            <v-card color="blue lighten-4">
              <v-card-title>
                <v-icon
                  large
                  left
                >
                  mdi-truck
                </v-icon>
                <span class="title font-weight-light">Pengiriman</span>
              </v-card-title>
              <v-divider/>
              <v-card-text class="headline font-weight-bold">
                <div class="display-2" align="center">
                  {{pengirimanHariIni}}
                </div>
                <div class="heading" align="center">
                  Pengiriman
                </div>
                <!-- "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well." -->
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-row
                    align="center"
                  >
                    <v-icon class="mr-1">mdi-clock</v-icon>
                    <span class="subheading mr-2 mt-1">24 Jam Terakhir pada {{tanggal}}</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="3">
            <v-card color="green lighten-4">
              <v-card-title>
                <v-icon
                  large
                  left
                >
                  mdi-account-group
                </v-icon>
                <span class="title font-weight-light">Pengguna</span>
              </v-card-title>
              <v-divider/>
              <v-card-text class="headline font-weight-bold">
                <div class="display-2" align="center">
                  {{dataUsers.length}}
                </div>
                <div class="heading" align="center">
                  Pengguna
                </div>
                <!-- "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well." -->
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-row
                    align="center"
                  >
                    <v-icon class="mr-1">mdi-clock</v-icon>
                    <span class="subheading mr-2 mt-1">Dalam 24 Jam</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="3">
            <v-card color="red lighten-4">
              <v-card-title>
                <v-icon
                  large
                  left
                >
                  mdi-account-group
                </v-icon>
                <span class="title font-weight-light">Pengguna</span>
              </v-card-title>
              <v-divider/>
              <v-card-text class="headline font-weight-bold">
                <div class="display-2" align="center">
                  {{dataUsers.length}}
                </div>
                <div class="heading" align="center">
                  Pengguna
                </div>
                <!-- "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well." -->
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-row
                    align="center"
                  >
                    <v-icon class="mr-1">mdi-clock</v-icon>
                    <span class="subheading mr-2 mt-1">Dalam 24 Jam</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="3">
            <v-card color="yellow lighten-4">
              <v-card-title>
                <v-icon
                  large
                  left
                >
                  mdi-account-group
                </v-icon>
                <span class="title font-weight-light">Pengguna</span>
              </v-card-title>
              <v-divider/>
              <v-card-text class="headline font-weight-bold">
                <div class="display-2" align="center">
                  {{dataUsers.length}}
                </div>
                <div class="heading" align="center">
                  Pengguna
                </div>
                <!-- "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well." -->
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-row
                    align="center"
                  >
                    <v-icon class="mr-1">mdi-clock</v-icon>
                    <span class="subheading mr-2 mt-1">Dalam 24 Jam</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="4">
            <v-card>
              <v-card-title>
                <v-icon
                  large
                  left
                >
                  mdi-truck
                </v-icon>
                <span class="title font-weight-light">Pengiriman</span>
              </v-card-title>
              <v-divider/>
              <v-card-text class="headline font-weight-bold">
                <div class="display-2" align="center">
                  {{pengirimanHariIni}}
                </div>
                <div class="heading" align="center">
                  Pengiriman
                </div>
                <!-- "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well." -->
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-row
                    align="center"
                  >
                    <v-icon class="mr-1">mdi-clock</v-icon>
                    <span class="subheading mr-2 mt-1">24 Jam Terakhir pada {{tanggal}}</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="4">
            <v-card>
              <v-card-title>
                <v-icon
                  large
                  left
                >
                  mdi-account-group
                </v-icon>
                <span class="title font-weight-light">Pengguna</span>
              </v-card-title>
              <v-divider/>
              <v-card-text class="headline font-weight-bold">
                <div class="display-2" align="center">
                  {{dataUsers.length}}
                </div>
                <div class="heading" align="center">
                  Pengguna
                </div>
                <!-- "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well." -->
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-row
                    align="center"
                  >
                    <v-icon class="mr-1">mdi-clock</v-icon>
                    <span class="subheading mr-2 mt-1">Dalam 24 Jam</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="4">
            <v-card>
              <v-card-title>
                <v-icon
                  large
                  left
                >
                  mdi-account-group
                </v-icon>
                <span class="title font-weight-light">Pengguna</span>
              </v-card-title>
              <v-divider/>
              <v-card-text class="headline font-weight-bold">
                <div class="display-2" align="center">
                  {{dataUsers.length}}
                </div>
                <div class="heading" align="center">
                  Pengguna
                </div>
                <!-- "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well." -->
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-row
                    align="center"
                  >
                    <v-icon class="mr-1">mdi-clock</v-icon>
                    <span class="subheading mr-2 mt-1">Dalam 24 Jam</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/header.vue";
import axios from 'axios';
import moment from 'moment';
moment.locale('id');

export default {
  name: "homeAdmin",
  components: {
    Header
  },
  data: () => ({
    tampilReport: ['a','b','c','d'],
    dataOrders: [],
    dataUsers: [],
    dialog: false,
    drawer: null,
    search: '',
    pengirimanHariIni: null,
    tanggal: null,
  }),
  methods: {
    dataAccounts(){
      axios.get('/users')
      .then(response => {
          this.dataUsers = response.data.users;
          this.loading = false;
          console.log(this.dataUsers);
      })
      .catch(error =>{
          console.log(error.response);
      })
    },
    dataReport(){
      axios.get('/rekap/ambil?pager.limit='+100+'&pager.page='+1)
      .then(response => {
          this.dataOrders = response.data;
          for(let i=0;i<this.dataOrders.rekap.length;i++){
            let a = new Date(this.dataOrders.rekap[i].created_at);
            let b = a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();
            let c = new Date();
            let d = c.getFullYear()+"-"+(c.getMonth()+1)+"-"+c.getDate();
            this.tanggal = moment().format('Do MMMM YYYY');
            console.log(b);
            console.log(d);
            if(b===d){
              this.pengirimanHariIni++;
            }else{
              this.pengirimanHariIni = 0;
            }
          }
          this.loading = false;
          console.log(this.dataOrders);
      })
      .catch(error =>{
          console.log(error.response);
      })
    }
  },
  mounted(){
    this.dataReport();
    this.dataAccounts();
  }
};
</script>
