<template>
  <div
    class="d-flex rounded-pill overflow-hidden"
    style="border: 2px solid #1976d2; width: 200px; height: 40px"
  >
    <!-- Today -->
    <v-btn
      flat
      class="flex-1"
      :color="activeTab === 'day' ? 'blue' : ''"
      :variant="activeTab === 'day' ? 'flat' : 'text'"
      @click="onHandlePeriod('day')"
    >
      <span :class="activeTab === 'day' ? 'text-white' : 'text-blue'">
        Today
      </span>
    </v-btn>

    <!-- This Week -->
    <v-btn
      flat
      class="flex-1"
      :color="activeTab === 'week' ? 'blue' : ''"
      :variant="activeTab === 'week' ? 'flat' : 'text'"
      @click="onHandlePeriod('week')"
    >
      <span :class="activeTab === 'week' ? 'text-white' : 'text-blue'">
        This Week
      </span>
    </v-btn>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref("day"); // default Today aktif
const emit = defineEmits(["handlePeriod"]);

const onHandlePeriod = (value) => {
  emit("handlePeriod", value);
  activeTab.value = value;
};
</script>
