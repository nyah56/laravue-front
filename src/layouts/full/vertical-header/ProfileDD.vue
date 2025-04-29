<script setup lang="ts">
import { ref } from 'vue';
import { SettingsIcon, LogoutIcon, UserIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/auth';

const swt1 = ref(true);
const swt2 = ref(false);
const authStore = useAuthStore();
const username = authStore.user?.name ? authStore.user.name.charAt(0).toUpperCase() + authStore.user.name.slice(1) : '';
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- profile DD -->
  <!-- ---------------------------------------------- -->
  <div class="pa-4">
    <h4 class="mb-n1">
      Good Morning, <span class="font-weight-regular">{{ username }}</span>
    </h4>
    <span class="text-subtitle-2 text-medium-emphasis">Project admin</span>

    <!-- <v-text-field persistent-placeholder placeholder="Search" class="my-3" color="primary" variant="outlined" hide-details>
      <template v-slot:prepend-inner>
        <SearchIcon stroke-width="1.5" size="20" class="text-lightText SearchIcon" />
      </template>
    </v-text-field> -->

    <v-divider></v-divider>

    <v-divider></v-divider>

    <v-list class="mt-3">
      <v-list-item color="secondary" rounded="md">
        <template v-slot:prepend>
          <SettingsIcon size="20" class="mr-2" />
        </template>

        <v-list-item-title class="text-subtitle-2"> Account Settings</v-list-item-title>
      </v-list-item>

      <v-list-item color="secondary" rounded="md">
        <template v-slot:prepend>
          <UserIcon size="20" class="mr-2" />
        </template>

        <v-list-item-title class="text-subtitle-2"> Social Profile</v-list-item-title>
      </v-list-item>

      <v-list-item @click="authStore.logout()" color="secondary" rounded="md">
        <template v-slot:prepend>
          <LogoutIcon size="20" class="mr-2" />
        </template>

        <v-list-item-title class="text-subtitle-2"> Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>
