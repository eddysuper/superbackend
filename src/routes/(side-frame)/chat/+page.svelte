<script lang="ts">
import PlanPill from '$lib/components/PlanPill.svelte';
import ChatInput from '$lib/components/ChatInput.svelte';
import ChatMessages from '$lib/components/ChatMessages.svelte';
import type { UserData, ChatMessage } from '$lib/types';
import { getPageData, setPageData } from '$lib/stores';
import { goto } from '$app/navigation';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

export let data: UserData;

let messages: ChatMessage[] = [];
let inputValue = '';
let chat_id: string | null = null;

const pageData = getPageData();
handleSendMessage({detail: pageData.starting_message})
setPageData({starting_message: null});

async function handleSendMessage(event: { detail: any }) {
    if (!data.authenticated) {
        goto('/login');
    }
    const message_text = event.detail;

    const user_message: ChatMessage = {
        message_text: message_text,
        role: 'user',
        timestamp: new Date().toISOString(),
    };
    messages = [...messages, user_message];
    inputValue = '';

    const requestBody = {
        message_text: message_text,
        ...(chat_id && { chat_id: chat_id }),
    };

    try {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/api/chat/chat`, {
            credentials: 'include', // Important for sending cookies/auth headers
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const resp = await response.json();
            console.log(resp);
            chat_id = resp.user_message.chat_id;
            messages = [...messages, resp.bot_message];
        } else {
            console.log('not ok returned:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error sending chat message:', error);
    }
}
</script>



<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
    <PlanPill />
    <div class="flex-1 overflow-y-auto px-6 pb-4">
        <ChatMessages {messages} />
    </div>
    <div class="sticky bottom-0 bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-4">
        <ChatInput bind:value={inputValue} on:send={handleSendMessage} />
    </div>
</div>
