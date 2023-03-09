<script setup
        lang="ts">
    import { ref } from 'vue';
    import cookies from '@/lib/cookies';
    
    const cookieLawIsVisible = cookies.isKey('nova-use-cookies')
        ? ref(false)
        : ref(true);
    
    const cookiesListIsVisible = ref(false);
    
    function closeCookieLaw() {
        cookiesListIsVisible.value = false;
        cookieLawIsVisible.value = false;
    }
    
    function disableCookiesUsage() {
        closeCookieLaw();
    }
    
    function enableCookiesUsage() {
        cookies.set('nova-use-cookies', true);
        closeCookieLaw();
    }
    
    function showCookiesList() {
        cookiesListIsVisible.value = true;
    }
    
    function hideCookiesList() {
        cookiesListIsVisible.value = false;
    }
</script>

<template>
    <div class="cookie-law"
         :class="{hidden: !cookieLawIsVisible}">
        <div class="cookies-list"
             :class="{hidden: !cookiesListIsVisible}">
            <h4>
                Cookies used
                <span>
                    <v-icon name="io-close"
                            scale="1.5"
                            class="close-cookies-list"
                            @click="hideCookiesList"></v-icon>
                </span>
            </h4>
            <ul>
                <li class="total-center">
                    <input type="checkbox"
                           id="cookies-cookie"
                           checked
                           disabled>
                    <label for="cookies-cookie">Cookies usage authorization cookie</label>
                </li>
                <li class="total-center">
                    <input type="checkbox"
                           id="language-cookie"
                           checked
                           disabled>
                    <label for="language-cookie">Speech language cookie</label>
                </li>
                <li class="total-center">
                    <input type="checkbox"
                           id="theme-cookie"
                           checked
                           disabled>
                    <label for="theme-cookie">Preferred theme cookie</label>
                </li>
            </ul>
        </div>
        <div class="cookie-logo total-center">
            <img src="@/assets/biscuit.png"
                 alt="A delicious cookie">
        </div>
        <div class="cookie-ask">
            <div class="message">
                <h3>Nova has some delicious cookies for you !</h3>
                This website uses cookies to ensure you get the best experience.
                You can see the list of used cookies <span @click="showCookiesList">here</span>.
            </div>
            <div class="buttons-section">
                <button class="close total-center"
                        @click="closeCookieLaw">Close
                </button>
                <button class="decline total-center"
                        @click="disableCookiesUsage">Decline
                </button>
                <button class="accept total-center"
                        @click="enableCookiesUsage">Accept All
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped
       lang="scss">
$spacing: 1vw;

.cookie-law {
    position: sticky;
    bottom: 0;
    z-index: 10;
    display: flex;
    gap: $spacing;
    color: var(--text-primary);
    height: 20vh;
    width: 40vw;
    min-width: fit-content;
    max-width: 40vw;
    padding: $spacing;
    background: var(--background-primary);
    border-top: 2px solid var(--background-secondary);
    border-right: 2px solid var(--background-secondary);
    border-top-right-radius: 8px;
    
    .cookies-list {
        position: absolute;
        left: 10vw;
        bottom: 25vh;
        display: flex;
        flex-direction: column;
        width: 20vw;
        height: 150px;
        background: var(--background-primary);
        border: 2px solid var(--background-secondary);
        
        h4 {
            position: relative;
            text-align: center;
            width: 100%;
            padding-top: $spacing;
            
            .close-cookies-list {
                cursor: pointer;
                position: absolute;
                top: calc($spacing / 2);
                right: $spacing;
            }
        }
        
        ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
            padding: $spacing;
            
            li {
                gap: $spacing;
                
                label {
                    flex: 1;
                }
            }
            
        }
    }
    
    .cookie-logo {
        width: 4vw;
        height: fit-content;
        
        img {
            width: 100%;
        }
    }
    
    .cookie-ask {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 33vw;
        height: 100%;
        
        .message {
            flex: 1;
            font-size: 1.1em;
            line-height: 1.5em;
            
            h3 {
                text-align: center;
                width: 100%;
                margin-bottom: $spacing;
            }
            
            span {
                cursor: pointer;
                color: var(--link-blue);
                text-decoration: underline dashed var(--link-blue);
                text-underline-offset: 0.25em;
            }

            span:hover {
                text-decoration: underline solid var(--link-blue) 2px;
            }
        }
        
        .buttons-section {
            display: flex;
            justify-content: flex-end;
            gap: $spacing;
            width: 100%;
            height: 25%;
            
            button {
                width: fit-content;
                height: 100%;
                padding: $spacing;
                border: none;
                
                &:hover {
                    cursor: pointer;
                }
                
                &.close {
                    margin-right: auto;
                }

                &.accept {
                    background: var(--palette-fog);
                }

                &.accept:hover {
                    background: var(--palette-heliotrope);
                }

                &:not(.accept) {
                    color: var(--text-primary);
                    background: transparent;
                    text-decoration: underline dashed;
                    text-underline-offset: 0.25em;
                }

                &:not(.accept):hover {
                    background: var(--background-secondary);
                    text-decoration: none;
                }
            }
        }
    }
}
</style>
