<template>
  <v-app>
    <v-app-bar app color="info" dark>
      <div class="text-center">
        <h2>
          <v-icon>mdi-image-multiple</v-icon>Image Finder
        </h2>
      </div>
    </v-app-bar>
    <v-main id="main-section">
      <v-container>
        <ImageSearchField />
        <ImageFields />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ImageSearchField from "./components/ImageSearchField";
import ImageFields from "./components/ImageFields";

export default {
  name: "App",
  components: {
    ImageSearchField,
    ImageFields,
  },
  data: () => ({}),
  methods: {},
};
</script>
