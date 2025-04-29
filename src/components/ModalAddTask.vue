<template>
  <Modal
    v-model:visible="visible"
    header="Agregar Tarea"
    :on_save="handleSave"
    :on_cancel="handleCancel"
  >
    <Form
      @submit="onSubmit"
      ref="addTaskFormRef"
      :validation-schema="schema"
      v-slot="{ errors, handleSubmit }"
      :initial-values="{ is_completed: false }"
    >
      <div class="form-container">
        <div class="field">
          <label for="title">Título</label>
          <Field name="title" v-slot="{ field }">
            <InputText
              v-bind="field"
              id="title"
              :disabled="isLoading"
              class="input-field"
              :class="{ 'p-invalid': errors.title }"
            />
          </Field>
          <small class="p-error">{{ errors.title }}</small>
        </div>

        <div class="field">
          <label for="description">Descripción</label>
          <Field name="description" v-slot="{ field }">
            <Textarea
              v-bind="field"
              id="description"
              :disabled="isLoading"
              rows="3"
              class="input-field"
              :class="{ 'p-invalid': errors.description }"
            />
          </Field>
          <small class="p-error">{{ errors.description }}</small>
        </div>

        <div class="field">
          <label for="due_date">Fecha de Vencimiento</label>
          <Field name="due_date" v-slot="{ field }">
            <DatePicker
              v-bind="field"
              id="due_date"
              :disabled="isLoading"
              dateFormat="yy-mm-dd"
              class="input-field"
              :class="{ 'p-invalid': errors.due_date }"
            />
          </Field>
          <small class="p-error">{{ errors.due_date }}</small>
        </div>

        <div class="field">
          <Field name="user_id" v-slot="{ field }">
            <label for="user_id">Usuario</label>
            <UsersSelect v-bind="field" :disabled="isLoading" id="user_id" />
          </Field>
        </div>
        <div class="field-checkbox">
          <Field name="is_completed" v-slot="{ value, handleChange }">
            <Checkbox
              :model-value="value"
              :disabled="isLoading"
              @update:model-value="handleChange"
              :binary="true"
            />
          </Field>
          <label for="is_completed">Completada</label>
        </div>
      </div>
    </Form>
  </Modal>
</template>

<script setup>
import emitter from "@/utils/emits/globalEmitter";
import { computed, defineProps, defineEmits, ref } from "vue";
import Modal from "./Modal.vue";
import UsersSelect from "./UsersSelect.vue";
import { Checkbox, DatePicker, InputText, Textarea } from "primevue";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { createTask } from "@/lib/tasks";

const props = defineProps({
  modelValue: Boolean,
  task: Object,
});

const addTaskFormRef = ref(null);
const isLoading = ref(false);

const emit = defineEmits(["update:modelValue"]);

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const schema = yup.object({
  title: yup.string().required("El título es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
  due_date: yup.date().nullable().required("La fecha es obligatoria"),
  is_completed: yup.boolean().default(false),
  user_id: yup.string().required("El usuario es obligatorio"),
});

const handleSave = async () => {
  try {
    const { valid } = await addTaskFormRef.value.validate();
    if (valid) await onSubmit(addTaskFormRef.value.values);
    else console.error("Formulario inválido");
  } catch (error) {
    console.error(error);
  }
};

const handleCancel = () => {
  visible.value = false;
};

const onSubmit = async (values) => {
  try {
    isLoading.value = true;
    await createTask(values);
    emitter.emit("reloadTasksTable");
  } catch (error) {
    console.error(error);
  }
  visible.value = false;
  isLoading.value = false;
};
</script>

<style scoped lang="sass">
.form-container
  display: flex
  flex-direction: column
  gap: 1rem
  padding: 1rem


.field
  display: flex
  flex-direction: column


.field-checkbox
  display: flex
  gap: 0.5rem


label
  font-weight: bold
  margin-bottom: 0.5rem


.input-field
  border-radius: 5px


.checkbox
  margin-right: 0.5rem


.p-error
  color: red
  font-size: 0.85rem
</style>
