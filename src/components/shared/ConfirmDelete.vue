<template>
  <v-dialog v-model="props.dialog" width="auto">
    <v-card max-width="400">
      <v-card-title>
        <h3>{{ title }}</h3>
      </v-card-title>

      <v-card-text>
        <p>{{ text }}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="cancelDelete">Cancel</v-btn>
        <v-btn v-if="props.title !== 'Confirm Delete'" color="primary" @click="confirmDelete">Restore</v-btn>
        <v-btn v-else color="error" @click="confirmDelete">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  dialog: { type: Boolean, required: true },
  title: { type: String, default: 'Confirm Delete' },
  text: { type: String, default: 'Are you sure you want to delete this item?' },

  width: { type: [String, Number], default: 'auto' },
  cardWidth: { type: [String, Number], default: 400 }
});

const emits = defineEmits(['update:dialog', 'confirm-delete']);
// console.log(props.title);
const cancelDelete = () => {
  emits('update:dialog', false); // Close dialog without action
};

const confirmDelete = () => {
  emits('update:dialog', false); // Close dialog
  emits('confirm-delete'); // Trigger the confirm-delete event to parent
};
</script>
