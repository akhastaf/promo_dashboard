import axiosClient from "@/helpers/axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import router from '@/router'
import type { User } from "@/types";

export const useAuthStore = defineStore('auth', () =>{
    const user = ref<User|null>();
    // const returnUrl = null;
    const errorMessage = ref('');
    // if (localStorage.getItem('user')!.length)
    const userString = localStorage.getItem('user');
    if (userString)
        user.value = JSON.parse(userString);
    else 
        user.value = null;
    async function login(email: string, password: string) {
        axiosClient.post('/auth/login', {username: email, password}, { withCredentials: true})
            .then((data) => {
                user.value = data.data.user;
                localStorage.setItem('access_token', data.data.access_token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                router.push({name: 'home', path: '/'});
            }).catch((error) => {
                errorMessage.value = error.response.data.message;
            })
    }

    async function forget(email:string) {
        const data = await axiosClient.post('/auth/forget', { email: email });
    }
    async function reset(password:string, password_confirmation: string, token?: string) {
        // console.log(password, password_confirmation, token);
        const data = await axiosClient.post(`/auth/reset?token${token}`, { password: password,
        password_confirmation: password_confirmation });
        // console.log(data);
    }

    async function logout() {
        const data = await axiosClient.delete('/auth/logout', { withCredentials: true });
        // console.log(data);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        user.value = undefined;
        router.push({name: 'login'});
    }
    return { user, errorMessage, login, logout, forget, reset};
});
