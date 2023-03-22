<script setup
        lang="ts">
    import { reactive, ref } from 'vue';
    import cookies from '@/lib/cookies';

    interface Cookie {
        name: string;
        description: string;
        isEssential: boolean;
        isChecked: boolean;
    }
    
    const cookieLawIsVisible = cookies.isKey('nova-use-cookies')
        ? ref(false)
        : ref(true);
    const cookiesListIsVisible = ref(false);
    const saveButtonIsVisible = ref(false);

    const cookiesList = reactive<Cookie[]>([
        {
            name: 'cookies-cookie',
            description: 'Cookies usage authorization cookie',
            isEssential: true,
            isChecked: true,
        },
        {
            name: 'nova-auth-token',
            description: 'Authentication cookie',
            isEssential: true,
            isChecked: true,
        },
        {
            name: 'nova-language',
            description: 'Speech\'s language cookie',
            isEssential: false,
            isChecked: true,
        },
        {
            name: 'nova-theme',
            description: 'Preferred theme cookie',
            isEssential: false,
            isChecked: true,
        },
    ]);
    
    function closeCookieLaw() {
        cookiesListIsVisible.value = false;
        cookieLawIsVisible.value = false;
    }

    function showCookiesList() {
        cookiesListIsVisible.value = true;
    }

    function hideCookiesList() {
        cookiesListIsVisible.value = false;
        saveButtonIsVisible.value = false;
    }

    function setCookiesPreferences() {
        saveButtonIsVisible.value = true;
        showCookiesList();
    }

    function enablePreferredCookies() {
        cookies.set(
            'nova-use-cookies',
            cookiesList.filter(cookie => cookie.isChecked).map(cookie => cookie.name));
        closeCookieLaw();
    }
    
    function enableEssentialCookies() {
        cookies.set(
            'nova-use-cookies',
            cookiesList.filter(cookie => cookie.isEssential).map(cookie => cookie.name)
        );
        closeCookieLaw();
    }
    
    function enableAllCookies() {
        cookies.set(
            'nova-use-cookies',
            cookiesList.map(cookie => cookie.name)
        );
        closeCookieLaw();
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
                <li class="total-center"
                    v-for="cookie in cookiesList"
                    :key="cookie.name">
                    <input type="checkbox"
                           :id="cookie.name"
                           :checked="cookie.isChecked"
                           :disabled="cookie.isEssential"
                           v-model="cookie.isChecked">
                    <label :for="cookie.name">{{cookie.description}}</label>
                </li>
            </ul>
            <button
                v-if="saveButtonIsVisible"
                class="save-button total-center"
                @click="enablePreferredCookies">
                <v-icon name="io-checkmark"
                        scale="1.5"></v-icon>
                Save Preferences
            </button>
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
                        @click="setCookiesPreferences">Set Preferences
                </button>
                <button class="decline total-center"
                        @click="enableEssentialCookies">Essentials only
                </button>
                <button class="accept total-center"
                        @click="enableAllCookies">Accept All
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
        height: fit-content;
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
            gap: $spacing;
            flex: 1;
            padding: $spacing;
            
            li {
                gap: $spacing;
                
                label {
                    flex: 1;
                }
            }
            
        }

        .save-button {
            width: fit-content;
            margin-inline: auto;
            margin-block: calc($spacing / 2);
            padding-inline: $spacing;
            padding-block: calc($spacing / 2);
            cursor: pointer;
            border: none;
            background: var(--palette-fog);

            &:hover {
                background: var(--palette-heliotrope);
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
