import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    search_term: "",
    resolution_type: "med",
    current_page: 1,
    page_limit: "",
    dialog_status: false,
    selected_img_data: {},
    selected_img_url: "",
    selected_img_lazy_url: "",
    selected_image_tags: [],
    images_loading: false,
  },
  mutations: {
    setResolution(state, res_type) {
      state.resolution_type = res_type;
    },
    setImages(state, data) {
      if (data.append) {
        state.images = [...state.images, ...data.images];
      } else {
        state.images = data.images;
      }
    },
    setSelectedImgUrl(state, imgData) {
      state.selected_img_data = imgData;
      state.selected_image_tags = imgData.tags.split(",");
      state.selected_img_lazy_url = imgData.previewURL;
      state.selected_img_url = imgData.webformatURL;
    },
    setDialogStatus(state, status) {
      state.dialog_status = status;
      if (!status) {
        state.selected_img_lazy_url = "";
        state.selected_img_url = "";
      }
    },
    setSearchTerm(state, search_term) {
      state.search_term = search_term;
    },
    setPageNumber(state, page_num) {
      state.current_page = page_num;
    },
    setPageLimit(state, page_limit) {
      state.page_limit = page_limit;
    },
    setImageLoadingState(state, loading_state) {
      state.images_loading = loading_state;
    },
  },
  actions: {
    SET_RESOLUTION_TYPE({ commit }, payload) {
      commit("setResolution", payload);
    },
    SET_DIALOG_STATUS({ commit }, payload) {
      commit("setDialogStatus", payload);
    },
    SET_SELECTED_IMAGE_URL({ commit }, payload) {
      commit("setSelectedImgUrl", payload);
    },
    SET_SEARCH_TERM({ commit }, payload) {
      commit("setSearchTerm", payload);
    },
    async SET_IMAGES({ commit, getters }, append = false) {
      let api_url = "http://mayurkarmarkar.com/api/image-finder";
      commit("setImageLoadingState", true);
      let new_page_number = append ? getters.getPageNumber + 1 : 1;
      commit("setPageNumber", new_page_number);
      let url = `${api_url}?page=${new_page_number}&q=${getters.getSearchTerm}`;
      let image_data = await axios.get(url);
      let images_data = getters.getImages;
      let image_only_data = image_data.data.hits;
      if (append) {
        images_data.forEach((data) => {
          image_only_data.forEach((newData, index) => {
            if (data.id == newData.id) {
              image_only_data.splice(index, 1);
            }
          });
        });
      }

      if (!append) {
        let page_limit = Math.ceil(image_data.data.totalHits / 20);
        let imgDiv = document.getElementById("image-area");
        imgDiv.scrollTop = 0;
        commit("setPageLimit", page_limit);
      }
      commit("setImages", { images: image_only_data, append });
      setTimeout(() => commit("setImageLoadingState", false), 1000);
    },
    DOWNLOAD_IMAGE(state, imageDetails) {
      let download_url = "";
      let image_resolution = "";
      let image_name = imageDetails.id;
      if (state.getters.getResolution == "med") {
        download_url = imageDetails.webformatURL;
        image_resolution = "640x423";
      } else {
        download_url = imageDetails.largeImageURL;
        image_resolution = "1280x847";
      }
      fetch(download_url)
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = `${image_name}_${image_resolution}.jpg`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        })
        .catch((err) => console.log(err));
    },
  },
  modules: {},
  getters: {
    getResolution({ resolution_type }) {
      return resolution_type;
    },
    getImages({ images }) {
      return images;
    },
    getImagesCount({ images }) {
      return images.length;
    },
    getSelectedImageUrl({ selected_img_url }) {
      return selected_img_url;
    },
    getSelectedImageLazyUrl({ selected_img_lazy_url }) {
      return selected_img_lazy_url;
    },
    getDialogStatus({ dialog_status }) {
      return dialog_status;
    },
    getSelectedImageDetails({ selected_img_data }) {
      return selected_img_data;
    },
    getSearchTerm({ search_term }) {
      return search_term;
    },
    getPageNumber({ current_page }) {
      return current_page;
    },
    getPageLimit({ page_limit }) {
      return page_limit;
    },
    getSelectedImageTags({ selected_image_tags }) {
      return selected_image_tags;
    },
    getImagesLoadingState({ images_loading }) {
      return images_loading;
    },
  },
});
