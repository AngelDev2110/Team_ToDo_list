<script>
import { API } from "./lib/supabaseClient";
export default {
  methods: {
    handleLogin: async () => {
      try {
        const { error } = await API.auth.signInWithPassword({
          email: "exampleEmail@email.com",
          password: "examplePassword",
        });
        if (error) throw error;
        alert("Loggeo exitoso!");
      } catch (error) {
        console.error(error);
      }
    },
    handleLogout: async () => {
      try {
        const { error } = await API.auth.signOut();
        if (error) throw error;
        alert("Logout exitoso!");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <main class="container">
    <button @click="handleLogin">Iniciar Sesión</button>
    <button @click="handleLogout">Cerrar sesión</button>
  </main>
</template>

<style scoped lang="sass">
.container
  display: flex
  justify-content: center
  align-items: center
button
  cursor: pointer
  padding: 10px 20px
  margin: 10px
  border: none
  border-radius: 5px
  background-color: #007bff
  color: white
  font-size: 16px
  transition: background-color 0.3s
  &:hover
    background-color: #0056b3
</style>
