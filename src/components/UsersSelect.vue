<template>
  <Select
    v-model="selectedUser"
    v-bind="attrs"
    placeholder="Usuario"
    :options="options"
    option-label="name"
    option-value="code"
    showClear
  />
</template>

<script setup>
import { Select } from "primevue";
import {
  useAttrs,
  onMounted,
  ref,
  computed,
  watch,
  defineProps,
  defineEmits,
} from "vue";
import { getAllUsers } from "@/lib/users";

const props = defineProps({
  modelValue: [String, Number, null],
});
const emit = defineEmits(["update:modelValue"]);

const selectedUser = ref(props.modelValue);

watch(selectedUser, (newValue) => {
  emit("update:modelValue", newValue);
});
const users = ref([]);
onMounted(async () => {
  users.value = await getAllUsers();
});

const options = computed(() =>
  (users.value || []).map((user) => ({ name: user.email, code: user.id }))
);

watch(
  () => props.modelValue,
  (newValue) => {
    selectedUser.value = newValue;
  }
);

const attrs = useAttrs();
</script>
