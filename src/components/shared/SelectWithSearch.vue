<template>
  <v-select
    v-bind="selectProps"
    @update:model-value="emit('update:modelValue', $event)"
    :items="data"
    item-title="name"
    item-value="id"
    :error-messages="errors"
    label="Select Supplier"
    variant="outlined"
  >
    <template v-slot:prepend-item>
      <div class="pa-2">
        <v-text-field variant="outlined" v-model="searchTerm" @input="search" hide-details></v-text-field>
      </div>

      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref, watch, computed } from 'vue';

interface SupplierData {
  id: string;
  name: string;
}

const props = defineProps({
  modelValue: { type: String, default: '' },
  useModelValue: { type: Boolean, default: false },
  items: { type: Array as () => Array<SupplierData>, default: () => [] },
  errors: { type: String, default: '' }
});
const selectProps = computed(() => {
  return props.useModelValue ? { 'model-value': props.modelValue } : { value: props.modelValue };
});
const emit = defineEmits(['update:modelValue']);

let data = ref<SupplierData[]>([]);
const searchTerm = ref('');
const dataCopy = ref<SupplierData[]>([]);
// Update the select options reactively in case props.items changes
watch(
  () => props.items,
  (newItems) => {
    const mapped = newItems.map((item) => ({ id: item.id, name: item.name }));
    data.value = mapped;
    dataCopy.value = mapped; // keep backup in sync
  },
  { immediate: true }
);
onMounted(() => {
  dataCopy.value = [...data.value];
});
const search = () => {
  if (!searchTerm.value) {
    data.value = [...dataCopy.value]; // reset to full list when search is empty
    return;
  }

  data.value = dataCopy.value.filter((d) => d.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
};
</script>
