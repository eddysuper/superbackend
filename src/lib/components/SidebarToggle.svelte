<script>
  import { ChevronRight } from "lucide-svelte";
  import Button from "$lib/components/Button.svelte";
  
  export let sidebarState = "collapsed";
  export let onToggle = () => {};
  
  $: isExpanded = sidebarState === "expanded";
</script>

{#if !isExpanded}
  <Button
    variant="ghost"
    size="sm"
    on:click={onToggle}
    class="fixed top-4 left-4 z-50 bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
  >
    <ChevronRight class="h-4 w-4" />
  </Button>
{/if}