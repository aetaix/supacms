<script>
		import { enhance, applyAction } from '$app/forms';

	import { page } from '$app/stores';
	import Article from '$lib/components/ui/Article.svelte';
	import { collections, contents } from '$lib/stores';
	import { Plus, Ellipsis, Trash } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.ts';

	let collection = $derived(
		$collections.find((collection) => collection.slug === $page.params.slug)
	);
	let collectionContents = $derived(
		$contents.filter((content) => content.collections.slug === $page.params.slug)
	);
</script>

<header class="p-4 border-b flex justify-between items-center">
	<h1 class="text-lg font-bold flex items-center gap-2">
		{collection?.name}
		<span class="size-6 bg-black rounded-full flex items-center justify-center text-white text-sm"
			>{collectionContents.length}</span
		>
	</h1>
	<div class="flex items-center justify-end">
		<a
			href="/admin/contents/new?collection={collection.id}"
			class="rounded-full py-3 px-4 bg-primary flex items-center font-bold gap-2"
		>
			<Plus size="20" />
			Ajouter</a
		>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="size-10 shrink-0 flex items-center transition-colors hover:bg-black hover:text-white justify-center border rounded-full"
			>
				<Ellipsis size="20" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<form
						method="POST"
						use:enhance={({ formData }) => {
							// append all content data to the form
							formData.append('id', collection.id);

							return async ({ result }) => {
								if (result.type === 'error') {
								} else {
									await applyAction(result);
								}
							};
						}}
					>
						<button
							formaction="?/delete"
							class="w-full p-1 flex items-center gap-2 justify-start text-sm hover:bg-neutral-100 rounded"
						>
							<Trash size="16" />
							Delete</button
						>
					</form>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>

<div class="p-4">
	{#if collectionContents.length === 0}
		<p>No content found</p>
	{:else}
		<div class="grid grid-cols-3 gap-4">
			{#each collectionContents as content}
				<Article
					id={content.id}
					title={content.title}
					excerpt={content.excerpt}
					created={content.created_at}
					updated={content.updated_at}
				/>
			{/each}
		</div>
	{/if}
</div>
