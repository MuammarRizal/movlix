<template>
  <skeleton-detail v-if="isLoading" />

  <v-container v-else fluid class="pa-0">
    <!-- Backdrop -->
    <v-img
      :src="`https://image.tmdb.org/t/p/original${tv.backdrop_path}`"
      height="500px"
      cover
      class="position-relative"
    >
      <div class="overlay d-flex align-end">
        <v-container>
          <v-row>
            <!-- Poster -->
            <v-col cols="12" md="3">
              <v-img
                :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
                class="rounded-lg"
                height="400"
                cover
              />
            </v-col>

            <!-- Info -->
            <v-col cols="12" md="9" class="text-white">
              <h1 class="text-h3 font-weight-bold">{{ tv?.name }}</h1>
              <p class="text-subtitle-1">{{ tv.tagline }}</p>

              <!-- Action Buttons -->
              <div class="d-flex ga-2 my-4">
                <v-btn color="red" class="text-white" prepend-icon="mdi-play">
                  Watch Now
                </v-btn>
                <v-btn
                  variant="outlined"
                  color="white"
                  prepend-icon="mdi-information-outline"
                >
                  More Info
                </v-btn>
              </div>

              <!-- Meta Info -->
              <div class="d-flex flex-wrap ga-4 text-subtitle-2">
                <span>Status: {{ tv.status }}</span>
                <span>First Air: {{ tv.first_air_date }}</span>
                <span>Seasons: {{ tv.number_of_seasons }}</span>
                <span>Episodes: {{ tv.number_of_episodes }}</span>
                <span
                  >Rating: ⭐ {{ tv.vote_average }} ({{
                    tv.vote_count
                  }}
                  votes)</span
                >
              </div>

              <!-- Genres -->
              <div class="mt-2">
                <v-chip
                  v-for="genre in tv.genres"
                  :key="genre.id"
                  class="ma-1"
                  color="red"
                  text-color="white"
                >
                  {{ genre.name }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-img>

    <!-- Overview -->
    <v-container class="mt-8">
      <h2 class="text-h5 font-weight-bold mb-2">Overview</h2>
      <p>{{ tv.overview }}</p>
    </v-container>

    <!-- Creators -->
    <v-container class="mt-8">
      <h2 class="text-h5 font-weight-bold mb-4">Created By</h2>
      <v-row>
        <v-col
          v-for="creator in tv.created_by"
          :key="creator.id"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card class="pa-2 text-center">
            <v-avatar size="100" class="mx-auto mb-2">
              <v-img
                v-if="creator.profile_path"
                :src="`https://image.tmdb.org/t/p/w200${creator.profile_path}`"
              />
              <v-icon v-else size="100">mdi-account</v-icon>
            </v-avatar>
            <div class="font-weight-medium">{{ creator.name }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Last Episode -->
    <v-container class="mt-8">
      <h2 class="text-h5 font-weight-bold mb-4">Last Episode to Air</h2>
      <v-card>
        <v-row>
          <v-col cols="12" md="4">
            <v-img
              :src="`${API_IMAGE_URL_ORIGINAL}${tv?.last_episode_to_air?.still_path}`"
              height="200"
              cover
            />
          </v-col>
          <v-col cols="12" md="8">
            <v-card-title class="text-h6">
              {{ tv?.last_episode_to_air?.name }}
            </v-card-title>
            <v-card-subtitle>
              Episode {{ tv?.last_episode_to_air?.episode_number }} · Season
              {{ tv?.last_episode_to_air?.season_number }}
            </v-card-subtitle>
            <v-card-text>
              {{ tv?.last_episode_to_air?.overview }}
              <br />
              Air Date: {{ tv?.last_episode_to_air?.air_date }}
              <br />
              Rating: ⭐ {{ tv?.last_episode_to_air?.vote_average }}
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- Seasons -->
    <v-container class="mt-8">
      <h2 class="text-h5 font-weight-bold mb-4">Seasons</h2>
      <v-row>
        <v-col
          v-for="season in tv.seasons"
          :key="season.id"
          cols="12"
          sm="6"
          md="3"
        >
          <router-link
            :to="`/tv/${id}/season/${season.season_number}`"
            class="text-decoration-none"
          >
            <v-card>
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${season.poster_path}`"
                height="200"
                cover
              />
              <v-card-title>{{ season.name }}</v-card-title>
              <v-card-subtitle>
                {{ season.episode_count }} Episodes
              </v-card-subtitle>
              <v-card-text>
                {{ season.overview }}
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>

    <!-- Production Companies -->
    <v-container class="mt-8">
      <h2 class="text-h5 font-weight-bold mb-4">Production Companies</h2>
      <v-row>
        <v-col
          v-for="company in tv.production_companies"
          :key="company.id"
          cols="6"
          sm="3"
          md="2"
          class="text-center"
        >
          <v-img
            v-if="company.logo_path"
            :src="`https://image.tmdb.org/t/p/w200${company.logo_path}`"
            contain
            height="60"
            class="mb-2"
          />
          <div>{{ company.name }}</div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Networks -->
    <v-container class="mt-8">
      <h2 class="text-h5 font-weight-bold mb-4">Available On</h2>
      <v-row>
        <v-col
          v-for="network in tv.networks"
          :key="network.id"
          cols="6"
          sm="3"
          md="2"
          class="text-center"
        >
          <v-img
            v-if="network.logo_path"
            :src="`${API_IMAGE_URL_ORIGINAL}${network.logo_path}`"
            contain
            height="60"
            class="mb-2"
          />
          <div>{{ network.name }}</div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { GetDetailTV } from "@/api/Tv.api";
import { API_IMAGE_URL_ORIGINAL } from "@/utils/const";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.tv_id;
const tv = ref({});
const isLoading = ref(true);

onMounted(async () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  isLoading.value = true;
  try {
    const response = await GetDetailTV(id);
    tv.value = response;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2));
  height: 100%;
  padding-bottom: 20px;
}
</style>
