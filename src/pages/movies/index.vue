<template>
  <v-container fluid>
    <v-row class="position-relative">
      <!-- Sidebar -->
      <v-col cols="12" md="3" class="">
        <v-card class="pa-4">
          <h3 class="text-h6 font-weight-bold mb-3">Search & Filter</h3>

          <!-- Search -->
          <v-text-field
            v-model="search"
            label="Search Movies"
            prepend-inner-icon="mdi-magnify"
            dense
            outlined
            hide-details
            class="mb-4"
          />

          <!-- Sort -->
          <v-select
            v-model="sortBy"
            :items="sortOptions"
            label="Sort By"
            dense
            outlined
            hide-details
            class="mb-4"
          />

          <!-- Filter by Genre -->
          <v-select
            v-model="selectedGenre"
            :items="genres"
            item-title="name"
            item-value="id"
            label="Genre"
            dense
            outlined
            hide-details
          />

          <!-- Apply Button -->
          <v-btn block color="primary" class="mt-4" @click="applyFilters">
            Apply Filters
          </v-btn>
        </v-card>
      </v-col>

      <!-- Movie Grid -->
      <v-col cols="12" md="9">
        <v-row>
          <v-col
            v-for="movie in movies"
            :key="movie.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="movie-card" height="100%">
              <v-img
                :src="`${IMAGE_BASE}${movie.poster_path}`"
                height="250"
                cover
              ></v-img>
              <v-card-text>
                <div class="text-subtitle-1 font-weight-medium">
                  {{ movie.title }}
                </div>
                <div class="text-caption grey--text">
                  ⭐ {{ movie.vote_average }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Load More -->
        <div class="text-center mt-6">
          <loading-custom v-if="isLoading" />
          <v-btn v-else color="primary" @click="loadMore">Load More</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { GetListGenre } from "@/api/Lists.api";
import { GetDiscoverMovie } from "@/api/Movies.api";
import { onMounted, ref } from "vue";

const search = ref("");
const sortBy = ref("popularity.desc");
const selectedGenre = ref(null);

const sortOptions = [
  { text: "Popularity Desc", value: "popularity.desc" },
  { text: "Popularity Asc", value: "popularity.asc" },
  { text: "Rating Desc", value: "vote_average.desc" },
  { text: "Rating Asc", value: "vote_average.asc" },
];

const genres = ref([]);

const movies = ref([]);
const page = ref(1);
const isLoading = ref(false);

const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

function applyFilters() {
  console.log("Search:", search.value);
  console.log("Sort:", sortBy.value);
  console.log("Genre:", selectedGenre.value);
}

async function loadMore() {
  page.value = ++page.value;
  isLoading.value = true;
  try {
    const responseLoadmore = await GetDiscoverMovie(page.value);
    responseLoadmore.results.map((item) => movies.value.push(item));
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  try {
    const [moviesResponse, genreResponse] = await Promise.all([
      GetDiscoverMovie(page.value),
      GetListGenre(),
    ]);
    movies.value = moviesResponse.results;
    genres.value = genreResponse;
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.movie-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}
</style>
