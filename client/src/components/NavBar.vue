<script setup
        lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import { useFetch } from '@/lib/hooks/fetch';
import cookies from '@/lib/cookies';
import type { User } from '@/lib/client';
import ThemeToggleButton from '@/components/ThemeToggleButton.vue';

const user = ref<User | null>(null);

onBeforeMount(async () => {
    interface UserResponse {
        success: boolean;
        user: User;
    }

    const { data, error, isFetching } = await useFetch<UserResponse>({
        type: '',
        data: {
            token: cookies.get('nova-auth-token') || ''
        }
    });

    watch([data, error, isFetching], () => {
        if (data.value) {
            user.value = data.value.user;
        }
    });
});

function logout() {
    cookies.remove('nova-auth-token');
    window.location.reload();
}
</script>

<template>
    <div class="navbar">
        <div class="logo">
            <img src="/logo.svg"
                 alt="Logo">
            &nbsp;
            <h1 class="total-center">OVA</h1>
        </div>
        <ul class="menu">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/contact">Contact</router-link>
            </li>
            <li>
                <router-link to="/" v-if="user">{{ user.username }}</router-link>
                <router-link to="/user/login" v-else>Log In</router-link>
            </li>
            <li>
                <span v-if="user" @click="logout">Log Out</span>
                <router-link to="/user/signup" v-else>Sign Up</router-link>
            </li>
        </ul>
        <div class="theme-toggle-btn">
            <ThemeToggleButton width="60%" />
        </div>
    </div>
</template>

<style scoped
       lang="scss">
.navbar {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--navbar-height);
    
    .logo {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 15%;
        height: 100%;
        
        img {
            height: 80%;
        }
        
        h1 {
            font-size: 3em;
            height: fit-content;
            margin: 0;
        }
    }
    
    .menu {
        font-size: 1.5em;
        display: flex;
        align-items: flex-end;
        justify-content: space-evenly;
        width: 70%;
        height: 100%;
        list-style: none;
        
        li {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            width: 20%;
            height: 60%;
            background: rgba(255, 255, 255, 0.15);
            clip-path: polygon(20% 0%, 100% 0, 80% 100%, 0% 100%);
            
            &:hover {
                color: black;
                background: rgba(255, 255, 255, 1);
            }

            > * {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
    
    .theme-toggle-btn {
        display: flex;
        justify-content: center;
        align-items: end;
        width: 15%;
        height: 100%;
    }
}
</style>
