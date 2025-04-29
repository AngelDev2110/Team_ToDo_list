<template>
  <Dialog
    v-model:visible="visible"
    modal
    :closable="!isLoading"
    :header="props.header"
    :style="{ minWidth: '25rem' }"
  >
    <slot />
    <div class="buttonsContainer">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        :disabled="isLoading"
        @click="handleCancel"
      />
      <Button
        type="button"
        label="Save"
        :disabled="isLoading"
        @click="handleSave"
      />
    </div>
  </Dialog>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from "vue";
import { Dialog, Button } from "primevue";

const props = defineProps({
  modelValue: Boolean,
  header: String,
  on_cancel: Function,
  on_save: Function,
});

const emit = defineEmits(["update:modelValue"]);

const isLoading = ref(false);

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleCancel = async () => {
  try {
    await props.on_cancel?.();
    visible.value = false;
  } catch (error) {}
};

const handleSave = async () => {
  try {
    isLoading.value = true;
    await props.on_save?.();
    visible.value = false;
  } catch (error) {}
  isLoading.value = false;
};
</script>

<style lang="sass">
.buttonsContainer
  display: flex
  justify-content: flex-end
  gap: 12px
</style>
