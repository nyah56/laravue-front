<template>
  <RouterView ref="app"></RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useTemplateRef, onMounted, onBeforeMount } from 'vue';
import { useAuthStore } from './stores/auth';
import { useEventListener } from '@vueuse/core';
import { registerRuntimeCompiler } from 'vue';
const auth = useAuthStore();

const app = useTemplateRef<HTMLDivElement>('app');
useEventListener(app, 'click', (e) => {
  console.log('Mouse');
});

onMounted(() => {
  useEventListener(app, 'click', (e) => {
    resetTimer();
  });
  useEventListener(app, 'keydown', (e) => {
    resetTimer();
  });
  useEventListener(app, 'mousemove', (e) => {
    resetTimer();
  });
});

onBeforeMount(() => {
  useEventListener(app, 'click', (e) => {
    resetTimer();
  });
  useEventListener(app, 'keydown', (e) => {
    resetTimer();
  });
  useEventListener(app, 'mousemove', (e) => {
    resetTimer();
  });
});

const resetTimer = () => {
  if (auth.user) auth.resetLogoutTimer();
  // console.log(auth.user);
};
</script>
