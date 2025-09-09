<template>Episode detail</template>

<script>
import { GetDetailTVEpisode } from "@/api/Tv.api";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { tv_id, season_id, episode_id } = route.params;

onMounted(async () => {
  try {
    const responseData = await GetDetailTVEpisode(tv_id, season_id, episode_id);
    console.log(responseData);
  } catch (error) {
    console.log(error);
  }
});
</script>
