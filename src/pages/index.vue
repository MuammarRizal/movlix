<template>
  <home-layout>
    <v-app>
      <hero-section>
        <search-bar class="w-100" />
      </hero-section>

      <movie-section title="Trendings Movies" :loading="isLoading">
        <v-slide-group-item v-for="item in trendingsMovie" :key="item.id">
          <movie-card
            class="mx-2"
            :image="`${API_IMAGE_URL_W500}${item.backdrop_path}`"
            :title="item.original_title"
            :date="item.release_date"
            :score="item.vote_average"
          /> </v-slide-group-item
      ></movie-section>

      <section class="latest-traillers">
        <latest-traillers></latest-traillers>
      </section>

      <movie-section title="Popular Movies" :loading="isLoading">
        <v-slide-group-item v-for="item in popularMovies" :key="item.id">
          <movie-card
            class="mx-2"
            :image="`${API_IMAGE_URL_W500}${item.backdrop_path}`"
            :title="item.original_title"
            :date="item.release_date"
            :score="item.vote_average"
          />
        </v-slide-group-item>
      </movie-section>

      <movie-section title="Actors" :loading="isLoading">
        <v-slide-group-item v-for="item in actorsMovies" :key="item.id">
          <movie-card
            class="mx-2"
            :image="`${API_IMAGE_URL_W500}${item.profile_path}`"
            :title="item.name"
            :date="item.release_date"
            :score="item.popularity"
          />
        </v-slide-group-item>
      </movie-section>
    </v-app>
  </home-layout>
</template>

<script setup>
import {
  GetActorsMovie,
  GetPopularMovies,
  GetProvidersMovie,
  GetTrendingMovies,
} from "@/api/Movies.api";
import HomeLayout from "@/layouts/HomeLayout.vue";
import { API_IMAGE_URL_W500 } from "@/utils/const";
import { onMounted, provide, ref } from "vue";

const popularMovies = ref([]);
const trendingsMovie = ref([]);
const actorsMovies = ref([]);
const providersMovie = ref([]);
const isLoading = ref(true);

provide("providers-movie", providersMovie);

onMounted(async () => {
  isLoading.value = true;
  try {
    const [popular, trend, actors, providers] = await Promise.all([
      GetPopularMovies(),
      GetTrendingMovies(),
      GetActorsMovie(),
      GetProvidersMovie(),
    ]);
    popularMovies.value = popular.results;
    trendingsMovie.value = trend.results;
    actorsMovies.value = actors.results;
    providersMovie.value = providers.results;
  } catch (error) {
    console.log({ error });
  } finally {
    isLoading.value = false;
  }
});
</script>

<style>
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
</style>
