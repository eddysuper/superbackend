<script lang="ts">
import type { UserData } from '$lib/types';

const { data, children } = $props<{ data: UserData; children: any }>(); 
</script>

{@render children()}
