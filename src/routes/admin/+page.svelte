<script>
	import Article from '$lib/components/ui/Article.svelte';
	import { contents } from '$lib/stores';
	import { Plus } from 'lucide-svelte';
</script>

<header class="p-4 border-b flex justify-between items-center">
	<h1 class="text-lg font-bold">Tous les contenus</h1>
	<button class="rounded-full py-3 px-4 bg-primary flex items-center font-bold gap-2">
		<Plus size="20" />
		Ajouter</button
	>
</header>

<div class="p-4">
	{#if $contents.length === 0}
		<p>No content found</p>
	{:else}
		<div class="grid grid-cols-3 gap-4">
			{#each $contents as content}
				<Article title={content.title} {content} />
			{/each}
		</div>
	{/if}
</div>
