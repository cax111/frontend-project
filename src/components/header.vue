<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <template v-slot:prepend>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">{{ dataUser.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ dataUser.role }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item-content class='ml-6' v-if="dataUser.role==='USER'">
            <v-list-item-subtitle>{{ dataUser.email }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-group
          v-else
          >
            <template v-slot:activator>
              <v-list-item
                two-line
                @click="show = !show"
              >
              <v-list-item-content>
                <v-list-item-title>User Panel</v-list-item-title>
                <v-list-item-subtitle>{{ dataUser.email }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-list-item-action>
              </v-list-item>
            </template>
            <v-list-item :to="'/show-accounts/edit-account/'+dataUser.id">
              <v-list-item-content>
                <v-list-item-title><v-icon>mdi-tooltip-edit</v-icon> Edit User</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="'/show-accounts/edit-password-account/'+dataUser.id">
              <v-list-item-content>
                <v-list-item-title><v-icon>mdi-tooltip-edit</v-icon> Ganti Password</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </template>

      <v-divider></v-divider>
      <v-list dense>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
            :to="item.link"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Dashboard Administrasi</span>
        <span class="hidden-md-and-up ml-6">Dashboard Administrasi</span>
      </v-toolbar-title>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" :to="'/logout'" v-on="on"><v-icon>mdi-logout</v-icon></v-btn>
        </template>
        <span>Logout ?</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Header',
  data: () => ({
    show: false,
    dialog: false,
    drawer: null,
    dataUser: [],
    items: [
      { icon: 'mdi-home', link: '/', role: '', text: 'Dashboard' },
      { icon: 'mdi-warehouse', link: '/gudang', role: '', text: 'Gudang' },
      { icon: 'mdi-home-city-outline', link: '/suppliers', role: '', text: 'Supplier' },
      { icon: 'mdi-dropbox', link: '/items', text: 'Barang' },
      { icon: 'mdi-truck-fast-outline', link: '/orders', text: 'Pengambilan Barang' },
      { icon: 'mdi-account-group', link: '/show-accounts', role: 'USER', text: 'Manajemen User' },
      { icon: 'mdi-settings', link: '/units', role: 'USER', text: 'Pengaturan Satuan' },
      { icon: 'mdi-file-document-box-multiple-outline', link: '/rekap', text: 'Rekap' },
      // {
      //   icon: 'mdi-chevron-up',
      //   'icon-alt': 'mdi-chevron-down',
      //   text: 'Labels',
      //   model: true,
      //   children: [
      //     { icon: 'mdi-plus', link: '', text: 'Create label' },
      //   ],
      // },
      // {
      //   icon: 'mdi-chevron-up',
      //   'icon-alt': 'mdi-chevron-down',a
      //   text: 'More',
      //   model: false,
      //   children: [
      //     { text: 'Import' },
      //     { text: 'Export' },
      //     { text: 'Print' },
      //     { text: 'Undo changes' },
      //     { text: 'Other contacts' },
      //   ],
      // },
    ],
  }),
  // methods: {
  // },
  mounted(){
    if(!window.localStorage.getItem('last_login') || !window.localStorage.getItem('getIdUser') || !window.localStorage.getItem('role') || !window.localStorage.getItem('access_token')){
      window.location.href = "/logout";
    }
    const last_login = new Date(window.localStorage.getItem('last_login'))
    let batas_login = new Date(last_login)
    const now_login = new Date()
    batas_login = new Date(batas_login.setMinutes((last_login.getMinutes() + 20)))
    if(now_login > batas_login){
      alert("Sesi anda telah berakhir, silakan login kembali...");
      window.location.href = "/logout";
    }
    for(let i=0;i<this.items.length;i++){
      if(this.items[i].role === window.localStorage.getItem('role')){
        this.items.splice(i, 1);
      }
    }
    axios.get('/users/'+window.localStorage.getItem('getIdUser'))
    .then(response => {
        this.dataUser = response.data;
        //console.log(JSON.stringify(response.data))
    })
    .catch(error =>{
        console.log(error.response);
    })
  }
};
</script>
