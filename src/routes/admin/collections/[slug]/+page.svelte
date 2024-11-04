<script>
	import { page } from '$app/stores';
	import Article from '$lib/components/ui/Article.svelte';
	import { collections, contents } from '$lib/stores';
	import { Plus } from 'lucide-svelte';

	let collection = $derived(
		$collections.find((collection) => collection.slug === $page.params.slug)
	);
	let collectionContents = $derived(
		$contents.filter((content) => content.collections.slug === $page.params.slug)
	);
</script>

<header class="p-4 border-b flex justify-between items-center">
	<h1 class="text-lg font-bold">{collection?.name}</h1>
	<button class="rounded-full py-3 px-4 bg-primary flex items-center font-bold gap-2">
		<Plus size="20" />
		Ajouter</button
	>
</header>

<div class="p-4">
	{#if collectionContents.length === 0}
		<p>No content found</p>
	{:else}
		<div class="grid grid-cols-3 gap-4">
			{#each collectionContents as content}
				<Article 
					title={content.title}
					content={content}
				/>
			{/each}
		</div>
	{/if}
</div>
