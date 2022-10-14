<script setup lang="ts">
    import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";
    const authStore = useAuthStore();
    // const role = authStore.user.role;
</script>

<template>
    <aside class="flex flex-col justify-between w-64 border-r border-gray-200">
    <!-- <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="100" height="100" viewBox="0 0 375.000000 666.000000"
    preserveAspectRatio="xMidYMid meet">

    <g transform="translate(0.000000,666.000000) scale(0.100000,-0.100000)"
    fill="#000000" stroke="none">
    <path d="M1710 4485 c-85 -19 -164 -52 -230 -96 -210 -141 -266 -403 -128
    -606 l29 -43 -53 -76 c-83 -119 -92 -138 -78 -178 17 -51 44 -71 99 -70 61 1
    166 29 275 71 l90 36 70 -14 c39 -8 118 -14 176 -13 186 2 332 58 447 170 185
    181 174 424 -28 626 -134 134 -326 209 -526 207 -48 -1 -113 -7 -143 -14z
    m335 -101 c160 -41 307 -150 367 -272 30 -60 33 -76 33 -152 0 -72 -4 -93 -27
    -136 -54 -103 -183 -189 -328 -220 -88 -19 -234 -14 -320 9 l-55 16 -116 -44
    c-114 -43 -249 -78 -249 -65 0 4 9 15 19 24 27 25 121 180 121 201 0 9 -20 47
    -44 84 -53 80 -70 140 -64 225 7 76 27 122 84 185 131 146 355 202 579 145z"/>
    <path d="M1494 4056 c-7 -16 -8 -44 -3 -86 10 -73 14 -80 40 -80 23 0 25 15 4
    24 -22 8 -20 92 3 105 16 9 16 10 0 16 -10 4 -18 16 -18 26 0 26 -13 24 -26
    -5z"/>
    <path d="M1858 4065 c-10 -29 -8 -185 1 -185 5 0 11 21 14 47 8 78 66 94 68
    19 0 -17 4 -40 9 -51 6 -15 9 -7 9 31 1 59 -13 82 -54 86 -26 3 -31 8 -35 38
    -5 28 -7 31 -12 15z"/>
    <path d="M1753 4044 c-8 -17 -9 -43 -3 -84 10 -71 15 -80 43 -80 22 1 22 1 2
    16 -25 19 -26 91 -1 110 15 10 15 12 1 18 -8 3 -15 12 -15 20 0 25 -15 25 -27
    0z"/>
    <path d="M1609 3994 l21 -36 -21 -34 c-26 -43 -19 -55 10 -18 l21 27 30 -28
    c35 -33 39 -26 9 16 l-21 29 21 35 c22 39 12 48 -14 13 l-16 -23 -20 28 c-30
    40 -45 33 -20 -9z"/>
    <path d="M2025 3985 c-32 -31 -32 -69 0 -101 25 -25 56 -26 80 -2 7 7 3 8 -12
    3 -33 -9 -63 3 -63 26 0 13 7 19 24 19 58 0 76 35 34 64 -30 21 -35 20 -63 -9z
    m63 -17 c2 -12 -5 -19 -23 -24 -34 -8 -53 9 -35 31 17 20 54 16 58 -7z"/>
    <path d="M2156 3974 c-10 -26 -7 -104 4 -104 6 0 10 17 10 38 0 47 19 76 43
    66 13 -5 17 -18 17 -54 0 -27 5 -52 10 -55 6 -4 10 10 10 34 0 52 8 71 31 71
    12 0 21 -9 24 -27 3 -16 10 -41 14 -58 8 -28 9 -27 10 15 2 71 -14 85 -97 88
    -56 1 -71 -1 -76 -14z"/>
    </g>
    </svg> -->
      <div class="py-6 px-10 ">
        <ul class="flex flex-col gap-y-6 pt-20">
            <li>
                <RouterLink to="/" class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group">
                    <!-- class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group" -->
                    <span
                        class="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
                    </svg>

                    <span>Overview</span>
                </RouterLink>
                <!-- <SideBarItem :link="item.link" :name="item.name" ></SideBarItem> -->
            </li>
        </ul>
        <ul class="flex flex-col gap-y-6 pt-20">
            <li v-if="authStore.user.role === 'ADMIN'">
                <RouterLink to="/moderators" class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group">
                    <!-- class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group" -->
                    <span
                    class="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z" clip-rule="evenodd" />
                    </svg>
                    <span>Moderators</span>
                    </RouterLink>
                    <!-- <SideBarItem :link="item.link" :name="item.name" ></SideBarItem> -->
                </li>
                <li v-if="authStore.user.role === 'ADMIN' || authStore.user.role === 'MODERATOR'">
                    <RouterLink to="/stores" class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group">
                        <!-- class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group" -->
                        <span
                        class="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                            <path d="M2.879 7.121A3 3 0 007.5 6.66a2.997 2.997 0 002.5 1.34 2.997 2.997 0 002.5-1.34 3 3 0 104.622-3.78l-.293-.293A2 2 0 0015.415 2H4.585a2 2 0 00-1.414.586l-.292.292a3 3 0 000 4.243zM3 9.032a4.507 4.507 0 004.5-.29A4.48 4.48 0 0010 9.5a4.48 4.48 0 002.5-.758 4.507 4.507 0 004.5.29V16.5h.25a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-3.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v3.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5H3V9.032z" />
                        </svg>

                        <span>Stores</span>
                    </RouterLink>
                    <!-- <SideBarItem :link="item.link" :name="item.name" ></SideBarItem> -->
                </li>
                <li v-if="authStore.user.role === 'ADMIN' || authStore.user.role === 'STORE'">
                    <RouterLink to="/customers" class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group">
                        <!-- class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group" -->
                        <span
                        class="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                        </svg>


                        <span>Customers</span>
                    </RouterLink>
                    <!-- <SideBarItem :link="item.link" :name="item.name" ></SideBarItem> -->
                </li>
                <li v-if="authStore.user.role === 'ADMIN' || authStore.user.role === 'STORE'">
                    <RouterLink to="/promotions" class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group">
                        <!-- class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group" -->
                        <span
                        class="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clip-rule="evenodd" />
                        </svg>

                        <span>Promotions</span>
                    </RouterLink>
                    <!-- <SideBarItem :link="item.link" :name="item.name" ></SideBarItem> -->
                </li>
            </ul>
            <ul class="flex flex-col gap-y-6 pt-20">
                <li>
                    <RouterLink to="/settings" class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group">
                        <!-- class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group" -->
                        <span
                        class="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>

                        <span>Settings</span>
                    </RouterLink>
                    <!-- <SideBarItem :link="item.link" :name="item.name" ></SideBarItem> -->
                </li>
                <li>
                <button @click="authStore.logout()" href="#" class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group">
                    <!-- class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group" -->
                    <span
                        class="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clip-rule="evenodd" />
                    </svg>

                    <span>Logout</span>
                </button>
                <!-- <SideBarItem :link="item.link" :name="item.name" ></SideBarItem> -->
            </li>
            </ul>
        </div>
        <div class="flex py-6 px-10 items-center">
            <img :src="authStore.user?.avatar" alt="avatar" class="rounded-full w-10 h-10"/>
            <h3 class="ml-4 font-semibold text-black">{{ authStore.user!.name }}</h3>
        </div>
    </aside>
</template>