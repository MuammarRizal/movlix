<template>
  <loading-skeleton v-if="isLoading" />
  <div v-if="season">
    <div class="hero-section">
      <v-container>
        <v-row
          align="center"
          class="position-relative"
          style="min-height: 80vh; overflow: hidden"
        >
          <!-- Background Image -->
          <v-img
            :src="`${API_IMAGE_URL_ORIGINAL}${season.poster_path}`"
            alt=""
            class="position-absolute"
            style="
              z-index: 0;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
            "
          >
            <!-- Tambahin overlay biar teks lebih jelas -->
            <div
              class="position-absolute top-0 left-0 w-100 h-100"
              style="background: rgba(0, 0, 0, 0.6)"
            ></div>
          </v-img>

          <!-- Content -->
          <v-col cols="12" md="6" class="position-relative" style="z-index: 1">
            <v-chip
              class="rating-chip mb-3"
              size="small"
              prepend-icon="mdi-star"
            >
              {{ episode.vote_average }} ★ ({{ episode.vote_count }}
              votes)
            </v-chip>

            <h1 class="text-h2 font-weight-bold mb-4 text-white">
              {{ episode.name }}
            </h1>

            <p
              class="text-h6 mb-6 text-grey-lighten-1"
              style="max-width: 600px"
            >
              {{ episode.overview }}
            </p>

            <div class="d-flex flex-wrap ga-3 mb-6">
              <v-chip color="grey-darken-2" size="small">
                {{ season.season_number }} Season
              </v-chip>
              <v-chip color="grey-darken-2" size="small">
                {{ episode.runtime }} min
              </v-chip>
              <v-chip color="grey-darken-2" size="small">
                {{ new Date(episode.air_date).getFullYear() }}
              </v-chip>
              <v-chip color="grey-darken-2" size="small">Sci-Fi</v-chip>
            </div>

            <div class="d-flex flex-wrap ga-3">
              <v-btn
                color="white"
                size="large"
                prepend-icon="mdi-play"
                class="text-black font-weight-bold"
              >
                Play
              </v-btn>
              <v-btn
                variant="outlined"
                color="white"
                size="large"
                prepend-icon="mdi-information"
              >
                More Info
              </v-btn>
              <v-btn
                variant="text"
                color="white"
                icon="mdi-plus"
                size="large"
              ></v-btn>
              <v-btn
                variant="text"
                color="white"
                icon="mdi-thumb-up"
                size="large"
              ></v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-main class="netflix-bg">
      <v-container>
        <!-- Season Overview -->
        <v-row class="mb-8">
          <v-col cols="12">
            <div class="stats-section pa-6">
              <h2 class="text-h4 font-weight-bold mb-4 text-white">
                {{ season.name }}
              </h2>
              <p class="text-body-1 text-grey-lighten-1 mb-4">
                {{ season.overview }}
              </p>
              <div class="d-flex ga-4 flex-wrap">
                <v-chip color="red" variant="elevated">
                  <v-icon start>mdi-star</v-icon>
                  {{ season.vote_average }}
                </v-chip>
                <v-chip color="grey-darken-1">
                  <v-icon start>mdi-calendar</v-icon>
                  {{ new Date(episode.air_date).getFullYear() }}
                </v-chip>
                <v-chip color="grey-darken-1">
                  <v-icon start>mdi-television</v-icon>
                  {{ episodes.length }} Episode{{
                    episodes.length > 1 ? "s" : ""
                  }}
                </v-chip>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Episode Details -->
        <v-row class="mb-8">
          <v-col cols="12">
            <h3 class="text-h4 font-weight-bold mb-6 text-white">
              Episodes ({{ episodes.length }})
            </h3>
          </v-col>

          <v-col v-for="ep in episodes" :key="ep.id" cols="12" class="mb-4">
            <router-link to="ep.">
              <v-card class="episode-card" elevation="8">
                <v-row no-gutters>
                  <v-col cols="12" md="4">
                    <v-img
                      :src="
                        ep.still_path
                          ? 'https://image.tmdb.org/t/p/w500' + ep.still_path
                          : 'https://via.placeholder.com/500x281?text=No+Image'
                      "
                      height="250"
                      cover
                      class="rounded-s"
                    >
                      <div class="d-flex align-center justify-center h-100">
                        <v-btn
                          icon="mdi-play-circle"
                          size="x-large"
                          color="white"
                          variant="text"
                          @click="playEpisode(ep)"
                        ></v-btn>
                      </div>
                    </v-img>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-card-text class="pa-6">
                      <div
                        class="d-flex justify-space-between align-start mb-3"
                      >
                        <div>
                          <h4 class="text-h5 font-weight-bold text-white mb-2">
                            {{ ep.episode_number }}. {{ ep.name }}
                          </h4>
                          <p class="text-caption text-grey-lighten-1">
                            {{ ep.runtime }} min • {{ formatDate(ep.air_date) }}
                          </p>
                        </div>
                        <v-rating
                          :model-value="ep.vote_average / 2"
                          readonly
                          color="yellow-darken-3"
                          density="compact"
                          half-increments
                          size="small"
                        ></v-rating>
                      </div>

                      <p class="text-body-2 text-grey-lighten-1 mb-4">
                        {{ ep.overview || "No overview available." }}
                      </p>

                      <div class="d-flex flex-wrap ga-2">
                        <v-chip size="small" color="grey-darken-2">
                          {{ ep.episode_type }}
                        </v-chip>
                        <v-chip
                          v-if="ep.production_code"
                          size="small"
                          color="grey-darken-2"
                        >
                          Production: {{ ep.production_code }}
                        </v-chip>
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </router-link>
          </v-col>
        </v-row>

        <!-- Crew Section -->
        <v-row class="mb-8">
          <v-col cols="12">
            <h3 class="text-h4 font-weight-bold mb-6 text-white">Crew</h3>
            <div class="crew-section pa-4">
              <v-row>
                <v-col
                  v-for="member in episode.crew"
                  :key="member.credit_id"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card class="crew-card" color="grey-darken-4" elevation="4">
                    <v-row no-gutters>
                      <v-col cols="4">
                        <v-img
                          :src="
                            member.profile_path
                              ? 'https://image.tmdb.org/t/p/w200' +
                                member.profile_path
                              : 'https://via.placeholder.com/200x300?text=No+Photo'
                          "
                          height="120"
                          cover
                        ></v-img>
                      </v-col>
                      <v-col cols="8">
                        <v-card-text class="pa-3">
                          <h6
                            class="text-subtitle-2 font-weight-bold text-white mb-1"
                          >
                            {{ member.name }}
                          </h6>
                          <p class="text-caption text-grey-lighten-1 mb-1">
                            {{ member.job }}
                          </p>
                          <p class="text-caption text-grey-lighten-2">
                            {{ member.department }}
                          </p>
                        </v-card-text>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>

        <!-- Cast Section -->
        <v-row>
          <v-col cols="12">
            <h3 class="text-h4 font-weight-bold mb-6 text-white">Cast</h3>
            <div class="d-flex overflow-x-auto ga-4 pb-4">
              <v-card
                v-for="actor in episode.guest_stars"
                :key="actor.credit_id"
                class="cast-card flex-shrink-0"
                width="180"
                color="grey-darken-4"
                elevation="8"
              >
                <v-img
                  :src="
                    actor.profile_path
                      ? 'https://image.tmdb.org/t/p/w300' + actor.profile_path
                      : 'https://via.placeholder.com/300x450?text=No+Photo'
                  "
                  height="240"
                  cover
                >
                  <template v-if="!actor.profile_path">
                    <div
                      class="d-flex align-center justify-center h-100 bg-grey-darken-3"
                    >
                      <v-icon size="64" color="grey-lighten-1"
                        >mdi-account</v-icon
                      >
                    </div>
                  </template>
                </v-img>
                <v-card-text class="pa-3">
                  <h6 class="text-subtitle-2 font-weight-bold text-white mb-1">
                    {{ actor.name }}
                  </h6>
                  <p class="text-caption text-grey-lighten-1">
                    {{ actor.character }}
                  </p>
                  <v-chip size="x-small" color="grey-darken-2" class="mt-2">
                    Order: {{ actor.order }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script setup>
import { GetDetailTVSeason } from "@/api/Tv.api";
import { API_IMAGE_URL_ORIGINAL } from "@/utils/const";
import { formatDate } from "@/utils/func";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isLoading = ref(true);
const { season_id, tv_id } = route.params;
const season = ref({});

const episodes = ref([]);
const episode = ref({});

const playEpisode = () => {
  console.log("Playing episode:", episode.value.name);
};

onMounted(async () => {
  isLoading.value = true;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  try {
    const responseSeason = await GetDetailTVSeason(tv_id, season_id);
    console.log(responseSeason);
    episode.value = responseSeason.episodes[0];
    episodes.value = responseSeason.episodes;
    season.value = responseSeason;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>
