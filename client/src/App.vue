<script setup
        lang="ts">
    import { inject, onMounted } from 'vue';
    import { useStore } from '@/store/store';
    import { MutationTypes } from '@/store/mutations';
    import cookies from '@/lib/cookies';
    import type { Theme } from '@/lib/types';
    import FooterSection from '@/components/FooterSection.vue';
    import CookieLaw from '@/components/CookieLaw.vue';
    
    const store = useStore();
    
    const isMobile = inject<boolean>('isMobile', false);
    
    function getPreferredTheme(): Theme {
        const hasDarkPreference = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;
        if (hasDarkPreference) {
            return 'dark';
        } else {
            return 'light';
        }
    }
    
    onMounted(() => {
        const preferredTheme = cookies.isKey('nova-theme')
            ? cookies.get('nova-theme') as Theme
            : getPreferredTheme();
        
        if (cookies.isKey('nova-use-cookies')) {
            cookies.set('nova-theme', preferredTheme);
        }
        
        document.documentElement.className = `${preferredTheme}`;
        store.commit(MutationTypes.CHANGE_USER_THEME, preferredTheme);
        
        if (cookies.isKey('nova-language')) {
            store.commit(MutationTypes.CHANGE_LANGUAGE, cookies.get('nova-language'));
        }
    });
</script>

<template>
    <div v-if="isMobile"
         class="mobile-devices">
        <main>
            <img src="/logo.svg"
                 alt="Logo">
            <p>
                Sorry !
                <br>
                <br>
                Nova Web is not available on mobile devices
                <br>
                <br>
                <a href="https://github.com/YacineSteeve/nova-voicebot-mobile"
                   target="_blank"
                   title="Download Nova Mobile">Download
                </a>
                &nbsp;<b>Nova Mobile</b>
                now !
            </p>
        </main>
    </div>
    <div v-else
         class="other-devices">
        <main class="total-center">
            <router-view></router-view>
        </main>
        <div class="main-scroll-overflow">
        </div>
        <FooterSection />
        <cookie-law></cookie-law>
    </div>
</template>

<style scoped
       lang="scss">
@mixin animate($animation,$duration,$method,$times) {
    -webkit-animation: $animation $duration $method $times;
    animation: $animation $duration $method $times;
}

@mixin keyframes($name) {
    @keyframes #{$name}{
        @content;
    }
}

$bg-radius: calc(100vh + 100vw);

main {
    z-index: 1;
    width: 100%;
    overflow: hidden;
}

.mobile-devices {
    main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10vh;
        color: black;
        height: 100vh;
        
        img {
            width: 50%;
        }
        
        p {
            text-align: center;
            
            a {
                text-decoration: underline;
            }
        }
    }
}

.other-devices {
    main {
        position: relative;
        color: white;
        min-height: 100vh;
        height: auto;
        background:  #2a2a2a;
        
        > * {
            z-index: 2;
        }
    }
    
    .main-scroll-overflow {
        position: sticky;
        top: 0;
        height: var(--main-scroll-overflow-height);
        box-shadow: 0 1px 15px 5px black;
        background: var(--palette-electric-violet);
    }
}
</style>
