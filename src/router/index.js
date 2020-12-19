import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Spotify from "../views/Spotify.vue";
import Deezer from "../views/Deezer.vue";
import SoundClound from "../views/SoundCloud.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/spotify",
    name: "Spotify",
    component: Spotify
  },
  {
    path: "/deezer",
    name: "Deezer",
    component: Deezer
  },
  {
    path: "/soundCloud",
    name: "SoundClound",
    component: SoundClound
  },
  {
    path: "/about",
    name: "About",
    component: About
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
