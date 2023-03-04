<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
</script>

<template>
    <div class="login total-center">
        <div class="title total-center">
            Log In
        </div>
        <div class="welcome-message">
            Glad to see you again!
        </div>
        <form action="/user/login" method="post">
            <div class="group">
                <input type="email" :class="{used: email !== ''}" v-model="email">
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Email</label>
            </div>
            <div class="group">
                <input type="password" :class="{used: password !== ''}" v-model="password">
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Password</label>
            </div>
            <input type="submit" value="Log In" class="submit">
            <div class="redirect-auth">
                Don't have an account?
                <span>
                    <router-link to="/user/signup">Sign Up</router-link>
                </span>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
.login {
    flex-direction: column;
    flex: 1;
    width: 100%;

    .title {
        font-size: 4em;
        font-weight: 600;
        margin-top: 2em;
    }

    .welcome-message {
        font-size: 1.75em;
        font-weight: lighter;
        margin-top: 3em;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 3em;
        width: 50%;
        margin-block: auto;

        .group {
            position: relative;
            font-size: 1.5em;
            width: 100%;
            height: 2.5em;
            background: var(--background-secondary);

            label {
                position: absolute;
                bottom: -0.75em;
                left: 0;
                color: var(--palette-heliotrope);
                pointer-events: none;
                display: block;
                font-size: 1em;
                height: 100%;
                width: 100%;
                padding-left: 0.75em;
                transition: all 0.2s linear;
            }

            input {
                -webkit-appearance: none;
                display: flex;
                align-items: center;
                font-size: 1.2em;
                color: var(--text-primary);
                width: 92%;
                height: 100%;
                margin-inline: auto;
                border: none;
                background: transparent;

                &:focus {
                    outline: none;

                    .highlight {
                        animation: inputHighlighter 0.3s ease;
                    }
                }
            }

            input:focus ~ label,
            input.used ~ label {
                font-size: 0.75em;
                padding-left: 0;
                transform: translateY(-1.75em);
                color: var(--palette-heliotrope);
            }

            input:focus ~ .bar:before,
            input:focus ~ .bar:after {
                width: 50%;
            }

            .highlight {
                position: absolute;
                height: 60%;
                width: 100px;
                top: 25%;
                left: 0;
                pointer-events: none;
                opacity: 0.5;
            }

            .bar {
                position: relative;
                display: block;
                width: 100%;

                &:before,
                &:after {
                    content: '';
                    height: 2px;
                    width: 0;
                    bottom: 1px;
                    position: absolute;
                    background: var(--palette-heliotrope);
                    transition: all 0.2s ease;
                }

                &:before {
                    left: 50%;
                }

                &:after {
                    right: 50%;
                }
            }
        }

        .submit {
            background: var(--palette-heliotrope);
            color: var(--text-secondary);
            font-size: 1.5em;
            font-weight: 600;
            width: 100%;
            height: 2.5em;
            cursor: pointer;
            border: none;
            transition: all 0.2s ease;

            &:hover {
                background: var(--palette-electric-violet);
            }
        }
    }
}
</style>
