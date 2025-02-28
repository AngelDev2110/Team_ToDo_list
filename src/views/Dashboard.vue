<template>
  <div class="menubarContainer">
    <Menubar :model="items" />
  </div>
</template>

<script setup>
import { Menubar } from "primevue";
import { ref } from "vue";
import { API } from "@/lib/supabaseClient";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = async () => {
  try {
    const { error } = await API.auth.signOut();
    if (error) console.error("Error logging out:", error.message);
    else router.push({ name: "Login" });
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

const items = ref([
  {
    label: "Cerrar Sesión",
    icon: "pi pi-fw pi-sign-out",
    command: logout,
  },
]);
</script>

<style lang="sass">
.menubarContainer
  padding: 1rem
</style>
