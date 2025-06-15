<script lang="ts">
import type { UserData } from '$lib/types';
import Footer from '$lib/components/Footer.svelte';
import Header from '$lib/components/Header.svelte';

const { data, children } = $props<{ data: UserData; children: any }>(); 
</script>

<Header data={data} />

{@render children()}

<Footer />