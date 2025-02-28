import "./assets/styles/normalize.css";
import Aura from "@primevue/themes/aura";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import "primeicons/primeicons.css";

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(router)
  .mount("#app");
