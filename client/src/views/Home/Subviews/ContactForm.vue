<script setup lang="ts">
import {ref, watch} from 'vue';
import {POSITION, useToast} from 'vue-toastification';
import {useFetch} from '@/hooks/fetch';
import FormWrapper from '@/components/FormWrapper.vue';

const toast = useToast();

const name = ref<string>('');
const email = ref<string>('');
const subject = ref<string>('');
const message = ref<string>('');

async function sendMessage() {
    interface ContactResponse {
        success: boolean;
        message: string;
        info: string;
    }

    const {data, error} = await useFetch<ContactResponse>({
        type: 'contact',
        details: {
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value
        }
    });

    watch([data], () => {
        if (data.value && data.value.success) {
            toast.success(data.value.message, {
                position: POSITION.TOP_CENTER,
                timeout: 7000,
            });
            setTimeout(() => {
                name.value = '';
                email.value = '';
                subject.value = '';
                message.value = '';
                window.location.reload();
            }, 5000);
        }
    });

    watch([error], () => {
        if (error.value) {
            toast.error(
                typeof error.value === "string"
                    ? error.value.slice(error.value.lastIndexOf(':') + 1,)
                    : error.value.message
            );
            console.error(error.value);
        }
    });
}

</script>

<template>
    <div class="contact-form">
        <h1>Contact us</h1>
        <form @submit.prevent="sendMessage" class="total-center">
            <FormWrapper>
                <div class="group">
                    <input id="name" type="text" :class="{used: name !== ''}" v-model="name"
                           title="Enter your full name">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Your full name (Ex.: John Doe)</label>
                </div>
                <div class="group">
                    <input id="email" type="email" :class="{used: email !== ''}" v-model="email"
                           title="Enter your account email address" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Your email address</label>
                </div>
                <div class="group">
                    <input id="subject" type="text" :class="{used: subject !== ''}" v-model="subject"
                           title="Enter the subject of your query">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>The subject</label>
                </div>
                <div class="group">
                    <textarea id="message" name="message" rows="15" :class="{used: message !== ''}" v-model="message" required></textarea>
                    <label for="message">Your message</label>
                </div>
                <button type="submit" class="submit">
                    Send
                </button>
            </FormWrapper>
        </form>
    </div>
</template>

<style scoped lang="scss">
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 4em;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    padding-block: 4em;

    h1 {
        font-size: 2.5rem;
    }

    form {
        flex-direction: column;
        width: 75%;
    }
}
</style>
