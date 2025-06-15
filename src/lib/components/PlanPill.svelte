<script lang="ts">
import { goto } from '$app/navigation';

export let upgradePage: string;

function handleUpgrade() {
    goto(upgradePage);
}
</script>

<div class="flex justify-center pt-8 pb-4">
    <div
        class="flex items-center gap-3 text-sm bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200/50 shadow-sm">
        <span class="text-slate-600">Free plan</span>
        <button
            class="text-blue-500 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            on:click={handleUpgrade}>
            Upgrade
        </button>
    </div>
</div>
