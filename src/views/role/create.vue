<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import SelectWithSearch from '@/components/shared/SelectWithSearch.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { api } from '@/utils/api';
// Use Yup to simplify validation schema
const { handleSubmit, defineField, handleReset, errors } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Name is Required').min(2, 'Name must be at least 2 characters'),
    guard_name: yup.string().required('Guard Name is Required')
  })
});

const [name] = defineField('name');
const [guard_name] = defineField('guard_name');

// const select = useField<string>('select');
const postData = async (data: object) => {
  try {
    const response = await api.post('/api/role/', data);
    // console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
};
const submit = handleSubmit(async (values) => {
  // console.log(values);
  await postData(values);
});
const selectValue = ref([
  { id: 'web', name: 'Web' },
  { id: 'api', name: 'API' },
  { id: 'admin', name: 'Admin' }
]);
const page = ref({ title: 'Create Role' });
</script>

<template>
  <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Role Form">
        <form @submit.prevent="submit">
          <v-text-field v-model="name" :counter="10" :error-messages="errors['name']" label="Name" variant="outlined"></v-text-field>

          <SelectWithSearch
            v-model="guard_name"
            :items="selectValue"
            :error-messages="errors['guard_name']"
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
