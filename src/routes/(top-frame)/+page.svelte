<script lang="ts">
import PlanPill from '$lib/components/PlanPill.svelte';
import ChatHeader from '$lib/components/ChatHeader.svelte';
import ChatInput from '$lib/components/ChatInput.svelte';
import { goto } from '$app/navigation';
import { setPageData } from '$lib/stores.js';
import { v4 as uuidv4 } from 'uuid';
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { UserData, ChatMessage } from '$lib/types';

export let data: UserData;

async function handleSendMessage(event: { detail: string }) {
    if (!data.authenticated) {
        goto('/login');
    }

    const message_text = event.detail;
    setPageData({ starting_message: message_text});
    goto('/chat');
}
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
    <PlanPill upgradePage="/billing" />
    <div class="flex-1 flex flex-col items-center px-6 pb-20 pt-20">
        <div class="w-full max-w-3xl mx-auto">
            <ChatHeader />
            <div class="mt-12">
                <ChatInput on:send={handleSendMessage} />
            </div>
        </div>
    </div>
</div>
