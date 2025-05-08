<template>
  <!-- RoleDialog.vue template -->
  <v-dialog v-model="internalDialog" max-width="600">
    <v-card prepend-icon="mdi-account" title="Role">
      <v-card-text>
        <v-col cols="12">
          <v-text-field label="Role Name" variant="outlined" v-model="localName" />
          <v-text-field label="Guard Name" variant="outlined" v-model="localGuardName" />
        </v-col>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn text="Close" variant="plain" @click="cancel" />
        <v-btn text="Save" color="primary" variant="tonal" @click="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
// RoleDialog.vue <script setup>
import { ref, watch, computed } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
const { handleSubmit, defineField, errors } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Role name is required'),
    guard_name: yup.string().required('Guard name is required')
  })
});

const [name, nameAttrs] = defineField('name');
const [guardName, guardNameAttrs] = defineField('guard_name');
const props = defineProps<{
  modelValue: boolean;
  name: string;
  guardName: string;
  //   errors: Record<string, string>;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:name', value: string): void;
  (e: 'update:guardName', value: string): void;
  (e: 'save'): void;
  (e: 'cancel'): void;
}>();

const internalDialog = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const localName = ref(props.name);
const localGuardName = ref(props.guardName);

// Sync props to local refs when they change
watch(
  () => props.name,
  (val) => (localName.value = val)
);
watch(
  () => props.guardName,
  (val) => (localGuardName.value = val)
);

// Emit value updates to parent
watch(localName, (val) => emit('update:name', val));
watch(localGuardName, (val) => emit('update:guardName', val));

function save() {
  emit('save');
}
function cancel() {
  emit('cancel');
  emit('update:modelValue', false);
}
</script>
