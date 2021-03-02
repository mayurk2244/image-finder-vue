<template>
  <v-card shaped>
    <v-hover v-slot:default="{ hover }">
      <v-img
        @click="openImage(imgDetails)"
        :lazy-src="imgDetails.previewURL"
        :src="imgDetails.previewURL"
        class="white--text align-end pointer"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
        <v-fade-transition>
          <v-card-title class="card-title-text" v-if="hover">{{
            imgDetails.tags
          }}</v-card-title>
        </v-fade-transition>
      </v-img>
    </v-hover>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="info" icon @click="openImage(imgDetails)">
        <v-icon left>mdi-eye</v-icon>
      </v-btn>
      <v-btn color="primary" icon @click="downlaodImage(imgDetails)">
        <v-icon left="">mdi-download</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["imgDetails"],
  computed: {
    ...mapGetters({ getDownloadSize: "getResolution" }),
  },
  methods: {
    ...mapActions([
      "SET_SELECTED_IMAGE_URL",
      "SET_DIALOG_STATUS",
      "DOWNLOAD_IMAGE",
    ]),
    async openImage(imgDetails) {
      this.SET_SELECTED_IMAGE_URL(imgDetails);
      this.SET_DIALOG_STATUS(true);
    },
    downlaodImage(imageDetails) {
      this.DOWNLOAD_IMAGE(imageDetails);
    },
  },
};
</script>

<style>
.card-title-text {
  background: #0a1a6b40;
}
.pointer {
  cursor: pointer;
}
</style>