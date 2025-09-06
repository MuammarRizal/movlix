<template>
  <v-card class="rounded-lg mx-2" elevation="4" max-width="250">
    <v-skeleton-loader
      class="rounded-t-lg"
      type="image"
      width="500"
      height="250"
    />

    <v-card-title>
      <v-skeleton-loader type="text" width="70%" />
    </v-card-title>

    <v-card-subtitle>
      <v-skeleton-loader type="text" width="50%" />
      <v-skeleton-loader type="text" width="30%" />
    </v-card-subtitle>
  </v-card>
</template>
