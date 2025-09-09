<template>
  <v-container fluid>
    <v-row>
      <!-- Sidebar -->
      <v-col cols="12" md="3">
        <v-card class="pa-4">
          <h3 class="mb-4">Kategori Pencarian</h3>
          <v-list dense>
            <v-list-item
              v-for="item in categories"
              :key="item"
              @click="selectCategory(item)"
              :class="{ 'bg-grey lighten-3': selectedCategory === item }"
              class="rounded-lg"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Hasil Pencarian -->
      <v-col cols="12" md="9">
        <v-card class="pa-4">
          <h3 class="mb-4">Hasil Pencarian: {{ selectedCategory }}</h3>
          <v-row>
            <v-col
              v-for="(result, index) in filteredResults"
              :key="index"
              cols="12"
              sm="6"
              md="4"
            >
              <router-link
                :to="`/movies/${result.id}`"
                class="text-decoration-none"
              >
                <v-card>
                  <v-img
                    :src="`
                    ${
                      result.poster_path
                        ? API_IMAGE_URL_ORIGINAL + result.poster_path
                        : 'https://placehold.co/400x600'
                    } 
                  `"
                    height="200px"
                  ></v-img>
                  <v-card-title>{{ result.title }}</v-card-title>
                  <v-card-text>{{ result.description }}</v-card-text>
                </v-card>
              </router-link>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { SearchMovieAPI } from "@/api/search.api";
import { API_IMAGE_URL_ORIGINAL } from "@/utils/const";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
const categories = [
  "Film",
  "Serial TV",
  "Orang",
  "Daftar Koleksi",
  "Perusahaan",
  "Kata kunci",
  "Networks",
  "Awards",
];
const selectedCategory = ref("Film");

const results = ref([]);
const route = useRoute();

const selectCategory = (category) => {
  selectedCategory.value = category;
  // bisa tambahkan logika filter berdasarkan kategori
};

const filteredResults = computed(() => {
  // sementara menampilkan semua results, bisa filter nanti berdasarkan selectedCategory
  return results.value;
});

onMounted(async () => {
  try {
    const responseSearchAPI = await SearchMovieAPI(route.query.query);
    results.value = responseSearchAPI.results;
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.v-list-item {
  cursor: pointer;
}
</style>
