<template>
  <section>
    <v-container fluid>
      <div class="d-flex ga-5 align-center">
        <h2 class="ms-14">{{ title }}</h2>

        <div v-if="button_switch" class="button-switch">
          <button-switch @handlePeriod="onHandlePeriod" />
        </div>
      </div>
      <v-row>
        <v-slide-group v-if="!loading" show-arrows class="pa-2 mt-5">
          <slot></slot>
        </v-slide-group>
        <v-slide-group v-else show-arrows class="pa-2 mt-5">
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
  link: {
    type: String,
    default: "/",
  },
  button_switch: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["handlePeriod"]);

const onHandlePeriod = (value) => {
  emit("handlePeriod", value);
};
</script>
