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
        <v-card-title>
          Tambah Item
        </v-card-title>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
          <v-card-text>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Nama"
              required
            ></v-text-field>

            <v-text-field
              v-model="kode_barang"
              :rules="kodeRules"
              label="Kode Barang"
              required
            ></v-text-field>

            <v-text-field
              v-model="description"
              :rules="descriptionRules"
              label="Deskripsi"
              required
            ></v-text-field>
            <v-select
              v-model="select"
              :items="dataSelect"
              :rules="[v => !!v || 'Status harus diisi']"
              label="Unit"
              item-text="nama"
              item-value="id"
              required
            ></v-select>
            <br/>
            <div class="body-1">Kategori
            <v-divider/>
              <v-text-field
                label="Kategori"
                v-for="(tampilKategori, index) in banyakKategori"
                :key="tampilKategori.id"
                v-model="banyakKategori[index]"
                :rules="kategoriRules"
              ></v-text-field>
              <v-btn
                class="mt-1"
                  color="green"
                  dark
                  small
                  right
                  fab
                  @click="addKategori"
                >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              Tambah Kategori
              <v-btn
                class="mt-1"
                color="red"
                dark
                small
                right
                fab
                @click="deleteKategori"
                >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              Hapus Kategori
            </div>
            <br/>
            <div class="body-1">Gudang</div>
            <v-divider/>
            <v-card
            outlined
            style="max-height: 300px"
            class="overflow-y-auto"
            >
            <v-checkbox
              v-for="(tampilGudang, index) in dataGudang"
              v-model="checkboxGudang[index]"
              :label="tampilGudang.name"
              :value="tampilGudang.id"
              :key="tampilGudang.id"
              required
            >
            <template v-slot:append>
              <div class="ma-4">
                <v-text-field
                  label="Upper"
                  v-if="checkboxGudang[index]!=null"
                  v-model="upperGudang[index]"
                  :rules="[v => !isNaN(parseFloat(v)) && isFinite(v) || 'input disini menggunakan angka!']"
                ></v-text-field>
                <v-text-field
                  label="Under"
                  v-if="checkboxGudang[index]!=null"
                  v-model="underGudang[index]"
                  :rules="[v => !isNaN(parseFloat(v)) && isFinite(v) || 'input disini menggunakan angka!']"
                ></v-text-field>
                <v-text-field
                  label="Quantity"
                  v-if="checkboxGudang[index]!=null"
                  v-model="qtyGudang[index]"
                  :rules="[v => !isNaN(parseFloat(v)) && isFinite(v) || 'input disini menggunakan angka!']"
                ></v-text-field>
              </div>
            </template>
            </v-checkbox>
            </v-card>
            <div class="body-1">Supplier</div>
            <v-divider/>
            <v-card
            outlined
            style="max-height: 300px"
            class="overflow-y-auto"
            >
            <v-checkbox
              v-for="(tampilSuppliers, index) in dataSuppliers"
              v-model="checkboxSuppliers[index]"
              :label="tampilSuppliers.nama"
              :value="tampilSuppliers.id"
              :key="tampilSuppliers.id"
              required
            >
            <template v-slot:append>
              <div class="ma-4">
                <v-text-field
                label="Kode Barang Supplier"
                v-if="checkboxSuppliers[index]!=null"
                v-model="kodeSuppliers[index]"
                :rules="[v => !!v || 'Kode Barang Supplier harus diisi']"
                ></v-text-field>
                <v-text-field
                label="Nama Barang Supplier"
                v-if="checkboxSuppliers[index]!=null"
                v-model="namaSuppliers[index]"
                :rules="[v => !!v || 'Nama Barang Supplier harus diisi']"
                ></v-text-field>
                <v-text-field
                  label="Harga Max"
                  v-if="checkboxSuppliers[index]!=null"
                  v-model="maxSuppliers[index]"
                  :rules="[v => !isNaN(parseFloat(v)) && isFinite(v) || 'input disini menggunakan angka!']"
                ></v-text-field>
                <v-text-field
                  label="Harga Min"
                  v-if="checkboxSuppliers[index]!=null"
                  v-model="minSuppliers[index]"
                  :rules="[v => !isNaN(parseFloat(v)) && isFinite(v) || 'input disini menggunakan angka!']"
                ></v-text-field>
                <v-text-field
                  label="Harga Average"
                  v-if="checkboxSuppliers[index]!=null"
                  v-model="avgSuppliers[index]"
                  :rules="[v => !isNaN(parseFloat(v)) && isFinite(v) || 'input disini menggunakan angka!']"
                ></v-text-field>
              </div>
            </template>
            </v-checkbox>
          </v-card>
            <v-spacer></v-spacer>
            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'Anda harus setuju untuk melanjutkan!']"
              label="Apakah anda setuju ?"
              required
            ></v-checkbox>
          </v-card-text>
          <v-divider> </v-divider>
          <v-card-actions>
            <v-btn
              class="text-xs-right"
              color="warning"
              @click="kembali"
            >
              Kembali
            </v-btn>
            <v-spacer />
            <v-btn
              color="success"
              class="mr-4"
              @click="addItems"
            >
              Simpan
            </v-btn>
          </v-card-actions>
          </v-form>
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
          text: 'Tambah Item',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
      banyakKategori: [''],
      dataSuppliers: [],
      checkboxSuppliers: [],
      kodeSuppliers: [],
      namaSuppliers: [],
      maxSuppliers: [],
      minSuppliers: [],
      avgSuppliers: [],
      sup_ids: [],
      dataGudang: [],
      checkboxGudang: [],
      upperGudang: [],
      underGudang: [],
      qtyGudang: [],
      gudang_qty: [],
      select: null,
      dataSelect: [],
    valid: true,
    checkbox: false,
        kode_barang: '',
        kodeRules: [
          v => !!v || 'Kode Barang harus diisi',
        ],
        name: '',
        nameRules: [
          v => !!v || 'Nama harus diisi',
          //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        description: '',
        descriptionRules: [
          v => !!v || 'Deskripsi harus diisi',
        ],
        kategoriRules: [
          v => !!v || 'Kategori harus diisi',
        ],
        kategori: [],
  }),
  methods: {
    addKategori(){
      this.banyakKategori.push(
        ''
      )
    },
    deleteKategori(){
      this.banyakKategori.pop()
    },
    addItems(){
      if (this.$refs.form.validate()) {
        this.snackbar = true
        for(let i=0;i<this.checkboxGudang.length;i++){
          if(this.checkboxGudang[i]!=null){
            this.gudang_qty.push({
              gudang_id: this.checkboxGudang[i],
              upper: this.upperGudang[i],
              under: this.underGudang[i],
              qty: this.qtyGudang[i],
            })
          }
        }
        for(let i=0;i<this.checkboxSuppliers.length;i++){
          if(this.checkboxSuppliers[i]!=null){
            this.sup_ids.push({
              sup_id: this.checkboxSuppliers[i],
              harga_max: this.maxSuppliers[i],
              harga_min: this.minSuppliers[i],
              harga_avg: this.avgSuppliers[i],
              kode_barang_supplier: this.kodeSuppliers[i],
              nama_barang_supplier: this.namaSuppliers[i],
            })
          }
        }
        console.log(this.gudang_qty)
        axios.defaults.headers = {
          'Authorization': this.$store.state.token
        }
        axios.post('/items', {
          name: this.name,
          kode_barang: this.kode_barang,
          description: this.description,
          unit_id: this.select,
          categories: this.banyakKategori,
          loc_qty:{
            gudang_qty: this.gudang_qty
          },
          sup_ids:{
            sup_ids: this.sup_ids
          }
        })
        .then(response => {
          console.log(JSON.stringify(response.data))
          this.$router.back()
        })
        .catch(error =>{
            console.log(error.response)
        })
      }
    },
    kembali () {
      this.$router.back()
    },
  },
  mounted(){
    axios.defaults.headers = {
      'Authorization': this.$store.state.token
    }
    axios.post('/units/search', {
      query: "",
      pager: {
        limit: 100,
        page: 1
      },
    })
    .then(response => {
      console.log(JSON.stringify(response.data.units))
      this.dataSelect = response.data.units
    })
    .catch(error =>{
        console.log(error.response)
    })

    axios.get('/gudang')
    .then(response => {
      this.dataGudang = response.data.gudangs
    })
    .catch(error =>{
        console.log(error.response)
    })

    axios.get('/suppliers')
    .then(response => {
      this.dataSuppliers = response.data.suppliers
      console.log(this.dataSuppliers)
    })
    .catch(error =>{
        console.log(error.response)
    })
  },
  watch:{
    checkboxGudang: function(){
      console.log(this.checkboxGudang)
    }
  }
};
</script>
