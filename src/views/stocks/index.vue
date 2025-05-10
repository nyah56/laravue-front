<template>
  <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <BasicDataTable
        :data="supplier"
        :headers="header"
        create-url="/stocks/create"
        @edit="getById"
        @delete="openDialog"
        trashed-url="/stocks/trashed"
        main-url="/suppliers"
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
import { router } from '@/router';
const showDialog = ref(false);

const headers = [
  // Do NOT include id
  { key: 'product_name', title: 'Product Name', value: 'product_name' },
  { key: 'quantity', title: 'Quantity', value: 'quantity' },
  { key: 'description', title: 'Description', value: 'description' },
  { key: 'action', title: 'Action', value: 'action' }
  //   { text: 'Actions', value: 'actions', sortable: false }
];
const header = ref(headers);
const supplier = ref([]);
const getById = (item: any) => {
  // console.log(item);
  router.push(`/stocks/edit/${item.id}`);
};
const deleteId = ref('');
// const test = async () => {
//   const response = await api.get('/api/user');
//   console.log(response.data);
// };
const getData = async () => {
  try {
    const response = await api.get('/api/stocks');
    // console.log(response.data.data);
    supplier.value = response.data.data;
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
    const response = await api.delete(`/api/stocks/${deleteId.value}`);
    // console.log(response.data.data);
    // supplier.value = response.data.data;
    // console.log(products.value);
    await getData();
  } catch (error) {
    console.error(error);
  }
};

const page = ref({ title: 'Supplier' });
onMounted(() => {
  getData();
  // test();
  //   getDeleted();
});
</script>
@/utils/axios @/utils/api
