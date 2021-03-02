<template>
  <v-form @submit.prevent="searchImage">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12" md="6" class="no-top-bottom-padding">
          <v-text-field
            solo
            dense
            :loading="isLoading"
            :value="searchTerm"
            @input="updateSearchTerm"
            placeholder="Search image"
            color="primary"
            append-icon="mdi-magnify"
            @click:append="searchImage"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="no-top-bottom-padding">
          <v-radio-group :value="resolutionType" class="no-top-marging" row>
            <strong>Download size</strong>
            <v-radio label="Medium" value="med" @change="setResType('med')"></v-radio>
            <v-radio label="High" value="high" @change="setResType('high')"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" md="6" class="no-top-bottom-padding">
          <span>
            All images are from
            <a href="https://pixabay.com/" target="_blank">
              <img class="pixabay-logo" src="https://pixabay.com/static/img/logo.svg" />
            </a> Please read
            <a
              href="https://pixabay.com/service/license/"
              target="_blank"
            >Pixabay License</a> before using.
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ImageSearchField",
  computed: {
    ...mapGetters({
      resolutionType: "getResolution",
      searchTerm: "getSearchTerm",
      isLoading: "getImagesLoadingState",
    }),
  },
  methods: {
    ...mapActions({
      setResType: "SET_RESOLUTION_TYPE",
      updateSearchTerm: "SET_SEARCH_TERM",
      mainSearchImage: "SET_IMAGES",
    }),
    searchImage() {
      this.mainSearchImage(false);
    },
  },
};
</script>
<style>
.no-top-bottom-padding {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.no-top-marging {
  margin-top: 0 !important;
}
.pixabay-logo {
  width: 68px;
}
</style>