<template>
  <v-container fluid class="pa-0">
    <v-sheet
      height="400"
      class="d-flex flex-column align-center justify-center text-center"
      :style="{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    >
      <div
        class="bg-black bg-opacity-50 w-100 h-100 d-flex flex-column align-center justify-center px-4"
      >
        <h1 class="text-h3 text-white font-weight-bold mb-2">
          {{ title }}
        </h1>
        <p class="text-subtitle-1 text-white mb-6">
          {{ subtitle }}
        </p>

        <slot />
      </div>
    </v-sheet>
  </v-container>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Selamat Datang di Aplikasi Kami",
  },
  subtitle: {
    type: String,
    default: "Temukan data dan informasi favoritmu di sini",
  },
  background: {
    type: String,
    default: "https://picsum.photos/1200/400?random",
  },
});
</script>
