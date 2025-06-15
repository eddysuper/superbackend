<script lang="ts">
  import { afterUpdate } from 'svelte';
  import ChatMessage from './ChatMessage.svelte';
  import type { ChatMessage as Message } from '$lib/types';

  export let messages: Message[] = [];

  let messagesEndRef: HTMLDivElement;

  const scrollToBottom = () => {
    messagesEndRef?.scrollIntoView({ behavior: 'smooth' });
  };

  afterUpdate(() => {
    scrollToBottom();
  });
</script>

{#if messages.length > 0}
  <div class="w-full max-w-4xl mx-auto">
    <div class="space-y-2">
      {#each messages as message (message.timestamp)}
        <ChatMessage
          content={message.message_text}
          isUser={message.role === "user"}
        />
      {/each}
      <div bind:this={messagesEndRef} />
    </div>
  </div>
{/if}