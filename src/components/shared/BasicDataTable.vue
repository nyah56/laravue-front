<template>
  <v-card>
    <template v-slot:text>
      <div class="d-flex justify-space-between">
        <v-text-field
          v-model="search"
          label="Search"
          variant="outlined"
          density="compact"
          class="ma-2"
          style="max-width: 200px"
        ></v-text-field>
        <v-btn class="elevation-0" color="primary">New</v-btn>
      </div>
    </template>

    <v-data-table :headers="headers" :items="props.data" :search="search" item-key="name" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn size="small" color="primary" class="me-2">Edit</v-btn>
        <v-btn size="small" color="error">Delete</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const search = ref('');
const props = defineProps<{
  data: Array<any>;
  headers: {
    key: string;
    title: string;
    value?: any;
  }[];
}>();
</script>
