<script setup lang="ts">
</script>

<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<style lang="scss">

.container {
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
            font-size: 1.1em;
            color: var(--text-primary);
            width: 85%;
            height: 100%;
            margin-inline: auto;
            padding-right: 1.25em;
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
        input:focus ~ .bar:after,
        input.error ~ .bar:before,
        input.error ~ .bar:after {
            width: 50%;
        }

        .field-icon {
            position: absolute;
            right: 0;
            top: 0;
            padding: 0.75em;
            cursor: pointer;
            transition: all 0.2s ease;
            color: var(--text-primary);
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
                background: var(--palette-heliotrope);
            }

            &.error {
                &:before,
                &:after {
                    background: red;
                }
            }

            &:before,
            &:after {
                content: '';
                height: 2px;
                width: 0;
                bottom: 1px;
                position: absolute;
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

    .group-error {
        font-size: 1em;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        color: red;
        margin-top: -2em;
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
</style>
