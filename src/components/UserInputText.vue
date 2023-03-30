<script setup lang="ts">
import {ref} from 'vue';
import {useStore} from '@/store/store';
import {MutationTypes} from '@/store/mutations';
import ButtonWithIcon from '@/components/ButtonWithIcon.vue';

const store = useStore();

const inputText = ref<string>('');

function wakeNova() {
    store.commit(MutationTypes.CHANGE_NOVA_STATUS, 'active');
}

function sendText() {
    if (inputText.value !== '') {
        wakeNova();
        store.commit(MutationTypes.CHANGE_USER_TEXT, inputText.value);
    }
}

function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        sendText();
    }
}

function clearInput() {
    inputText.value = '';
}
</script>

<template>
    <div class="user-input-text">
        <textarea
            v-model="inputText"
            :placeholder="store.getters.translationsDictionary.callToTalk"
            @keydown="handleKeydown"
        ></textarea>
        <div class="button-container">
            <ButtonWithIcon
                icon="fa-eraser"
                width="18%"
                class="clear"
                @click="clearInput"
            >
                Clear
            </ButtonWithIcon>
            <ButtonWithIcon
                icon="pr-send"
                width="35%"
                class="send"
                @click="sendText"
            >
                Send my question
            </ButtonWithIcon>
        </div>
    </div>
</template>

<style scoped lang="scss">
.user-input-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-block: 2.5%;

    textarea {
        position: relative;
        display: flex;
        justify-content: center;
        font-size: 1.5em;
        color: var(--text-primary);
        min-width: 80%;
        width: 80%;
        max-width: 80%;
        min-height: 60%;
        height: 60%;
        max-height: 60%;
        padding: 1em;
        border: none;
        border-radius: 8px;
        background: var(--background-secondary);

        &:active,
        &:focus {
            outline: none;
        }

        &::placeholder {
            font-style: italic;
            opacity: 0.7;
            color: var(--text-primary);
        }
    }

    .button-container {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 80%;
        height: 25%;
    }
}
</style>
