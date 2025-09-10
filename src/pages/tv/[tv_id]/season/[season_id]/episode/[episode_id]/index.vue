<template>
  <v-container fluid class="pa-0 episode-detail">
    <!-- Hero Section -->
    <div class="hero-section" :style="heroStyle">
      <div class="overlay"></div>
      <v-container class="fill-height d-flex flex-column justify-end">
        <h1 class="text-white text-h3 font-weight-bold">{{ episode.name }}</h1>
        <p class="text-grey-lighten-2">
          Season {{ episode.season_number }} • Episode
          {{ episode.episode_number }} • {{ episode.runtime }}m
        </p>
        <v-rating
          :value="episode.vote_average / 2"
          dense
          readonly
          color="amber"
          background-color="grey"
          class="mb-2"
        ></v-rating>
        <p class="text-white text-body-1">{{ episode.overview }}</p>
      </v-container>
    </div>

    <!-- Episode Info -->
    <v-container class="mt-6">
      <h2 class="text-h5 mb-4">Episode Details</h2>
      <v-row>
        <v-col cols="12" md="8">
          <v-card class="pa-4 rounded-xl bg-grey-darken-4">
            <h3 class="text-h6 mb-2">Air Date</h3>
            <p>{{ episode.air_date }}</p>

            <h3 class="text-h6 mt-4 mb-2">Production Code</h3>
            <p>{{ episode.production_code || "N/A" }}</p>

            <h3 class="text-h6 mt-4 mb-2">Average Vote</h3>
            <p>{{ episode.vote_average }} ({{ episode.vote_count }} votes)</p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-img
            :src="imageUrl(episode.still_path)"
            class="rounded-xl"
            height="250"
            cover
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <!-- Cast -->
    <v-container class="mt-6">
      <h2 class="text-h5 mb-4">Guest Stars</h2>
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="star in episode.guest_stars" :key="star.id">
          <v-card class="ma-2 pa-2 rounded-xl bg-grey-darken-4" width="160">
            <v-img
              :src="imageUrl(star.profile_path)"
              height="200"
              cover
              class="rounded-lg"
            ></v-img>
            <v-card-title class="text-subtitle-2 text-white mt-2">{{
              star.name
            }}</v-card-title>
            <v-card-subtitle class="text-grey"
              >as {{ star.character }}</v-card-subtitle
            >
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-container>

    <!-- Crew -->
    <v-container class="mt-6">
      <h2 class="text-h5 mb-4">Crew</h2>
      <v-row>
        <v-col
          v-for="person in episode.crew"
          :key="person.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="pa-3 rounded-xl bg-grey-darken-4">
            <v-row no-gutters>
              <v-col cols="4">
                <v-img
                  :src="imageUrl(person.profile_path)"
                  height="100"
                  cover
                  class="rounded-lg"
                ></v-img>
              </v-col>
              <v-col cols="8" class="d-flex flex-column justify-center">
                <div class="text-white font-weight-bold">{{ person.name }}</div>
                <div class="text-grey">
                  {{ person.job }} - {{ person.department }}
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { GetDetailTVEpisode } from "@/api/Tv.api";
import { API_IMAGE_URL_ORIGINAL } from "@/utils/const";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const episode = ref({});
const imageHero = ref("");

const imageUrl = (path) =>
  path
    ? `${API_IMAGE_URL_ORIGINAL}${path}`
    : "https://via.placeholder.com/500x750";

const heroStyle = computed(() => ({
  backgroundImage: `url(${imageUrl(imageHero.value)})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "80vh",
  position: "relative",
}));

const route = useRoute();
const { tv_id, season_id, episode_id } = route.params;

onMounted(async () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  try {
    const responseData = await GetDetailTVEpisode(tv_id, season_id, episode_id);
    imageHero.value = responseData.still_path;
    episode.value = responseData;
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.hero-section {
  position: relative;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3));
}
</style>
