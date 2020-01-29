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
              <v-icon class="mr-2">mdi-account-group</v-icon> Data Users
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
              :items="showDataUsers"
              :search="search"
              class="elevation-1"
            >
              <template v-slot:item.aksi="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn color="warning" :to="'show-accounts/edit-account/'+showDataUsers[showDataUsers.indexOf(item)].id" v-on="on" class="ma-4"><v-icon>mdi-tooltip-edit</v-icon></v-btn>
                  </template>
                  <span>Edit Data ?</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn color="warning" :to="'show-accounts/edit-password-account/'+showDataUsers[showDataUsers.indexOf(item)].id" v-on="on" class="ma-4"><v-icon>mdi-textbox-password</v-icon></v-btn>
                  </template>
                  <span>Ganti Password ?</span>
                </v-tooltip>
                <v-tooltip bottom v-if="role === 'SUPERADMIN'">
                  <template v-slot:activator="{ on }">
                    <v-btn color="error" @click="deleteAkun(showDataUsers[showDataUsers.indexOf(item)].id)" v-on="on" class="ma-4"><v-icon>mdi-delete-forever</v-icon></v-btn>
                  </template>
                  <span>Delete Data ?</span>
                </v-tooltip>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="success"
                class="ma-2"
                :to="'show-accounts/add-account'"
              >
                <v-icon
                class="mr-2"
                >
                  mdi-plus
                </v-icon>
                Tambah User
              </v-btn>
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
          text: 'Kelola Akun',
          disabled: true,
          href: '/show-accounts',
        },
      ],
    dataUsers : [],
    showDataUsers : [],
    role : null,
    dialog: false,
    drawer: null,
    search: '',
        headers: [
          {
            text: 'Nama',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Email', value: 'email' },
          { text: 'No. Telp', value: 'phone' },
          { text: 'Role', value: 'role' },
          {
            text: 'Aksi',
            align: 'left',
            sortable: false,
            value: 'aksi',
          },
        ],
  }),
  methods: {
    deleteAkun(id){
      var hapus = confirm("Apakah anda yakin akan menghapus akun ini ?");
      if(hapus){
        console.log(id)
        this.$router.push("show-accounts/delete-account/"+id)
      }else{
        alert("Anda batal menghapus akun...")
      }
    }
  },
  mounted(){
    this.role = window.localStorage.getItem('role')
    axios.get('/users')
    .then(response => {
        this.dataUsers = response.data
      //  console.log(JSON.stringify(response.data))
        for(let i =0;i < this.dataUsers.users.length;i++){
          if(this.role === "ADMIN"){
            if(this.dataUsers.users[i].role != "SUPERADMIN" && this.dataUsers.users[i].role != "ADMIN"){
              this.showDataUsers.push(this.dataUsers.users[i]);
            }
          }else{
            if(this.dataUsers.users[i].role != "SUPERADMIN"){
              this.showDataUsers.push(this.dataUsers.users[i]);
            }
          }
        }
    })
    .catch(error =>{
        console.log(error.response)
    })
  }
};
</script>
