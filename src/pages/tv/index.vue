<template>
  <v-container fluid>
    <v-row class="position-relative">
      <!-- Sidebar -->
      <v-col cols="12" md="3" class="">
        <v-card class="pa-4">
          <h3 class="text-h6 font-weight-bold mb-3">Search & Filter</h3>

          <!-- Search -->
          <!-- <v-text-field
            v-model="search"
            label="Search discover"
            prepend-inner-icon="mdi-magnify"
            dense
            outlined
            hide-details
            class="mb-4"
          /> -->

          <!-- Sort -->
          <v-select
            v-model="sortBy"
            label="Sort By"
            :items="sortOptions"
            item-title="text"
            item-value="value"
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
          <div>
            <loading-custom v-if="isLoading" class="mt-2" />
            <v-btn
              v-else
              block
              color="primary"
              class="mt-4"
              @click="applyFilters"
            >
              Apply Filters
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <!-- tv Grid -->
      <v-col cols="12" md="9">
        <v-row>
          <v-col
            v-for="tv in discover"
            :key="tv.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <router-link :to="`/tv/${tv.id}`" class="text-decoration-none">
              <v-card class="tv-card" height="100%">
                <v-img
                  :src="`${API_IMAGE_URL_ORIGINAL}${tv.poster_path}`"
                  height="250"
                  cover
                ></v-img>
                <v-card-text>
                  <div class="text-subtitle-1 font-weight-medium">
                    {{ tv.title }}
                  </div>
                  <div class="text-caption grey--text">
                    ⭐ {{ tv.vote_average }}
                  </div>
                </v-card-text>
              </v-card>
            </router-link>
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
import { FilterDiscoverMovie, SearchMovieAPI } from "@/api/search.api";
import { GetTVDiscover } from "@/api/Tv.api";
import { API_IMAGE_URL_ORIGINAL } from "@/utils/const";
import { onMounted, ref } from "vue";

const search = ref("");
const sortBy = ref(null);
const discover = ref([]);
const page = ref(1);
const isLoading = ref(false);
const selectedGenre = ref(null);
const genres = ref([]);
const activeFilter = ref(null);

const sortOptions = [
  { text: "Popularity Desc", value: "popularity.desc" },
  { text: "Popularity Asc", value: "popularity.asc" },
  { text: "Rating Desc", value: "vote_average.desc" },
  { text: "Rating Asc", value: "vote_average.asc" },
];

async function applyFilters() {
  page.value = 1;
  isLoading.value = true;
  try {
    const responseSearch = await FilterDiscovertv(
      sortBy.value,
      selectedGenre.value,
      2020
    );
    discover.value = responseSearch.results;

    activeFilter.value = {
      sort: sortBy.value,
      genre: selectedGenre.value,
      year: 2020,
    };
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

async function loadMore() {
  page.value++;
  isLoading.value = true;
  try {
    if (activeFilter.value) {
      const responseSearch = await FilterDiscovertv(
        sortBy.value,
        selectedGenre.value,
        2020,
        page.value
      );
      responseSearch.results.map((item) => discover.value.push(item));
    } else {
      const responseLoadmore = await GetDiscovertv(page.value);
      responseLoadmore.results.map((item) => discover.value.push(item));
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  try {
    const [discoverResponse, genreResponse] = await Promise.all([
      GetTVDiscover(page.value),
      GetListGenre(),
    ]);
    discover.value = discoverResponse.results;
    genres.value = genreResponse;
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.tv-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.tv-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}
</style>
