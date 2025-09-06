<template>
  <home-layout>
    <v-app>
      <hero-section>
        <search-bar class="w-100" />
      </hero-section>

      <section class="trendings">
        <v-container fluid>
          <h2 class="mb-4">Popular Movies</h2>
          <v-slide-group show-arrows class="pa-2">
            <v-slide-group-item v-for="(movie, i) in movies" :key="i">
              <movie-card
                class="mx-2"
                image="https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
                title="The Batman"
                date="2022-03-04"
                :score="7.9"
              />
            </v-slide-group-item>
          </v-slide-group>
        </v-container>
      </section>

      <section class="latest-traillers">
        <latest-traillers></latest-traillers>
      </section>

      <section class="popular">
        <v-container fluid>
          <h2 class="mb-4">Popular</h2>
          <v-slide-group show-arrows class="pa-2">
            <v-slide-group-item v-for="(movie, i) in movies" :key="i">
              <movie-card
                class="mx-2"
                image="https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
                title="The Batman"
                date="2022-03-04"
                :score="7.9"
              />
            </v-slide-group-item>
          </v-slide-group>
        </v-container>
      </section>

      <section class="popular">
        <v-container fluid>
          <h2 class="mb-4">Free to Watch</h2>
          <v-slide-group show-arrows class="pa-2">
            <v-slide-group-item v-for="(movie, i) in movies" :key="i">
              <movie-card
                class="mx-2"
                image="https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
                title="The Batman"
                date="2022-03-04"
                :score="7.9"
              />
            </v-slide-group-item>
          </v-slide-group>
        </v-container>
      </section>
    </v-app>
  </home-layout>
</template>

<script setup>
import HomeLayout from "@/layouts/HomeLayout.vue";

const movies = [
  { poster: "https://image.tmdb.org/t/p/w200/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg" },
  { poster: "https://image.tmdb.org/t/p/w200/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" },
  { poster: "https://image.tmdb.org/t/p/w200/somePoster3.jpg" },
  { poster: "https://image.tmdb.org/t/p/w200/somePoster4.jpg" },
  { poster: "https://image.tmdb.org/t/p/w200/somePoster5.jpg" },
  { poster: "https://image.tmdb.org/t/p/w200/somePoster5.jpg" },
  { poster: "https://image.tmdb.org/t/p/w200/somePoster5.jpg" },
  { poster: "https://image.tmdb.org/t/p/w200/somePoster5.jpg" },
  { poster: "https://image.tmdb.org/t/p/w200/somePoster5.jpg" },
  { poster: "https://image.tmdb.org/t/p/w200/somePoster5.jpg" },
];
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
