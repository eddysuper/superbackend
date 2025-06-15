<script lang="ts">
  import { Send } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';

  export let value: string = '';
  
  const dispatch = createEventDispatcher<{
    change: string;
    send: string;
  }>();

  let isFocused = false;
  let textareaElement: HTMLTextAreaElement;

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (value.trim()) {
      dispatch('send', value.trim());
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    value = target.value;
    dispatch('change', value);
    
    // Auto-resize textarea
    target.style.height = 'auto';
    target.style.height = Math.min(target.scrollHeight, 128) + 'px';
  }

  function handleFocus() {
    isFocused = true;
  }

  function handleBlur() {
    isFocused = false;
  }
</script>

<div class="w-full max-w-4xl mx-auto">
  <form on:submit={handleSubmit} class="relative">
    <div class="relative bg-white rounded-3xl border transition-all duration-200 {isFocused ? 'border-slate-300 shadow-lg' : 'border-slate-200 shadow-sm'}">
      <div class="flex items-center px-6 py-4">
        <textarea
          bind:this={textareaElement}
          bind:value={value}
          on:focus={handleFocus}
          on:blur={handleBlur}
          on:keydown={handleKeyDown}
          on:input={handleInput}
          placeholder="What do you need your backend to do?"
          class="flex-1 resize-none border-none outline-none text-slate-800 placeholder-slate-500 text-lg leading-relaxed bg-transparent min-h-[2rem] max-h-32"
          rows="1"
          style="height: auto; overflow: hidden;"
        />
        <button
          type="submit"
          class="ml-4 w-10 h-10 p-0 text-white rounded-full inline-flex items-center justify-center transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style="background-color: #4B8CDC;"
          disabled={!value.trim()}
        >
          <Send class="w-4 h-4" />
        </button>
      </div>
    </div>
  </form>
</div>

<style>
  /* Additional styles if needed */
</style>