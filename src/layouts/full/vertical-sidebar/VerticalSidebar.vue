<script setup lang="ts">
import { shallowRef, computed, onMounted, ref } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
import { useAuthStore } from '@/stores/auth';
import { ShieldCheckIcon } from 'vue-tabler-icons';
import sidebarItems from './sidebarItem';
import NavGroup from './NavGroup/NavGroup.vue';
import NavItem from './NavItem/NavItem.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';

import Logo from '../logo/LogoMain.vue';
// import {  } from 'vue';
const auth = useAuthStore();
interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}
const customizer = useCustomizerStore();

const roleVal = ref();
onMounted(async () => {
  const user = await auth.fetchUser();
  if (user) {
    roleVal.value = user.role === 'Admin' ? true : false;
    // console.log(roleVal.value);
    console.log('Fetch');
  }
});
const sidebarMenu = sidebarItems;
// const sidebarMenu = computed(() => {
//   const items = [...sidebarItems]; // Clone original
//   // console.log(await auth.getUser());
//   if (roleVal.value) {
//     items.push(
//       { divider: true },
//       { header: 'Admin' },
//       {
//         title: 'Role',
//         icon: ShieldCheckIcon,
//         to: '/role'
//       }
//     );
//   }
//   return items;
// });
</script>

<template>
  <v-navigation-drawer
    left
    v-model="customizer.Sidebar_drawer"
    elevation="0"
    rail-width="75"
    mobile-breakpoint="lg"
    app
    class="leftSidebar"
    :rail="customizer.mini_sidebar"
    expand-on-hover
  >
    <!---Logo part -->

    <div class="pa-5">
      <Logo />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list class="pa-4">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else class="leftPadding" />
          <!---End Single Item-->
        </template>
      </v-list>
      <div class="pa-4"></div>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
