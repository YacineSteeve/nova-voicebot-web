<script setup lang="ts">
</script>

<template>
    <div class="auth total-center">
        <section>
            <div class="logo">
                <img src="/logo.svg"
                     alt="Logo">
                &nbsp;
                <h1 class="total-center">OVA</h1>
            </div>
            <div class="return">
                <router-link to="/">
                    <v-icon name="hi-chevron-left"></v-icon>
                    Go back home
                </router-link>
            </div>
            <router-view />
        </section>
    </div>
</template>

<style scoped lang="scss">
$section-margin: calc(1.4 * var(--navbar-height));

.auth {
    width: 100vw;
    height: 100vh;

    section {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1vh;
        align-items: center;
        width: 50vw;
        height: 90vh;
        color: var(--text-primary);
        background: var(--background-primary);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(1px);
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 10px;

        .logo {
            position: absolute;
            left: 1em;
            top: 1em;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            width: fit-content;
            height: 5em;

            img {
                height: 100%;
            }

            h1 {
                font-size: 3em;
                height: fit-content;
                margin: 0;
            }
        }

        .return {
            position: absolute;
            font-size: 1.5em;
            right: 1em;
            top: 1em;
            display: flex;
            justify-content: center;
            align-items: center;
            width: fit-content;
            height: fit-content;
            cursor: pointer;

            &:hover {
                color: var(--palette-heliotrope);
            }
        }
    }
}
</style>
