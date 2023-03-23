<script setup
        lang="ts">
import {useToast, POSITION} from 'vue-toastification';
import {POLICIES_NAMES} from '@/lib/policies';
import FooterLoginForm from '@/components/FooterLoginForm.vue';
import LegalStuff from '@/components/LegalStuff.vue';

const toast = useToast();

function showLegalStuff(name: POLICIES_NAMES) {
    const toastContent = {
        component: LegalStuff,
        props: {
            policyName: name,
        },
    }

    toast(toastContent, {
        closeOnClick: false,
        position: POSITION.TOP_LEFT,
        timeout: false,
        hideProgressBar: true,
    });
}

function showPrivacyPolicy() {
    showLegalStuff(POLICIES_NAMES.PRIVACY_POLICY);
}

function showTermsAndConditions() {
    showLegalStuff(POLICIES_NAMES.TERMS_OF_USE);
}

function showCookiePolicy() {
    showLegalStuff(POLICIES_NAMES.COOKIE_POLICY);
}
</script>

<template>
    <footer>
        <div class="footer-main total-center">
            <h1 class="title total-center">Nova Voice Bot</h1>
            <div class="details">

                <div class="logo total-center">
                    <img src="@/assets/logo.svg" alt="logo">
                </div>

                <div class="sitemap total-center">
                    <h2 class="center-start">Site Map</h2>
                    <ul>
                        <li>
                            <router-link to="/" title="Home">
                                Home
                            </router-link>
                        </li>
                        <li>
                            <a href="/#features" title="Features">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/YacineSteeve/nova-voicebot-api#readme" target="_blank"
                               title="APi Documentation">
                                API Documentation
                            </a>
                        </li>
                        <li>
                            <router-link to="/contact" title="Support">
                                Support
                            </router-link>
                        </li>
                    </ul>
                </div>

                <div class="registration total-center">
                    <h2 class="center-start">Try Nova now !</h2>
                    <FooterLoginForm/>
                </div>

                <div class="contact total-center">
                    <h2 class="center-start">Contact me</h2>
                    <div class="socials">
                        <a id="github" href="https://github.com/YacineSteeve" target="_blank" title="GitHub">
                            <v-icon name="fa-github" scale="2"/>
                        </a>
                        <a id="linkedin" href="https://www.linkedin.com/in/yacine-boukari-585465226/" target="_blank"
                           title="LinkedIn">
                            <v-icon name="fa-linkedin" scale="2"/>
                        </a>
                        <a id="instagram" href="https://www.instagram.com/yacine.b_612/" target="_blank"
                           title="Instagram">
                            <v-icon name="fa-instagram" scale="2"/>
                        </a>
                        <a id="mail" href="mailto:steeveboukari9@gmail.com" target="_blank" title="Mail">
                            <v-icon name="fa-envelope" scale="2"/>
                        </a>
                        <a id="whatsapp" href="https://wa.me/33753038294" target="_blank" title="Whatsapp">
                            <v-icon name="fa-whatsapp" scale="2"/>
                        </a>
                        <a id="facebook" href="https://www.facebook.com/yacine.boukari.315/" target="_blank"
                           title="Facebook">
                            <v-icon name="fa-facebook-f" scale="2"/>
                        </a>
                    </div>
                </div>

                <div class="terms-and-conditions total-center">
                    <h2 class="center-start"></h2>
                    <ul>
                        <li @click="showTermsAndConditions">Terms and Conditions</li>
                        <li @click="showPrivacyPolicy">Privacy Policy</li>
                        <li @click="showCookiePolicy">Cookie Policy</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-bottom total-center">
            &copy; Copyright 2023 - Yacine BOUKARI - Nova Voice Bot
        </div>
    </footer>
</template>

<style scoped
       lang="scss">

$f-height: 100vh;
$fb-height: 75px;
$fm-height: calc($f-height - $fb-height);

footer {
    position: sticky;
    top: 0;
    bottom: 0;
    z-index: 0;
    width: 100%;
    height: $f-height;
    color: var(--text-primary);
    background: var(--background-primary);

    .footer-main {
        position: absolute;
        bottom: $fb-height;
        flex-direction: column;
        font-size: 1.4em;
        width: 100%;
        height: $fm-height;

        .title {
            font-size: 3rem;
            align-items: center;
            width: 100%;
            height: calc(0.3 * $fm-height);
        }

        .details {
            display: grid;
            grid-template-areas:
                "logo sitemap registration registration"
                "logo sitemap contact      terms-and-conditions";
            place-items: stretch;
            place-content: stretch;
            width: 100%;
            height: calc(0.6 * $fm-height);

            div {
                flex-direction: column;

                &.logo {
                    grid-area: logo;

                    img {
                        width: 15vw;
                        aspect-ratio: 1 / 1;
                    }
                }

                &.sitemap {
                    grid-area: sitemap;

                    h2 {
                        width: 80%;
                    }
                }

                &.registration {
                    grid-area: registration;
                }

                &.contact {
                    grid-area: contact;

                    .socials {
                        display: grid;
                        grid-template: 1fr / repeat(3, 1fr);
                        gap: 2em 4em;
                        margin-block: 2em;
                        align-self: flex-start;

                        a {
                            cursor: pointer;
                            place-self: center;
                            width: fit-content;
                            height: fit-content;
                            padding: 0;
                            margin: 0;

                            &#github:hover {
                                color: var(--github);
                            }

                            &#linkedin:hover {
                                color: var(--linkedin);
                            }

                            &#instagram:hover {
                                color: var(--instagram);
                            }

                            &#mail:hover {
                                color: var(--mail);
                            }

                            &#whatsapp:hover {
                                color: var(--whatsapp);
                            }

                            &#facebook:hover {
                                color: var(--facebook);
                            }
                        }
                    }
                }

                &.terms-and-conditions {
                    grid-area: terms-and-conditions;
                }

                h2 {
                    width: 100%;
                }

                &.sitemap,
                &.terms-and-conditions {
                    ul {
                        list-style: none;
                        width: 80%;
                        padding: 0;
                        margin: 1em 0 0 0;

                        li {
                            margin-block: 1em;
                            cursor: pointer;
                            width: fit-content;

                            &:hover {
                                text-decoration: underline;
                                text-underline-offset: 0.25em;
                            }
                        }
                    }
                }
            }
        }
    }

    .footer-bottom {
        position: absolute;
        bottom: 0;
        font-size: 1.2em;
        width: 100%;
        height: $fb-height;
        background: var(--background-secondary);
    }
}
</style>
