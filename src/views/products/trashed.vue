<template>
  <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <BasicDataTable
        :data="supplier"
        :headers="header"
        :edit="false"
        :delete="false"
        :restore="true"
        @restore="openDialog"
        create-url="/products/create"
        trashed-url="/products/trashed"
        main-url="/products"
      />
      <ConfirmDelete
        v-model:dialog="showDialog"
        title="Data Restore"
        text="Your Data Will Be Restored to main Database"
        @confirm-delete="restoreData"
      />
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
  { key: 'name', title: 'Company Name', value: 'name' },
  { key: 'address', title: 'Address', value: 'address' },
  { key: 'contacts', title: 'Contacts', value: 'contacts' },
  { key: 'action', title: 'Action', value: 'action' }
  //   { text: 'Actions', value: 'actions', sortable: false }
];
const header = ref(headers);
const supplier = ref([]);

const deleteId = ref('');
const openDialog = (item: any) => {
  showDialog.value = true;
  deleteId.value = item.id;
};
const getData = async () => {
  try {
    const response = await api.get('/api/products/trashed/');
    // console.log(response.data.data);
    supplier.value = response.data.data;
    // console.log(products.value);
  } catch (error) {
    console.error(error);
  }
};
const restoreData = async () => {
  // showDialog.value = true;
  //   console.log(deleteId.value);

  try {
    const response = await api.get(`/api/products/restore/${deleteId.value}`);
    // console.log(response.data.data);
    // supplier.value = response.data.data;
    // console.log(products.value);
    await getData();
  } catch (error) {
    console.error(error);
  }
};

const page = ref({ title: 'Products' });
onMounted(() => {
  getData();
  //   getDeleted();
});
</script>
@/utils/axios @/utils/api
