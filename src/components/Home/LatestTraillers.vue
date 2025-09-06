<template>
  <v-container fluid>
    <h2 class="mb-4 ms-14">Latest Trailers</h2>
    <v-slide-group show-arrows>
      <v-slide-group-item v-for="(trailer, i) in trailers" :key="i">
        <v-card class="ma-2 hover-card" width="320">
          <!-- Thumbnail -->
          <v-img
            :src="`${API_IMAGE_URL_W500}${trailer.logo_path}`"
            height="180"
            cover
          />

          <!-- Judul film -->
          <v-card-text>
            <h3 class="text-sm font-bold">{{ trailer.provider_name }}</h3>
          </v-card-text>

          <!-- Tombol play -->
          <v-card-actions>
            <v-btn
              block
              color="red"
              variant="flat"
              @click="openTrailer(trailer.youtubeId)"
            >
              ▶ Watch Trailer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <!-- Dialog Video -->
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <iframe
          v-if="currentTrailer"
          width="100%"
          height="450"
          :src="`https://www.youtube.com/embed/${currentTrailer}`"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { API_IMAGE_URL_W500 } from "@/utils/const";
import { inject, ref } from "vue";

const dialog = ref(false);
const currentTrailer = ref(null);

const trailers = inject("providers-movie");

function openTrailer(youtubeId) {
  currentTrailer.value = youtubeId;
  dialog.value = true;
}
</script>

<style scoped>
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
</style>
