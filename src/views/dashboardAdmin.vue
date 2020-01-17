<template>
  <v-app id="inspire">
    <!-- header -->
    <Header/>
    <!-- tutup header -->

    <v-content>
      <v-container>
        <v-row dense>
          <v-card max-width="400px">
            <v-card-title>
              <v-icon
                large
                left
              >
                mdi-truck
              </v-icon>
              <span class="title font-weight-light">Pengiriman Hari ini</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-row
                  align="center"
                  justify="end"
                >
                  <v-icon class="mr-1">mdi-heart</v-icon>
                  <span class="subheading mr-2">256</span>
                  <span class="mr-1">·</span>
                  <v-icon class="mr-1">mdi-share-variant</v-icon>
                  <span class="subheading">45</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
          <v-card max-width="400px">
            <v-card-title>
              <v-icon
                large
                left
              >
                mdi-truck
              </v-icon>
              <span class="title font-weight-light">Pengiriman Hari ini</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-row
                  align="center"
                  justify="end"
                >
                  <v-icon class="mr-1">mdi-heart</v-icon>
                  <span class="subheading mr-2">256</span>
                  <span class="mr-1">·</span>
                  <v-icon class="mr-1">mdi-share-variant</v-icon>
                  <span class="subheading">45</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
          <v-card max-width="400px">
            <v-card-title>
              <v-icon
                large
                left
              >
                mdi-truck
              </v-icon>
              <span class="title font-weight-light">Pengiriman Hari ini</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-row
                  align="center"
                  justify="end"
                >
                  <v-icon class="mr-1">mdi-heart</v-icon>
                  <span class="subheading mr-2">256</span>
                  <span class="mr-1">·</span>
                  <v-icon class="mr-1">mdi-share-variant</v-icon>
                  <span class="subheading">45</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
          <v-card max-width="400px">
            <v-card-title>
              <v-icon
                large
                left
              >
                mdi-truck
              </v-icon>
              <span class="title font-weight-light">Pengiriman Hari ini</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-row
                  align="center"
                  justify="end"
                >
                  <v-icon class="mr-1">mdi-heart</v-icon>
                  <span class="subheading mr-2">256</span>
                  <span class="mr-1">·</span>
                  <v-icon class="mr-1">mdi-share-variant</v-icon>
                  <span class="subheading">45</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/header.vue";

export default {
  name: "homeAdmin",
  components: {
    Header
  },
  data: () => ({
    dialog: false,
    drawer: null,
    search: '',
  }),
  methods: {
  }
};
</script>
