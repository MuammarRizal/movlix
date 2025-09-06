<template>
  <v-card class="rounded-lg" elevation="4" max-width="250">
    <!-- Poster -->
    <v-img :src="image" height="250" cover class="rounded-t-lg"></v-img>

    <!-- Info -->
    <v-card-title class="d-flex justify-space-between align-center">
      <div class="text-truncate" style="max-width: 160px">
        {{ title }}
      </div>

      <!-- Toggle menu -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon variant="text" v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="addToCollection">
            <v-list-item-title>➕ Tambah ke Koleksi</v-list-item-title>
          </v-list-item>
          <v-list-item @click="addToFavorites">
            <v-list-item-title>❤️ Tambah ke Kesukaan</v-list-item-title>
          </v-list-item>
          <v-list-item @click="addToWatchlist">
            <v-list-item-title>📺 Tambah ke Daftar Tonton</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              ⭐ Rating Anda: {{ userRating || "-" }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-slider
              v-model="userRating"
              min="0"
              max="10"
              step="1"
              thumb-label
              color="yellow"
            />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>

    <v-card-subtitle class="px-4">
      <div>📅 {{ date }}</div>
      <div>⭐ {{ score }}/10</div>
    </v-card-subtitle>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  image: { type: String, default: "https://picsum.photos/200/300" },
  title: { type: String, default: "Judul Film" },
  date: { type: String, default: "2025-09-06" },
  score: { type: Number, default: 7.5 },
});

const userRating = ref(null);

const addToCollection = () => {
  alert("Film ditambahkan ke koleksi!");
};
const addToFavorites = () => {
  alert("Film ditambahkan ke daftar kesukaan!");
};
const addToWatchlist = () => {
  alert("Film ditambahkan ke daftar tonton!");
};
</script>
