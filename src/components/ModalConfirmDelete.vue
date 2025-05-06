<template>
  <Modal
    v-model:visible="visible"
    header="Confirmar"
    :on_save="handleSave"
    :on_cancel="handleCancel"
  >
    <p>
      Seguro que desea eliminar la tarea <strong>{{ props.task.title }}</strong>
    </p>
  </Modal>
</template>

<script setup>
import Modal from "./Modal.vue";
import emitter from "@/utils/emits/globalEmitter";
import { deleteTask } from "@/lib/tasks";
import { computed, watch, nextTick } from "vue";

const props = defineProps({
  modelValue: Boolean,
  task: Object,
});
const emit = defineEmits(["update:modelValue", "clearTask"]);

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleSave = async () => {
  try {
    await deleteTask(props.task.id);
    emitter.emit("reloadTasksTable");
  } catch (error) {}
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};

watch(visible, async (newValue) => {
  if (!newValue) {
    await nextTick();
    emit("clearTask");
  }
});
</script>
