<template>
  <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <BasicDataTable
        :data="products"
        :headers="header"
        create-url="/products/create"
        trashed-url="/products/trashed"
        main-url="/products"
        @delete="openDialog"
      />
      <ConfirmDelete v-model:dialog="showDialog" @confirm-delete="deleteData" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import BasicDataTable from '@/components/shared/BasicDataTable.vue';
import ConfirmDelete from '@/components/shared/ConfirmDelete.vue';
import { ref, onMounted } from 'vue';
import { api } from '@/utils/api';
const headers = [
  // Do NOT include id
  { key: 'name', title: 'Name', value: 'name' },
  { key: 'supplier_name', title: 'Supplier Name', value: 'supplier_name' },
  { key: 'price', title: 'Price', value: 'price' },
  { key: 'properties', title: 'Properties', value: 'properties' },
  { key: 'action', title: 'Action', value: 'action' }
  //   { text: 'Actions', value: 'actions', sortable: false }
];
const header = ref(headers);
const products = ref([]);
const showDialog = ref(false);
const deleteId = ref();
const getData = async () => {
  try {
    const response = await api.get('/api/products');
    // console.log(response.data.data);
    products.value = response.data.data;
    // console.log(products.value);
  } catch (error) {
    console.error(error);
  }
};
const openDialog = (item: any) => {
  showDialog.value = true;
  deleteId.value = item.id;
};
const deleteData = async () => {
  // showDialog.value = true;
  // console.log(item);

  try {
    const response = await api.delete(`/api/products/${deleteId.value}`);
    // console.log(response.data.data);
    // supplier.value = response.data.data;
    // console.log(products.value);
    await getData();
  } catch (error) {
    console.error(error);
  }
};
// const getDeleted = async () => {
//   try {
//     const response = await api.get('/api/supplier/restore-deleted/');
//     console.log(response.data.data);
//     // products.value = response.data.data;
//     // console.log(products.value);
//   } catch (error) {
//     console.error(error);
//   }
// };
const page = ref({ title: 'Sample Page' });
onMounted(() => {
  getData();
  // getDeleted();
});
</script>
@/utils/axios
