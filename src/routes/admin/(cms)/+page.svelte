<script>
	import Article from '$lib/components/ui/Article.svelte';
	import { contents } from '$lib/stores';
	import { Plus } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Contents • Thoth</title>
</svelte:head>

<header class="p-4 border-b flex justify-between items-center">
	<h1 class="text-lg font-bold flex items-center gap-2">
		Tous les contenus <span
			class="size-6 bg-black rounded-full flex items-center justify-center text-white text-sm"
			>{$contents.length}</span
		>
	</h1>
	<a 
	href="/admin/contents/new"
	class="rounded-full py-3 px-4 bg-primary flex items-center font-bold gap-2">
		<Plus size="20" />
		Ajouter</a
	>
</header>

<div class="p-4">
	{#if $contents.length === 0}
		<p>No content found</p>
	{:else}
		<div class="grid grid-cols-3 gap-4">
			{#each $contents as content}
				<Article
					id={content.id}
					title={content.title}
					excerpt={content.excerpt}
					created={content.created_at}
					updated={content.updated_at}
					state={content.state}
				/>
			{/each}
		</div>
	{/if}
</div>
