<script>
  import { User } from 'lucide-svelte';

  export let content = '';
  export let isUser = false;
</script>

<div class="flex gap-2 p-4 justify-start">
  {#if isUser}
    <div class="flex gap-2 max-w-[70%] bg-slate-100 rounded-2xl px-5 py-4">
      <div class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-600 flex-shrink-0">
        <User class="w-4 h-4 text-white" />
      </div>
      <div class="flex-1">
        <p class="text-base leading-relaxed text-slate-800">{content}</p>
      </div>
    </div>
  {:else}
    <div class="max-w-[70%]">
      <p class="text-base leading-relaxed text-slate-800">{content}</p>
    </div>
  {/if}
</div>