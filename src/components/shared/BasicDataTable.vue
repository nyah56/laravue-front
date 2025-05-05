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
        <div class="d-flex ga-2">
          <v-btn class="elevation-0" color="primary" :to="trashedUrl">Trashed File</v-btn>
          <v-btn class="elevation-0" color="primary" :to="url">New</v-btn>
        </div>
      </div>
    </template>

    <v-data-table :headers="headers" :items="props.data" :search="search" item-key="name" class="elevation-1">
      <template v-slot:item.action="{ item }">
        <v-btn size="small" color="primary" class="me-2" @click="emit('edit', item)">Edit</v-btn>
        <v-btn size="small" color="error" @click="emit('delete', item)">Delete</v-btn>
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
  url: string;
  trashedUrl: string;
}>();
const emit = defineEmits<{
  (e: 'edit', item: any): void;
  (e: 'delete', item: any): void;
}>();
</script>
