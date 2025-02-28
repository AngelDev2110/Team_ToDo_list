<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="props.header"
    :style="{ minWidth: '25rem' }"
  >
    <slot />
    <div class="buttonsContainer">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="handleCancel"
      ></Button>
      <Button type="button" label="Save" @click="handleSave"></Button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { Dialog, Button } from "primevue";

const props = defineProps({
  visible: Boolean,
  header: String,
  on_cancel: Function,
  on_save: Function,
});

const visible = ref(props.visible);
const emit = defineEmits(["update:visible"]);
const handleCancel = async () => {
  try {
    await props.on_cancel();
    visible.value = false;
  } catch (error) {}
};

const handleSave = async () => {
  try {
    await props.on_save();
    visible.value = false;
  } catch (error) {}
};

watch(props.visible, (newValue) => {
  visible.value = newValue;
  emit("update:visible", newValue);
});
</script>

<style lang="sass">

.buttonsContainer
  display: flex
  justify-content: flex-end
  gap: 12px
</style>
