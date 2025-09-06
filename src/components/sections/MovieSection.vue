<template>
  <section>
    <v-container fluid>
      <h2 class="mb-4 ms-14">{{ title }}</h2>
      <v-row>
        <v-slide-group v-if="!loading" show-arrows class="pa-2">
          <slot></slot>
        </v-slide-group>
        <v-slide-group v-else show-arrows class="pa-2">
          <v-slide-group-item v-for="n in 10" :key="n">
            <skeleton-card class="mx-2" />
          </v-slide-group-item>
        </v-slide-group>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { API_IMAGE_URL_W500 } from "@/utils/const";

defineProps({
  title: {
    type: String,
    default: "Title",
  },
  loading: {
    type: Boolean,
    default: true,
  },
});
</script>
