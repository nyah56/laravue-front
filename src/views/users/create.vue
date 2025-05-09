<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import SelectWithSearch from '@/components/shared/SelectWithSearch.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { api } from '@/utils/api';
import { onMounted } from 'vue';
// Use Yup to simplify validation schema
const { handleSubmit, defineField, handleReset, errors } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Name is Required').min(2, 'Name must be at least 2 characters'),
    email: yup.string().required('Name is Required').min(2, 'Name must be at least 2 characters'),
    role_id: yup.string().required('Guard Name is Required')
  })
});
const role = ref();

const [name] = defineField('name');
const [email] = defineField('email');
const [password] = defineField('password');
const [role_id] = defineField('role_id');

// const select = useField<string>('select');
const postData = async (data: object) => {
  try {
    const response = await api.post('/api/register/', data);
    // console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
};
const getRole = async () => {
  try {
    const response = await api.get('/api/role/');
    // console.log(response.data.data);
    role.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};
const submit = handleSubmit(async (values) => {
  // console.log(values);
  await postData(values);
});
onMounted(() => {
  getRole();
});
const page = ref({ title: 'Create Role' });
</script>

<template>
  <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="User Form">
        <form @submit.prevent="submit">
          <v-text-field v-model="name" :counter="10" :error-messages="errors['name']" label="Name" variant="outlined"></v-text-field>
          <v-text-field v-model="email" :counter="10" :error-messages="errors['email']" label="Email" variant="outlined"></v-text-field>
          <v-text-field
            v-model="password"
            :counter="10"
            :error-messages="errors['password']"
            label="Password"
            type="password"
            variant="outlined"
          ></v-text-field>

          <SelectWithSearch
            v-model="role_id"
            :items="role"
            :error-messages="errors['role_id']"
            :errors="errors['supplier_id']"
            label="Select Role"
          ></SelectWithSearch>
          <v-btn class="me-4" type="submit"> submit </v-btn>

          <v-btn @click="handleReset"> clear </v-btn>
        </form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
