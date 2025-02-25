<script>
import { Transition } from "vue";
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    Transition,
    RouterView,
  },
};
</script>

<template>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style lang="sass">
.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s

.fade-enter-from, .fade-leave-to
  opacity: 0
</style>
