<template>
  <Card>
    <template #content>
      <DataTable
        :loading="loading"
        :rows="10"
        :value="data"
        filterDisplay="row"
        v-model:filters="filters"
      >
        <template #header>
          <div class="tableHeader">
            <p class="tableTitle">{{ props.header }}</p>
            <div class="tableHeaderActions">
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Keyword Search"
                />
              </IconField>

              <Button
                type="button"
                icon="pi pi-refresh"
                text
                @click="onGetData"
              />
            </div>
          </div>
        </template>

        <template v-if="$slots.columns">
          <slot name="columns" />
        </template>

        <Column
          v-if="props.onEditRow || props.onDeleteRow"
          style="text-align: center"
        >
          <template #body="{ data }">
            <div class="tableActions">
              <Button
                v-if="props.onEditRow"
                type="button"
                icon="pi pi-pencil"
                class="p-button-success"
                @click="() => props.onEditRow(data)"
              />
              <Button
                v-if="props.onDeleteRow"
                type="button"
                icon="pi pi-trash"
                class="p-button-danger"
                @click="() => props.onDeleteRow(data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup>
import {
  Button,
  Card,
  Column,
  DataTable,
  IconField,
  InputIcon,
  InputText,
} from "primevue";
import { defineProps, onMounted, ref } from "vue";
import { FilterMatchMode } from "@primevue/core/api";

const props = defineProps({
  header: String,
  getData: Function,
  onDeleteRow: Function,
  onEditRow: Function,
});

const data = ref([]);
const loading = ref(false);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const onGetData = async () => {
  try {
    loading.value = true;
    const _data = await props.getData();
    data.value = _data;
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
};

onMounted(() => {
  onGetData();
});
</script>

<style lang="sass">
.tableActions
    display: flex
    justify-content: center
    align-items: center
    gap: 0.5rem
.tableHeader
    display: flex
    justify-content: space-between
    align-items: center
    gap: 1rem
.tableHeaderActions
    display: flex
    gap: 1rem
.tableTitle
    font-size: 2rem
    font-weight: bold
    margin: 0
    padding: 0
.p-datatable-thead tr:nth-child(2)
  display: none;
</style>
