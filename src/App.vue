<template>
    <section class="hero is-fullheight is-dark">
        <div class="hero-head">
            <nav class="navbar">
                <div class="navbar-brand">
                    <router-link class="navbar-item" to="/">
                        <img src="logo3.svg" alt="Logo" style="width: auto; height: 1.4rem" />
                    </router-link>
                    <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="navbar-menu" :class="{ 'is-active': showNav }">
                    <div class="navbar-start">
                        <router-link class="navbar-item" to="/">Home</router-link>
                        <router-link class="navbar-item" to="/spotify">Spotify</router-link>
                        <router-link class="navbar-item" to="/deezer">Deezer</router-link>
                        <router-link class="navbar-item" to="/soundCloud">SoundCloud</router-link>
                        <router-link class="navbar-item" to="/about">About</router-link>
                    </div>
                    <div class="navbar-end">
                        <router-link class="navbar-item" to="/">
                            <button class="button is-primary is-outlined">
                                Sign up
                            </button>
                        </router-link>
                        <router-link class="navbar-item" to="/">
                            <button class="button is-primary is-outlined">
                                Login
                            </button>
                        </router-link>
                    </div>
                </div>
            </nav>
        </div>
        <div class="hero-body">
            <div class="container mt-6">
                <router-view></router-view>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
@import '@/assets/styles/main.scss';

#app {
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: $size-normal;
    color: $light !important;
}
</style>

<script>
export default {
    name: 'App',
    data() {
        return {
            showNav: false,
        };
    },
};
</script>
