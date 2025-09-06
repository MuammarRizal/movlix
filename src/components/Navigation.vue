<template>
  <v-app-bar app flat color="primary" dark>
    <!-- Logo -->
    <v-toolbar-title class="font-weight-bold d-flex align-center">
      <!-- <img
        src="https://i.pravatar.cc/300"
        alt="Logo"
        height="32"
        class="mr-2"
      /> -->
      MovieDB
    </v-toolbar-title>

    <!-- Nav Items -->
    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/movies">Movies</v-btn>
    <v-btn text to="/tv">TV Shows</v-btn>
    <v-btn text to="/people">People</v-btn>

    <v-spacer></v-spacer>

    <!-- Tombol Tambah (Menu) -->
    <v-menu>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="onAddMovie">
          <v-list-item-title>Tambahkan Film Baru</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onAddSeries">
          <v-list-item-title>Tambah Serial TV Baru</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Translate Button -->
    <v-btn icon @click="toggleLanguage">
      <v-icon>mdi-translate</v-icon>
    </v-btn>

    <!-- Notifications -->
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <!-- Profile Menu -->
    <v-menu>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar size="32">
            <img src="https://i.pravatar.cc/300" alt="Profile" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Search -->
    <v-text-field
      v-model="search"
      placeholder="Search..."
      hide-details
      dense
      flat
      solo-inverted
      prepend-inner-icon="mdi-magnify"
      class="ml-4"
      style="max-width: 220px"
    ></v-text-field>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";

const search = ref("");

function onAddMovie() {
  console.log("Tambah film baru diklik");
}

function onAddSeries() {
  console.log("Tambah serial TV baru diklik");
}

function toggleLanguage() {
  console.log("Ganti bahasa diklik");
}
</script>

<style scoped>
.v-btn {
  text-transform: none !important; /* biar mirip TMDB, teks tidak uppercase */
}
</style>
