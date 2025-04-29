<template>
  <div class="menubarContainer">
    <Menubar :model="items" />
    <div class="topActions">
      <UsersSelect v-model="selectedUser" />
      <Button
        type="button"
        icon="pi pi-plus"
        text
        @click="() => (isModalAddTaskVisible = true)"
      />
    </div>
    <Table
      :getData="() => getTasks(userParam)"
      :onEditRow="() => {}"
      :onDeleteRow="() => {}"
      header="Tasks"
      class="table"
      reloadEvent="reloadTasksTable"
    >
      <template #columns>
        <Column field="title" header="Title" />
        <Column field="description" header="Description" />
        <Column field="is_completed" header="Status">
          <template #body="{ data }">
            <Tag v-if="data?.is_completed" severity="success">Completed</Tag>
            <Tag v-else severity="warn">Pending</Tag>
          </template>
        </Column>
        <Column field="due_date" header="Due Date" />
      </template>
    </Table>
    <ModalAddTask v-model="isModalAddTaskVisible" />
  </div>
</template>

<script setup>
//TODO: add reload table after add task
import { Button, Menubar, Column, Tag } from "primevue";
import { computed, ref } from "vue";
import { API } from "@/lib/supabaseClient";
import { useRouter } from "vue-router";
import { getTasks } from "@/lib/tasks";
import { Table, UsersSelect } from "@/components";
import ModalAddTask from "@/components/ModalAddTask.vue";

const isModalAddTaskVisible = ref(false);
const router = useRouter();
const selectedUser = ref(null);
const userParam = computed(() =>
  selectedUser.value ? { name: "user_id", value: selectedUser.value } : {}
);

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

<style lang="sass" scoped>
.menubarContainer
  padding: 1rem
.table
  margin-top: 1rem
.topActions
  display: flex
  justify-content: space-between
  align-items: center
  margin-top: 1rem
</style>
