<template>
  <v-app>
    <skeleton-detail v-if="isLoading" />
    <v-main v-else>
      <!-- HERO -->
      <section
        class="movie-hero"
        :style="`background-image: linear-gradient(to right, rgba(8,10,15,0.9) 25%, rgba(8,10,15,0.5) 100%), url(${API_IMAGE_URL_ORIGINAL}${movie.backdrop_path})`"
      >
        <v-container class="py-16">
          <v-row class="align-center">
            <!-- Poster -->
            <v-col cols="12" md="3" class="d-flex justify-center mb-6 mb-md-0">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  class="poster-card"
                  elevation="10"
                  :class="{ 'poster-hover': isHovering }"
                >
                  <v-img
                    :src="API_IMAGE_URL_ORIGINAL + movie.poster_path"
                    aspect-ratio="2/3"
                    class="rounded-lg"
                  />
                  <v-card-text class="text-center pt-4">
                    <div class="text-h6">Rating</div>
                    <div class="text-h3 font-weight-bold text-primary">
                      {{ Number(movie.vote_average).toFixed(1) }}
                    </div>
                    <div class="caption">({{ movie.vote_count }} votes)</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>

            <!-- Info -->
            <v-col cols="12" md="9">
              <div class="d-flex flex-column ga-4 text-white">
                <h1 class="display-1 font-weight-bold">{{ movie.title }}</h1>
                <div class="text-h6 font-italic text-grey-lighten-2">
                  {{ movie.tagline }}
                </div>

                <!-- Meta -->
                <div class="d-flex flex-wrap ga-2">
                  <v-chip
                    v-for="g in movie.genres"
                    :key="g.id"
                    small
                    variant="outlined"
                    color="primary"
                  >
                    {{ g.name }}
                  </v-chip>
                  <v-chip
                    v-for="c in movie.origin_country"
                    :key="c"
                    small
                    variant="outlined"
                    color="secondary"
                  >
                    {{ c }}
                  </v-chip>
                </div>

                <!-- Dates & Numbers -->
                <v-row class="mt-6">
                  <v-col
                    cols="6"
                    sm="3"
                    v-for="meta in metaData"
                    :key="meta.label"
                  >
                    <div class="caption text-grey-lighten-1">
                      {{ meta.label }}
                    </div>
                    <div class="text-subtitle-1">{{ meta.value }}</div>
                  </v-col>
                </v-row>

                <!-- Action -->
                <div class="d-flex ga-3 mt-8">
                  <v-btn
                    color="red-accent-4"
                    dark
                    size="large"
                    :href="movie.homepage"
                    target="_blank"
                  >
                    <v-icon left>mdi-play</v-icon>
                    Watch Now
                  </v-btn>
                  <v-btn
                    variant="outlined"
                    size="large"
                    color="amber"
                    :href="`https://www.imdb.com/title/${movie.imdb_id}`"
                    target="_blank"
                  >
                    IMDb
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- MAIN CONTENT -->
      <v-container class="py-12">
        <v-row>
          <!-- Overview -->
          <v-col cols="12" md="8">
            <section>
              <h2 class="text-h5 mb-3">Overview</h2>
              <p class="body-1">{{ movie.overview }}</p>
            </section>

            <v-divider class="my-6" />

            <!-- Languages & Countries -->
            <section>
              <h2 class="text-h5 mb-3">Languages & Countries</h2>
              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="sl in movie.spoken_languages"
                  :key="sl.iso_639_1"
                  size="small"
                  color="blue-grey-lighten-3"
                  text-color="black"
                >
                  {{ sl.english_name }} ({{ sl.iso_639_1 }})
                </v-chip>
                <v-chip
                  v-for="pc in movie.production_countries"
                  :key="pc.iso_3166_1"
                  size="small"
                  color="green-lighten-3"
                  text-color="black"
                >
                  {{ pc.name }}
                </v-chip>
              </div>
            </section>
          </v-col>

          <!-- Sidebar -->
          <v-col cols="12" md="4">
            <!-- Companies -->
            <section>
              <h2 class="text-h5 mb-3">Production Companies</h2>
              <v-row dense>
                <v-col
                  v-for="p in movie.production_companies"
                  :key="p.id"
                  cols="12"
                  sm="6"
                >
                  <v-card class="pa-3 d-flex align-center company-card">
                    <v-avatar size="44" class="me-3">
                      <v-img
                        v-if="p.logo_path"
                        :src="API_IMAGE_URL_ORIGINAL + p.logo_path"
                        alt="logo"
                      />
                      <v-icon v-else>mdi-domain</v-icon>
                    </v-avatar>
                    <div>
                      <div class="subtitle-2 text-company">
                        {{ p.name }}
                      </div>
                      <div class="caption text-grey">
                        {{ p.origin_country }}
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </section>

            <v-divider class="my-6" />

            <!-- Stats -->
            <section>
              <h2 class="text-h5 mb-3">Stats</h2>
              <v-card elevation="2" class="pa-4">
                <div class="d-flex justify-space-between align-center mb-4">
                  <div>
                    <div class="caption">Popularity</div>
                    <div class="text-h6">{{ movie.popularity }}</div>
                  </div>
                  <div>
                    <div class="caption">Status</div>
                    <v-chip color="success" size="small">{{
                      movie.status
                    }}</v-chip>
                  </div>
                </div>
                <div class="caption mb-2">Rating</div>
                <v-progress-linear
                  :model-value="(movie.vote_average / 10) * 100"
                  height="10"
                  color="amber"
                  rounded
                />
              </v-card>
            </section>
          </v-col>
        </v-row>
      </v-container>

      <!-- FOOTER -->
      <v-footer class="bg-grey-darken-4 py-6">
        <v-container>
          <div
            class="d-flex justify-space-between align-center text-grey-lighten-1"
          >
            <span
              ><strong>{{ movie.original_title }}</strong> •
              {{ movie.release_date }}</span
            >
          </div>
        </v-container>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script setup>
import { GetDetailMovie } from "@/api/Movies.api";
import { API_IMAGE_URL_ORIGINAL } from "@/utils/const";
import { formatDate, formatNumber } from "@/utils/func";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const movie = ref({});
const id = route.params.movie_id;
const isLoading = ref(true);
const metaData = ref([]);

onMounted(async () => {
  isLoading.value = true;
  try {
    const responseApi = await GetDetailMovie(id);
    movie.value = responseApi;
    metaData.value = [
      { label: "Release Date", value: formatDate(movie.value.release_date) },
      { label: "Runtime", value: movie.value.runtime + " min" },
      { label: "Budget", value: "$" + formatNumber(movie.value.budget) },
      { label: "Revenue", value: "$" + formatNumber(movie.value.revenue) },
    ];
  } catch (error) {
    console.log({ error });
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.movie-hero {
  background-size: cover;
  background-position: center;
  min-height: 80vh;
  color: white;
}
.poster-card {
  width: 240px;
  transition: transform 0.3s, box-shadow 0.3s;
}
.poster-hover {
  transform: scale(1.05);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
}
.company-card {
  border: 1px solid #eee;
  border-radius: 8px;
  transition: background 0.3s;
}
.company-card:hover {
  background: #f5f5f5;
}

.company-card:hover .text-company {
  color: black;
}
</style>
