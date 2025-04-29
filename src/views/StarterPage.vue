<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useField, useForm } from 'vee-validate';

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value: string) {
      if (value?.length >= 2) return true;

      return 'Name needs to be at least 2 characters.';
    },
    phone(value: string) {
      if (/^[0-9-]{7,}$/.test(value)) return true;

      return 'Phone number needs to be at least 7 digits.';
    },
    email(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return 'Must be a valid e-mail.';
    },
    select(value: boolean) {
      if (value) return true;

      return 'Select an item.';
    },
    checkbox(value: string) {
      if (value === '1') return true;

      return 'Must be checked.';
    }
  }
});
const name = useField('name');
const phone = useField('phone');
const email = useField('email');
const select = useField<string>('select');
const checkbox = useField('checkbox');

const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
const page = ref({ title: 'Sample asaa' });
</script>

<template>
  <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Simple Title">
        <form @submit.prevent="submit">
          <v-text-field
            v-model="name.value.value"
            :counter="10"
            :error-messages="name.errorMessage.value"
            label="Name"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="phone.value.value"
            :counter="7"
            :error-messages="phone.errorMessage.value"
            label="Phone Number"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="E-mail"
            variant="outlined"
          ></v-text-field>

          <v-select
            v-model="select.value.value"
            :error-messages="select.errorMessage.value"
            :items="items"
            label="Select"
            variant="outlined"
          ></v-select>

          <v-checkbox
            v-model="checkbox.value.value"
            :error-messages="checkbox.errorMessage.value"
            label="Option"
            type="checkbox"
            value="1"
          ></v-checkbox>

          <v-btn class="me-4" type="submit"> submit </v-btn>

          <v-btn @click="handleReset"> clear </v-btn>
        </form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
