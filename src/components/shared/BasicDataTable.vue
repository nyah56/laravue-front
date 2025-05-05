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
          <v-btn v-if="!props.restore" class="elevation-0" color="primary" :to="trashedUrl">Trashed File</v-btn>
          <v-btn v-else class="elevation-0" color="primary" :to="mainUrl">Back</v-btn>
          <v-btn class="elevation-0" color="primary" :to="url">New</v-btn>
        </div>
      </div>
    </template>

    <v-data-table :headers="headers" :items="props.data" :search="search" item-key="name" class="elevation-1">
      <template v-slot:item.action="{ item }">
        <v-btn v-if="props.edit" size="small" color="primary" class="me-2" @click="emit('edit', item)">Edit</v-btn>
        <v-btn v-if="props.delete" size="small" color="error" @click="emit('delete', item)">Delete</v-btn>
        <v-btn v-if="props.restore" size="small" color="primary" @click="emit('restore', item)">Restore</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const search = ref('');
const props = withDefaults(
  defineProps<{
    data: Array<any>;
    headers: {
      key: string;
      title: string;
      value?: any;
    }[];
    url: string;
    trashedUrl: string;
    mainUrl: string;
    edit?: boolean;
    delete?: boolean;
    restore?: boolean;
  }>(),
  {
    edit: true,
    delete: true,
    restore: false
  }
);
const emit = defineEmits<{
  (e: 'edit', item: any): void;
  (e: 'delete', item: any): void;
  (e: 'restore', item: any): void;
}>();
</script>
