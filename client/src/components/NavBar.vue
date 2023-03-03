<script setup
        lang="ts">
    import ThemeToggleButton from '@/components/ThemeToggleButton.vue';

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
            <li>Home</li>
            <li>Contact</li>
            <li>Log In</li>
            <li>Sign Up</li>
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
