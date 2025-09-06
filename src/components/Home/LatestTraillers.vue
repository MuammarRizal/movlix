<template>
  <v-container fluid>
    <h2 class="mb-4">Latest Trailers</h2>
    <v-slide-group show-arrows>
      <v-slide-group-item v-for="(trailer, i) in trailers" :key="i">
        <v-card class="ma-2 hover-card" width="320">
          <!-- Thumbnail -->
          <v-img
            :src="`https://img.youtube.com/vi/${trailer.youtubeId}/hqdefault.jpg`"
            height="180"
            cover
          />

          <!-- Judul film -->
          <v-card-text>
            <h3 class="text-sm font-bold">{{ trailer.title }}</h3>
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
import { ref } from "vue";

const dialog = ref(false);
const currentTrailer = ref(null);

const trailers = [
  {
    title: "Inception Trailer",
    youtubeId: "8hP9D6kZseM",
  },
  {
    title: "The Batman Trailer",
    youtubeId: "mqqft2x_Aa4",
  },
  {
    title: "Interstellar Trailer",
    youtubeId: "zSWdZVtXT7E",
  },
  {
    title: "Oppenheimer Trailer",
    youtubeId: "uYPbbksJxIg",
  },
];

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
