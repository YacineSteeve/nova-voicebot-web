<script setup lang="ts">
</script>

<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<style lang="scss">
$input-height: 2.4em;

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
        height: fit-content;
        background: var(--background-secondary);

        label {
            $font-size: 1em;

            position: absolute;
            top: .75em;
            left: 0;
            color: var(--form-label);
            pointer-events: none;
            display: block;
            font-size: 1em;
            height: $input-height;
            width: 100%;
            padding-left: 0.75em;
            transition: all 0.05s ease;
        }

        input {
            -webkit-appearance: none;
            display: flex;
            align-items: center;
            font-size: 1.1em;
            color: var(--text-primary);
            width: calc(100% - 2.5em);
            height: $input-height;
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

            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus,
            &:-webkit-autofill:active {
                -webkit-box-shadow: 0 0 0 1000px var(--background-secondary) inset;
                -webkit-text-fill-color: var(--text-primary) !important;
            }
        }

        input:focus ~ label,
        input.used ~ label,
        textarea:focus ~ label,
        textarea.used ~ label {
            font-size: 0.8em;
            font-weight: bold;
            transform: translate(-0.75em, -1.75em);
            color: var(--palette-heliotrope);
        }

        input:focus ~ .bar:before,
        input:focus ~ .bar:after,
        input.error ~ .bar:before,
        input.error ~ .bar:after {
            width: 50%;
        }

        textarea {
            $padding: 0.75em;

            font-size: 1.1em;
            width: calc(100% - 2 * $padding);
            margin-inline: auto;
            padding: $padding;
            border: none;
            background: transparent;

            &:focus {
                outline: 1px solid black;
            }
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
                background: var(--form-label);
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
                bottom: 0;
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
        height: $input-height;
        cursor: pointer;
        border: none;
        transition: all 0.2s ease;

        &.delete {
            background: var(--main-red);

            &:hover {
                background: red;
            }
        }

        &:hover {
            background: var(--palette-electric-violet);
        }

        &:disabled {
            cursor: default;
            background: var(--palette-fog);
        }
    }
}
</style>
