<template>
  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <Card>
      <template #content>
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors }"
          class="login-form"
        >
          <div class="p-field">
            <label for="email">Correo electrónico</label>
            <Field name="email" v-slot="{ field }">
              <InputText v-bind="field" placeholder="Ingresa tu email" />
            </Field>
            <small v-if="errors.email" class="p-error">{{
              errors.email
            }}</small>
          </div>

          <div class="p-field">
            <label for="password">Contraseña</label>
            <Field name="password" v-slot="{ field }">
              <Password
                v-bind="field"
                placeholder="Ingresa tu contraseña"
                :feedback="false"
              />
            </Field>
            <small v-if="errors.password" class="p-error">{{
              errors.password
            }}</small>
          </div>

          <Button label="Iniciar Sesión" type="submit" class="p-button" />
        </Form>
      </template>
    </Card>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { Button, InputText, Password, Card } from "primevue";
import { API } from "@/lib/supabaseClient";

export default {
  name: "Login",
  components: {
    Button,
    Card,
    Form,
    Field,
    InputText,
    Password,
  },
  data() {
    return {
      schema: yup.object().shape({
        email: yup
          .string()
          .email("El correo no es válido")
          .required("El correo es requerido"),
        password: yup
          .string()
          .min(6, "La contraseña debe tener al menos 6 caracteres")
          .required("La contraseña es requerida"),
      }),
    };
  },
  methods: {
    async onSubmit(values) {
      const { email, password } = values;
      const { error } = await API.auth.signInWithPassword({ email, password });
      if (error) {
        console.error(error);
        alert("Error al iniciar sesión: " + error.message);
      } else {
        alert("¡Loggeo exitoso!");
        // this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style scoped lang="sass">
.login-container
  height: 100vh
  width: 100vw
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  padding: 1rem

  h1
    font-size: 2.5rem
    margin-bottom: 1rem
    text-align: center

  .p-card
    width: 100%
    max-width: 400px
    padding: 2rem
    border-radius: 8px
    display: flex
    flex-direction: column
    gap: 1.5rem
    :deep(.login-form)
      .p-field
        display: flex
        flex-direction: column
        margin-bottom: 1.5rem
        width: 100%
        gap: 4px
        .p-formfield
          input
            width: 100%
            padding: 0.75rem
        .p-password
          width: 100%
          input
            width: 100%

.p-error
  font-size: 0.875rem
  margin-top: 0.25rem
  color: #f87171

.p-button
  width: 100%
  padding: 0.75rem
</style>
