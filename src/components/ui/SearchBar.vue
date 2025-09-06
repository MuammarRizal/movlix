<template>
  <div class="search-wrapper d-flex ga-1">
    <v-text-field
      v-model="query"
      placeholder="Search for a movie, tv show, person..."
      prepend-inner-icon="mdi-magnify"
      variant="solo"
      hide-details
      single-line
      density="comfortable"
      clearable
      class="search-input"
      @keyup.enter="onSearch"
    />
    <v-btn @click="onSearch" class="h-100" color="primary"> Cari </v-btn>
  </div>
</template>

<script setup>
import { ref } from "vue";

const query = ref("");

function onSearch() {
  if (query.value.trim()) {
    console.log("Searching:", query.value);
    // emit event ke parent atau panggil API TMDB di sini
  }
}
</script>

<style scoped>
.search-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.search-input {
  max-width: 600px;
  border-radius: 50px;
}

.search-input .v-field {
  border-radius: 50px !important;
  background-color: #fff !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
</style>
