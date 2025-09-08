import { defineStore } from "pinia";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    allMovies: [],
  }),
});
