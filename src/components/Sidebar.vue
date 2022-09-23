<script setup lang="ts">
    import { RouterLink } from "vue-router";
    import SideBarItem from "./SideBarItem.vue";
    const sidebar = [
        [
            { 
            name: "Overview",
            icon: "./assets/overview.svg",
            link: '/'
            }
        ],
        [
            { 
            name: "Moderators",
            icon: "./assets/chat.svg",
            link: '/moderators'
            },
            { 
            name: "Stores",
            icon: "./assets/chat.svg",
            link: '/stores'
            },
            { 
            name: "Customers",
            icon: "./assets/chat.svg",
            link: '/customers'
            },
        ],
        [
            { 
            name: "Promotions",
            icon: "./assets/chat.svg",
            link: '/promotions'
            },
        ],
        [
            { 
            name: "Logout",
            icon: "./assets/logout.svg",
            link: '/'
            },
            { 
            name: "Settings",
            icon: "./assets/logout.svg",
            link: '/settings'
            },
        ]
    ];
</script>

<template>
    <aside class="py-6 px-10 w-64 border-r border-gray-200">
      <img src="/img/logo.png" alt="" class="w-28" />
      <ul v-for="group in sidebar" class="flex flex-col gap-y-6 pt-20">
        <li v-for="item in group">
            <SideBarItem :link="item.link" :name="item.name" :icon="item.icon"></SideBarItem>
        </li>
      </ul>
    </aside>
</template>