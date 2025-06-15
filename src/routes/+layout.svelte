<script lang="ts">
import '../app.css';
let { children } = $props();
</script>

<svelte:head>
	<title>Superbackend - designed and managed by AI</title>
	<meta
		name="description"
		content="A complete backend (databases, authentication, payments, scaling) including application logic built by AI" />
</svelte:head>

{@render children()}