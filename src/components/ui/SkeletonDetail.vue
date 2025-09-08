<template>
  <v-container fluid class="pa-0">
    <!-- Backdrop -->
    <v-skeleton-loader type="image" height="500" class="position-relative" />

    <v-container>
      <v-row>
        <!-- Poster -->
        <v-col cols="12" md="3">
          <v-skeleton-loader type="image" height="400" class="rounded-lg" />
        </v-col>

        <!-- Info -->
        <v-col cols="12" md="9" class="text-white">
          <v-skeleton-loader type="heading" width="60%" class="mb-2" />
          <v-skeleton-loader type="text" width="40%" />

          <!-- Action Buttons -->
          <div class="d-flex ga-2 my-4">
            <v-skeleton-loader type="button" width="120" />
            <v-skeleton-loader type="button" width="120" />
          </div>

          <!-- Meta Info -->
          <div class="d-flex flex-wrap ga-4">
            <v-skeleton-loader
              type="text"
              width="120"
              v-for="i in 4"
              :key="i"
            />
          </div>

          <!-- Genres -->
          <div class="mt-2 d-flex flex-wrap">
            <v-skeleton-loader
              v-for="i in 3"
              :key="i"
              type="chip"
              class="ma-1"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Overview -->
    <v-container class="mt-8">
      <v-skeleton-loader type="heading" width="30%" />
      <v-skeleton-loader type="paragraph" class="mt-2" />
    </v-container>

    <!-- Creators -->
    <v-container class="mt-8">
      <v-skeleton-loader type="heading" width="30%" class="mb-4" />
      <v-row>
        <v-col v-for="i in 4" :key="i" cols="12" sm="6" md="3">
          <v-card class="pa-2 text-center">
            <v-skeleton-loader type="avatar" class="mx-auto mb-2" />
            <v-skeleton-loader type="text" width="80%" class="mx-auto" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Last Episode -->
    <v-container class="mt-8">
      <v-skeleton-loader type="heading" width="40%" class="mb-4" />
      <v-card>
        <v-row>
          <v-col cols="12" md="4">
            <v-skeleton-loader type="image" height="200" />
          </v-col>
          <v-col cols="12" md="8">
            <v-skeleton-loader type="heading" width="60%" />
            <v-skeleton-loader type="text" width="40%" />
            <v-skeleton-loader type="paragraph" class="mt-2" />
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- Seasons -->
    <v-container class="mt-8">
      <v-skeleton-loader type="heading" width="40%" class="mb-4" />
      <v-row>
        <v-col v-for="i in 4" :key="i" cols="12" sm="6" md="3">
          <v-card>
            <v-skeleton-loader type="image" height="200" />
            <v-card-text>
              <v-skeleton-loader type="text" width="70%" />
              <v-skeleton-loader type="text" width="50%" />
              <v-skeleton-loader type="paragraph" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Production Companies -->
    <v-container class="mt-8">
      <v-skeleton-loader type="heading" width="50%" class="mb-4" />
      <v-row>
        <v-col
          v-for="i in 6"
          :key="i"
          cols="6"
          sm="3"
          md="2"
          class="text-center"
        >
          <v-skeleton-loader
            type="avatar"
            width="60"
            height="60"
            class="mx-auto"
          />
          <v-skeleton-loader type="text" width="80%" class="mx-auto mt-2" />
        </v-col>
      </v-row>
    </v-container>

    <!-- Networks -->
    <v-container class="mt-8">
      <v-skeleton-loader type="heading" width="40%" class="mb-4" />
      <v-row>
        <v-col
          v-for="i in 4"
          :key="i"
          cols="6"
          sm="3"
          md="2"
          class="text-center"
        >
          <v-skeleton-loader
            type="avatar"
            width="60"
            height="60"
            class="mx-auto"
          />
          <v-skeleton-loader type="text" width="70%" class="mx-auto mt-2" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
