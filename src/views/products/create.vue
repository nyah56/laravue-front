<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { api } from '@/utils/api';
import { onMounted } from 'vue';
// Use Yup to simplify validation schema
const { handleSubmit, defineField, handleReset, errors } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Company Name is Required').min(2, 'Company Name must be at least 2 characters'),
    // supplier_id: yup.string().required('supplier_id is Required').min(2, 'supplier_id must be at least 2 characters'),
    contacts: yup.object({
      phone: yup
        .string()
        .matches(
          /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g,
          'Phone must be at least 7 digits and contain only numbers and dashes'
        ),
      email: yup.string().email('Email must be valid')
    })
  })
});

const [name] = defineField('name');
const [supplier_id] = defineField('supplier_id');
const [product_image] = defineField('product_image');
const [price] = defineField('price');
const [phone] = defineField('contacts.phone');
const [email] = defineField('contacts.email');

// const select = useField<string>('select');
const postData = async (data: object) => {
  try {
    const response = await api.post('/api/supplier/', data);
    // console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
};
const submit = handleSubmit(async (values) => {
  console.log(values);
  //   await postData(values);
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
    supplier.value = mapForSelect(response.data.data);
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
          <v-select
            v-model="supplier_id"
            :items="supplier"
            item-title="name"
            item-value="id"
            :error-messages="errors['supplier_id']"
            label="Select Supplier"
            variant="outlined"
          ></v-select>
          <v-text-field
            v-model="product_image"
            :counter="10"
            :error-messages="errors['product_image']"
            label="Product Image"
            variant="outlined"
          ></v-text-field>
          <v-number-input v-model="price" :counter="10" :error-messages="errors['price']" label="Price" variant="outlined"></v-number-input>
          <h2>Contacts</h2>
          <v-divider class="my-3"></v-divider>
          <v-text-field
            v-model="phone"
            :counter="6"
            :error-messages="errors['contacts.phone']"
            label="Phone Number"
            variant="outlined"
          ></v-text-field>

          <v-text-field v-model="email" :error-messages="errors['contacts.email']" label="E-mail" variant="outlined"></v-text-field>

          <v-btn class="me-4" type="submit"> submit </v-btn>

          <v-btn @click="handleReset"> clear </v-btn>
        </form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
