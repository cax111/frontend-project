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
              <v-icon class="mr-2">mdi-account-group</v-icon> Pengaturan Satuan
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
              :items="dataUnits"
              :search="search"
              class="elevation-1"
            >
              <template v-slot:item.no="{ item }">
                <div>{{(dataUnits.indexOf(item)+1)}}</div>
              </template>
              <template v-slot:item.aksi="{ item }">
                <v-btn color="warning" dark text class="ma-2" @click="edit(dataUnits[dataUnits.indexOf(item)])">
                  Edit Unit
                </v-btn>
                <v-btn color="red" dark text class="ma-2" @click="deleteUnit(dataUnits[dataUnits.indexOf(item)].id)">
                  Hapus Unit
                </v-btn>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-spacer />
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="success" dark class="ma-2" v-on="on">
                    <v-icon>
                    mdi-plus
                  </v-icon>
                  Tambah Unit
                </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Input Satuan</span>
                  </v-card-title>
                  <v-divider/>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
                      >
                      <v-layout wrap>
                        <v-flex xs12 sm12 md12>
                          <v-text-field v-model="namaInput" :rules="[v => !!v || 'Nama harus diisi']" label="Nama"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" v-if="id.length===0" text @click="addUnit">Simpan</v-btn>
                    <v-btn color="yellow darken-1" v-else text @click="editUnit">Edit</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
          text: 'Pengaturan Satuan',
          disabled: true,
          href: '/show-accounts',
        },
      ],
    dataUnits : [],
    showDataUsers : [],
    role : null,
    dialog: false,
    dialog2: false,
    valid: true,
    valid2: true,
    drawer: null,
    id: '',
    namaInput: '',
    search: '',
        headers: [
          {
            text: 'No',
            align: 'left',
            value: 'no',
            width: 100,
          },
          {
            text: 'ID',
            align: 'left',
            sortable: false,
            value: 'id',
            width: 300,
          },
          {
            text: 'Nama',
            align: 'left',
            value: 'nama',
            width: 400,
          },
          {
            text: 'Aksi',
            align: 'left',
            sortable: false,
            value: 'aksi',
            width: 300,
          },
        ],
  }),
  methods: {
    addUnit(){
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        axios.post('/units', {
          nama: this.namaInput,
        })
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.showUnit();
          this.dialog = false;
          this.$refs.form.reset();
        })
        .catch(error =>{
            console.log(error.response);
        })
      }
    },
    edit(data){
      this.id = data.id;
      this.namaInput = data.nama;
      this.dialog = true;
      console.log(data);
    },
    editUnit(){
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        axios.put('/units/'+this.id, {
          nama: this.namaInput,
        })
        .then(response => {
          console.log(response.data);
          this.showUnit();
          this.dialog = false;
          this.$refs.form.reset();
        })
        .catch(error =>{
            console.log(error.response);
        })
      }
    },
    deleteUnit(id){
      var hapus = confirm("Apakah anda yakin akan menghapus unit ini ?");
      if(hapus){
        console.log(id)
        axios.delete('/units/'+id)
        .then(response => {
          console.log(response.data);
          this.showUnit();
        })
        .catch(error =>{
            console.log(error.response);
            alert("Anda gagal menghapus unit...")
        })
      }else{
        alert("Anda batal menghapus unit...")
      }
    },
    showUnit(){
      axios.post('/units/search',{
        query: "",
        pager: {
          limit: 100,
          page: 1
        }
      })
      .then(response => {
          this.dataUnits = response.data.units;
      })
      .catch(error =>{
          console.log(error.response);
      })
    }
  },
  mounted(){
    this.showUnit();
  },
  watch: {
  dialog: function(){
    if(this.dialog===false){
      this.id='';
    }
  }
  }
};
</script>
