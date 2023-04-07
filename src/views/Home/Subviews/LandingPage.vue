<script setup lang="ts">
import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
</script>

<template>
    <div class="landing-page">
        <section class="first total-center">
            <div class="section-step left first"></div>

            <h1>Welcome to NOVA,</h1>
            <h2>your personal online voice assistant</h2>

            <div class="details bubble total-center">
                <p>Just ask me anything you want !</p>
            </div>

            <router-link to="/nova"
                         class="btn"
                         title="Go to Nova">
                <ButtonWithIcon icon="io-play-circle"
                                icon-scale="1.5"
                                width="10em"
                                title="Get Started">
                    <b>Get Started</b>
                </ButtonWithIcon>
            </router-link>

            <img src="@/assets/nova.png" alt="Nova Image">
        </section>

        <section class="second total-center" id="features">
            <div class="section-step right"></div>

            <div class="conv">
                <v-icon name="gi-conversation" scale="25"></v-icon>
            </div>

            <h2>
                NOVA is a voice assistant
                <br>
                that can help you with your daily tasks.
            </h2>

            <div class="details">
                It can help you with your school work, your general knowledge, and more !
            </div>
        </section>

        <section class="third total-center">
            <div class="section-step left"></div>

            <div class="mic">
                <v-icon name="fa-microphone" scale="25"></v-icon>
            </div>

            <h2>
                Just tell it what you want to know,
                <br>
                and it will answer you.
            </h2>

            <div class="details total-center">
                Using a very precise and powerful speech recognition system,
                Nova can understand what you say and answer you.
            </div>
        </section>

        <section class="fourth total-center">
            <div class="section-step right"></div>

            <div class="lang">
                <v-icon name="io-language" scale="25"></v-icon>
            </div>

            <h2>Many languages are supported</h2>

            <div class="details total-center">
                Including English, French, German, Spanish, Italian, Portuguese,
                Dutch, Russian, Japanese, Korean, Chinese, and more !
            </div>

            <router-link to="/nova"
                         class="btn"
                         title="Go to Nova">
                <ButtonWithIcon icon="io-play-circle"
                                icon-scale="1.5"
                                width="10em"
                                title="Get Started">
                    <b>Get Started</b>
                </ButtonWithIcon>
            </router-link>
        </section>
    </div>
</template>

<style scoped lang="scss">
$section-padding: calc(100vh - 3 * var(--navbar-height));

.landing-page {
    width: 100%;
    min-height: 100vh;

    section {
        position: relative;
        flex-direction: column;
        gap: 3em;
        width: 100%;
        max-width: 100%;
        padding-block: var(--navbar-height);
        margin-bottom: var(--navbar-height);
        overflow: hidden;

        h2 {
            font-size: 3em;
            text-align: center;
            margin: 0;
        }

        .details {
            font-size: 2.5em;
            margin-block: 2em;
            width: 50vw;
            text-align: center;
        }

        .btn {
            font-size: 1.5em;
        }

        &.first {
            h1 {
                font-size: 6em;
                margin: 0;
            }

            .bubble {
                position: relative;
                color: var(--text-primary);
                height: 5em;
                width: 20em;
                background: var(--background-primary);
                border-radius: 10px;

                &::after {
                    position: absolute;
                    bottom: 0;
                    right: -142.5px;
                    content: '';
                    width: 150px;
                    height: 150px;
                    clip-path: polygon(0 75%, 0 100%, 100% 76%);
                    background: var(--background-primary);
                }

                p {
                    overflow: hidden;
                    max-width: fit-content;
                    border-right: .15em solid var(--text-primary);
                    white-space: nowrap;
                    margin: 0 auto;
                    letter-spacing: .1em;
                    animation:
                            typing 5s steps(30, end),
                            blink-caret .75s step-end infinite;
                }

                @keyframes typing {
                    from {
                        width: 0;
                    }
                    to {
                        width: 100%;
                    }
                }

                @keyframes blink-caret {
                    from, to {
                        border-color: transparent;
                    }
                    50% {
                        border-color: var(--palette-heliotrope);
                    }
                }
            }

            img {
                position: absolute;
                top: 25%;
                right: -75px;
                width: 400px;
                border-radius: 20px;
                border: 2px solid white;
                transform: rotate(-20deg);
                animation: float 2s ease-in-out infinite;
            }

            @keyframes float {
                0% {
                    transform: rotate(-20deg) translateY(0);
                }
                50% {
                    transform: rotate(-20deg) translateY(-10px);
                }
                100% {
                    transform: rotate(-20deg) translateY(0);
                }
            }
        }

        &.second {
            height: 50vh;

            .conv {
                position: absolute;
                left: -75px;
                top: 0;
                transform: rotate(20deg);
                opacity: .75;
            }
        }

        &.third {
            height: 50vh;

            .mic {
                position: absolute;
                right: -75px;
                top: 0;
                transform: rotate(-20deg);
                opacity: .75;
            }
        }

        &.fourth {
            height: 50vh;

            .lang {
                position: absolute;
                left: -75px;
                top: 0;
                transform: rotate(20deg);
                opacity: .75;
            }
        }

        .section-step {
            position: absolute;
            width: 200px;
            height: calc(100% - 40px);
            border: 5px solid #ffffff;

            &::before {
                position: absolute;
                content: '';
                top: 50%;
                width: 50px;
                height: 50px;
                background: var(--palette-carribean-green);
                border-radius: 50%;
                border: 5px solid white;
                animation: slide 1s ease-out;
            }

            @keyframes slide {
                from {
                    top: 25%;
                }
                to {
                    top: 50%;
                }
            }

            &.first {
                height: 105%;
                bottom: 0;
            }

            &:not(.first) {
                top: 0;
            }

            &.left {
                left: -5px;
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;

                &::before {
                    right: -30px;
                }
            }

            &.right {
                right: -5px;
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;

                &::before {
                    left: -30px;
                }
            }
        }
    }
}
</style>
