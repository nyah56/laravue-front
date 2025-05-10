<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { api } from '@/utils/api';
import { onMounted } from 'vue';
import SelectWithSearch from '@/components/shared/SelectWithSearch.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.id;
// Use Yup to simplify validation schema
const { handleSubmit, defineField, handleReset, errors, setValues } = useForm({
  validationSchema: yup.object({
    product_id: yup.string().required('Supplier Name is Required'),
    quantity: yup.number().required(),
    description: yup.string().required('Company Name is Required').min(2, 'Company Name must be at least 2 characters')
  })
});

const [product_id] = defineField('product_id');
const [quantity] = defineField('quantity');
const [description] = defineField('description');

// const select = useField<string>('select');
// console.log(typeof errors);
const getData = async () => {
  try {
    const response = await api.get(`/api/stocks/${id}`);
    const data = response.data.data;
    // const { phone, email } = responseData.contacts ?? {};
    // console.log(responseData);
    setValues({
      product_id: data.product_id,
      quantity: data.quantity,
      description: data.description
    });
  } catch (error) {
    console.error(error);
  }
};
const putData = async (data: object) => {
  try {
    // console.log(data);
    const response = await api.put(`/api/stocks/${id}`, data);
  } catch (error: any) {
    switch (error.status) {
      case 422:
        console.error(error.response.data.message);
        break;
    }
  }
};
const submit = handleSubmit(async (values) => {
  console.log(values);
  await putData(values);
});

const products = ref();

const fetchSupplierData = async () => {
  try {
    const response = await api.get('/api/products/');
    // console.log(response.data.data);
    // console.log();
    products.value = response.data.data;
    // console.log(typeof products.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getData();
  fetchSupplierData();
});
const page = ref({ title: 'Entry Stock' });
</script>

<template>
  <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Stock Form">
        <form @submit.prevent="submit">
          <SelectWithSearch v-model="product_id" :items="products" :errors="errors['product_id']" label="Select Product"></SelectWithSearch>
          <v-text-field
            class=""
            v-model="quantity"
            type="number"
            :error-messages="errors['quantity']"
            label="Quantity"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="description"
            :counter="10"
            :error-messages="errors['name']"
            label="Description"
            variant="outlined"
          ></v-text-field>

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
