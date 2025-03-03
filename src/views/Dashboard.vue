<template>
  <div class="menubarContainer">
    <Menubar :model="items" />
    <Table
      :getData="getTasks"
      :onEditRow="() => {}"
      :onDeleteRow="() => {}"
      header="Tasks"
      class="table"
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
  </div>
</template>

<script setup>
import { Menubar, Column, Tag } from "primevue";
import { ref } from "vue";
import { API } from "@/lib/supabaseClient";
import { useRouter } from "vue-router";
import { getTasks, createTask } from "@/lib/tasks";
import { Table } from "@/components";

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

<style lang="sass" scoped>
.menubarContainer
  padding: 1rem
.table
  margin-top: 1rem
</style>
