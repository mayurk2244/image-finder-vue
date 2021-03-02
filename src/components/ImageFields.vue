<template>
  <v-container id="image-area" class="mt-5">
    <div v-if="images.length">
      <v-row>
        <v-col
          cols="12"
          md="4"
          lg="3"
          sm="6"
          xs="12"
          class="mt-1 mb-1"
          v-for="imageData in images"
          :key="imageData.id"
        >
          <ImageCard :img-details="imageData" />
        </v-col>
      </v-row>
      <v-row>
        <v-dialog :value="dialogeState" persistent max-width="600">
          <v-card>
            <v-card-title class="headline">
              <v-spacer></v-spacer>
              <v-btn @click="setDialogState(false)" fab dark small color="red">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-img
                :src="selectedImgUrl"
                :lazy-src="selectedImgLazyUrl"
                height="400"
                contain
                aspect-ratio="2"
              ></v-img>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon color="primary" @click="downlaodImage(imgDetails)">
                <v-icon left>mdi-download</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div v-else>
      <h2>No Image Found.</h2>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ImageCard from "./ImageCard";
export default {
  data: () => ({
    imageDialogState: false,
    boilerplate: true,
    tile: false,
    type: "image",
    types: [],
  }),
  components: {
    ImageCard,
  },
  computed: {
    ...mapGetters({
      images: "getImages",
      selectedImgUrl: "getSelectedImageUrl",
      selectedImgLazyUrl: "getSelectedImageLazyUrl",
      dialogeState: "getDialogStatus",
      imgDetails: "getSelectedImageDetails",
      getDownloadSize: "getResolution",
      getPageNum: "getPageNumber",
      pageLimit: "getPageLimit",
      getTags: "getSelectedImageTags",
    }),
  },
  methods: {
    ...mapActions({
      setImgages: "SET_IMAGES",
      setDialogState: "SET_DIALOG_STATUS",
      downlaodImage: "DOWNLOAD_IMAGE",
    }),
  },
  mounted() {
    this.setImgages();
    const listElm = document.querySelector("#image-area");
    listElm.addEventListener("scroll", () => {
      if (this.getPageNum >= this.pageLimit) return;
      if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.setImgages(true);
      }
    });
  },
};
</script>

<style>
#image-area {
  overflow: auto;
  height: 60vh;
}

#image-area::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

#image-area::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

#image-area::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #4285f4;
}
</style>