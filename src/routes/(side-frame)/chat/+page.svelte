<script lang="ts">
import PlanPill from '$lib/components/PlanPill.svelte';
import ChatInput from '$lib/components/ChatInput.svelte';
import ChatMessages from '$lib/components/ChatMessages.svelte';
import type { UserData, ChatMessage } from '$lib/types';
import { goto, replaceState } from '$app/navigation';
import { PUBLIC_CHAT_AI_BASE_URL } from '$env/static/public';
import { userStore } from '$lib/stores/userStore';
import { get } from 'svelte/store';
import { page } from '$app/stores';
import { onDestroy } from 'svelte';

export let data: UserData;

let messages: ChatMessage[] = [];
let inputValue = '';
let chat_id: string | null = null;
let task_id: string | null = null;
let pollingInterval: ReturnType<typeof setInterval> | null = null;

// Get message from URL parameter
const message = $page.url.searchParams.get('message');
if (message) {
    // Create a bot message from the response
    const userMessage: ChatMessage = {
                message_text: message,
                role: "user",
                timestamp: new Date().toISOString()
            };
    messages = [...messages, userMessage];
    createProjectWithMessage(message);
    // Remove the message parameter from the URL using SvelteKit's navigation
    const url = new URL(window.location.href);
    url.searchParams.delete('message');
    replaceState(url.toString(), {
        message: null
    });
}

async function pollTaskStatus() {
    if (!task_id) return;
    
    try {
        const response = await fetch(`${PUBLIC_CHAT_AI_BASE_URL}/tasks/${task_id}`);
        if (response.ok) {
            const data = await response.json();
            console.log("Task status:", data);
            
            // Update the last message with the new status message
            if (messages.length > 0) {
                const lastMessage = messages[messages.length - 1];
                if (lastMessage.role === "bot") {
                    lastMessage.message_text = data.message;
                    messages = [...messages]; // Trigger reactivity
                }
            }
            
            // Stop polling if task is no longer pending
            if (data.status !== "pending") {
                if (pollingInterval) {
                    clearInterval(pollingInterval);
                    pollingInterval = null;
                }
            }
        }
    } catch (error) {
        console.error('Error polling task status:', error);
        // Stop polling on error
        if (pollingInterval) {
            clearInterval(pollingInterval);
            pollingInterval = null;
        }
    }
}

async function createProjectWithMessage(message: string) {
    const userData = get(userStore);
    if (!userData?.data?.current_user) {
        console.log("User not authenticated");
        goto('/login');
    }
    const projectData = {
        user_id: userData?.data?.current_user?.user_id ?? '',
        message: message,
        project_name: "New Project",
        project_description: "Project created from chat message",
        project_meta: {
            created_at: new Date().toISOString(),
            source: "chat",
            status: "active"
        },
        context: {
            platform: "web",
            browser: navigator.userAgent,
            timestamp: new Date().toISOString()
        }
    };
    console.log(projectData);

    try {
        const response = await fetch(`${PUBLIC_CHAT_AI_BASE_URL}/projects/create-with-message`, {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        });

        if (response.ok) {
            const data = await response.json();
            task_id = data.task_id;
            
            // Create a bot message from the response
            const botMessage: ChatMessage = {
                message_text: data.message,
                role: "bot",
                timestamp: new Date().toISOString()
            };
            messages = [...messages, botMessage];
            
            // Start polling for task status
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
            pollingInterval = setInterval(pollTaskStatus, 10000); // Poll every 10 seconds
            
            console.log("--------------------------------------");
            console.log(data);
            console.log('Project created successfully');
        } else {
            console.error('Failed to create project:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error creating project:', error);
    }
}

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
        message: message_text,
        user_id: "1234",
        ...(chat_id && { conversation_id: chat_id }),
    };

    try {
        const response = await fetch(`http://supabackend.hopto.org:8000/api/chat/chat`, {
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
            console.log("--------------------------------------");
            console.log(chat_id);
        } else {
            console.log('not ok returned:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error sending chat message:', error);
    }
}

// Clean up polling interval when component is destroyed
onDestroy(() => {
    if (pollingInterval) {
        clearInterval(pollingInterval);
    }
});
</script>



<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
    <PlanPill upgradePage="/billing" />
    <div class="flex-1 overflow-y-auto px-6 pb-4">
        <ChatMessages {messages} />
    </div>
    <div class="sticky bottom-0 bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-4">
        <ChatInput bind:value={inputValue} on:send={handleSendMessage} />
    </div>
</div>
