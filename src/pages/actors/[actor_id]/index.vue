<template>
  <skeleton-detail v-if="isLoading" />

  <v-container v-else fluid class="pa-0">
    <!-- Header -->
    <v-img
      :src="`https://image.tmdb.org/t/p/original${actor.profile_path}`"
      height="400px"
      cover
      gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.9)"
    >
      <v-container class="fill-height d-flex align-end">
        <v-row>
          <!-- Profile Picture -->
          <v-col cols="12" md="3" class="d-flex justify-center">
            <v-img
              :src="`https://image.tmdb.org/t/p/w500${actor.profile_path}`"
              class="rounded-lg elevation-6"
              height="350"
              width="250"
              cover
            />
          </v-col>

          <!-- Info -->
          <v-col cols="12" md="9" class="text-white">
            <h1 class="text-h3 font-weight-bold">{{ actor.name }}</h1>
            <p class="text-subtitle-1">
              Department: {{ actor.known_for_department }}
            </p>

            <!-- Meta Info -->
            <div class="d-flex flex-wrap ga-4 text-subtitle-2 mt-2">
              <span v-if="actor.gender === 1">Gender: Female</span>
              <span v-else-if="actor.gender === 2">Gender: Male</span>
              <span v-else>Gender: Unknown</span>

              <span v-if="actor.birthday">Birthday: {{ actor.birthday }}</span>
              <span v-if="actor.place_of_birth"
                >Birth Place: {{ actor.place_of_birth }}</span
              >
              <span>Popularity: ⭐ {{ actor.popularity }}</span>
            </div>

            <!-- IMDb Link -->
            <div class="mt-4">
              <v-btn
                v-if="actor.imdb_id"
                :href="`https://www.imdb.com/name/${actor.imdb_id}`"
                target="_blank"
                color="amber"
                prepend-icon="mdi-filmstrip"
              >
                View on IMDb
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-img>

    <!-- Biography -->
    <v-container class="mt-8">
      <h2 class="text-h5 font-weight-bold mb-2">Biography</h2>
      <p>{{ actor.biography }}</p>
    </v-container>

    <!-- Also Known As -->
    <v-container v-if="actor.also_known_as?.length" class="mt-8">
      <h2 class="text-h5 font-weight-bold mb-2">Also Known As</h2>
      <v-chip
        v-for="(aka, index) in actor.also_known_as"
        :key="index"
        class="ma-1"
        color="primary"
        text-color="white"
      >
        {{ aka }}
      </v-chip>
    </v-container>
  </v-container>
</template>

<script setup>
import { GetActorDetail } from "@/api/People.api";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.actor_id;
const isLoading = ref(true);
const actor = ref({});

onMounted(async () => {
  isLoading.value = true;
  try {
    const response = await GetActorDetail(id);
    actor.value = response;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}
</style>
