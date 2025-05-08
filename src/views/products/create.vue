<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { api } from '@/utils/api';
import { onMounted } from 'vue';
import SelectWithSearch from '@/components/shared/SelectWithSearch.vue';
// Use Yup to simplify validation schema
const { handleSubmit, defineField, handleReset, errors } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Company Name is Required').min(2, 'Company Name must be at least 2 characters'),
    supplier_id: yup.string().required('Supplier Name is Required'),
    price: yup.number().required(),
    properties: yup.object({
      size: yup.number().min(0),
      color: yup.string()
    })
  })
});

const [name] = defineField('name');
const [supplier_id] = defineField('supplier_id');
const [product_image] = defineField('product_image');
const [price] = defineField('price');
const [size] = defineField('properties.size');
const [color] = defineField('properties.color');

// const select = useField<string>('select');
// console.log(typeof errors);
const postData = async (data: object) => {
  try {
    const response = await api.post('/api/products/', data);
    // console.log(response.data.data);
  } catch (error: any) {
    switch (error.status) {
      case 422:
        console.error(error.response.data.message);
        break;
    }
  }
};
const submit = handleSubmit(async (values) => {
  // console.log(values);
  await postData(values);
});

const supplier = ref();
interface SupplierData {
  id: string;
  name: string;
}

const mapForSelect = (datas: Array<SupplierData>) => {
  //   console.log(datas);
  const mapped = datas.map((data) => ({ id: data.id, name: data.name }));
  return mapped;
};

const fetchSupplierData = async () => {
  try {
    const response = await api.get('/api/supplier/');
    // console.log(response.data.data);
    // console.log();
    supplier.value = response.data.data;
    // console.log(typeof supplier.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchSupplierData();
});
const page = ref({ title: 'Entry Product' });
</script>

<template>
  <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Product Form">
        <form @submit.prevent="submit">
          <v-text-field v-model="name" :counter="10" :error-messages="errors['name']" label="Name" variant="outlined"></v-text-field>

          <SelectWithSearch
            v-model="supplier_id"
            :items="supplier"
            :errors="errors['supplier_id']"
            label="Select Supplier"
          ></SelectWithSearch>
          <v-text-field
            v-model="product_image"
            :counter="10"
            :error-messages="errors['product_image']"
            label="Product Image"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            class=""
            v-model="price"
            type="number"
            :error-messages="errors['price']"
            label="Price"
            variant="outlined"
          ></v-text-field>

          <h2>Properties</h2>
          <v-divider class="my-3"></v-divider>
          <v-text-field
            v-model="size"
            :counter="6"
            :error-messages="errors['properties.size']"
            label="Size"
            variant="outlined"
            type="number"
          ></v-text-field>

          <v-text-field v-model="color" :error-messages="errors['properties.color']" label="Color" variant="outlined"></v-text-field>

          <v-btn class="me-4" type="submit"> submit </v-btn>

          <v-btn @click="handleReset"> clear </v-btn>
        </form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
<style>
input.v-field__input::-webkit-inner-spin-button,
input.v-field__input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
