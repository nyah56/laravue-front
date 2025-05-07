<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { api } from '@/utils/api';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { router } from '@/router';
// Use Yup to simplify validation schema

const route = useRoute();
const id = route.params.id;
const { handleSubmit, defineField, handleReset, errors, setValues } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Company Name is Required').min(2, 'Company Name must be at least 2 characters'),
    address: yup.string().required('Address is Required').min(2, 'Address must be at least 2 characters'),
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
const [address] = defineField('address');
const [phone] = defineField('contacts.phone');
const [email] = defineField('contacts.email');

// const select = useField<string>('select');
const postData = async (data: object) => {
  try {
    const response = await api.put(`/api/supplier/${id}`, data);
    router.push('/suppliers');
    // console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
};

const getData = async () => {
  try {
    const response = await api.get(`/api/supplier/${id}`);
    const responseData = response.data.data;
    const { phone, email } = responseData.contacts ?? {};
    console.log(responseData);
    setValues({
      name: responseData.name,
      address: responseData.address,
      contacts: {
        ...(phone && { phone }),
        ...(email && { email })
      }
    });
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  getData();
});
const submit = handleSubmit(async (values) => {
  console.log(values);
  await postData(values);
});

const page = ref({ title: 'Edit Supplier' });
</script>

<template>
  <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Supplier Form">
        <form @submit.prevent="submit">
          <v-text-field v-model="name" :counter="10" :error-messages="errors['name']" label="Name" variant="outlined"></v-text-field>
          <v-text-field
            v-model="address"
            :counter="10"
            :error-messages="errors['address']"
            label="Address"
            variant="outlined"
          ></v-text-field>
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
