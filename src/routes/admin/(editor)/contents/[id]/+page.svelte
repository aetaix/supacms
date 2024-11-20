<script>
	import { enhance, applyAction } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { Toaster } from '$lib/components/ui/sonner/index.ts';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.ts';
	import Editor from '$lib/components/Editor.svelte';
	import Loader from '$lib/components/ui/Loader.svelte';
	import { ArrowLeft, Save, Ellipsis, Trash, Copy, BookCheck, BookDashed } from 'lucide-svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	let { data, form } = $props();
	let { content } = $state(data);

	let loading = $state(false);
	let tabActive = $state('content');
</script>

<svelte:head>
	<title>{content.title} • Thoth</title>
</svelte:head>

<header class="flex gap-2 items-center p-4 border-b h-20">
	<div class="w-1/5 flex items-center gap-4">
		<a
			href="/admin"
			class="size-10 shrink-0 flex items-center transition-colors hover:bg-black hover:text-white justify-center border rounded-full"
		>
			<ArrowLeft size="24" />
		</a>
		<div class="flex items-center truncate">
			<span class="shrink-0">Edit /</span><span class="truncate font-bold">{content.title}</span>
		</div>
	</div>
	<div class="w-3/5 flex justify-center items-center">
		<div class="rounded-full border flex items-center">
			<button
				onclick={() => (tabActive = 'content')}
				class="px-4 py-2 rounded-full {tabActive === 'content' ? 'bg-black text-white' : ''}">Contenu</button
			>
			<button 
				onclick={() => (tabActive = 'seo')} 
				class="px-4 py-2 rounded-full {tabActive === 'seo' ? 'bg-black text-white' : ''}">SEO</button>
		</div>
	</div>
	<div class=" w-1/5 flex justify-end items-center gap-2">
		<form
			method="POST"
			action="?/save"
			class="flex items-center gap-2"
			use:enhance={({ formData }) => {
				loading = true;
				// append all content data to the form
				formData.append('content', JSON.stringify(content));

				return async ({ result }) => {
					console.log('result', result);
					if (result.type === 'error') {
						loading = false;
					} else if (result.type === 'success') {
						loading = false;

						if (result.data.state === 'draft') {
							content.state = 'draft';
							toast.success('Article unpublished', {
								description: 'Your article is no longer published.'
							});
						} else {
							content.state = 'published';
							toast.success('Article published', {
								description: 'Your article is now published.'
							});
						}
					} else {
						await applyAction(result);
						loading = false;

						toast.success('Article saved!', {
							description: 'Your article has been saved successfully.'
						});
					}
				};
			}}
		>
			{#if !loading}
				{#if content.state === 'published'}
					<button
						type="submit"
						formaction="?/unpublish"
						class="bg-neutral-100 hover:bg-primary-hover px-4 rounded-full py-3 transition-all flex gap-2 items-center"
					>
						{#if loading}
							<Loader />
						{:else}
							<BookDashed size="20" />
							Unpublished
						{/if}
					</button>
				{/if}
				<button
					type="submit"
					class=" bg-primary hover:bg-primary-hover px-4 rounded-full py-3 transition-all flex gap-2 items-center"
				>
					{#if loading}
						<Loader />
					{:else}
						<Save size="20" />
						Save
					{/if}
				</button>
				{#if content.state === 'draft'}
					<button
						type="submit"
						formaction="?/publish"
						class=" bg-neutral-100 hover:bg-primary-hover px-4 rounded-full py-3 transition-all flex gap-2 items-center"
					>
						{#if loading}
							<Loader />
						{:else}
							<BookCheck size="20" />
							Publish
						{/if}
					</button>
				{/if}
			{:else}
				<div class="loading text-white w-24 p-3 rounded-full">
					<Loader />
				</div>
			{/if}
		</form>

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
							console.log('content', content);
							formData.append('id', content.id);

							return async ({ result }) => {
								if (result.type === 'error') {
								} else {
									await applyAction(result);
								}
							};
						}}
					>
						<button
							formaction="?/dupliacte"
							class="w-full p-1 flex items-center gap-2 justify-start text-sm hover:bg-neutral-100 rounded"
						>
							<Copy size="16" />
							Duplicate</button
						>
						<button
							formaction="?/delete"
							class="w-full p-1 flex items-center gap-2 justify-start text-sm hover:bg-red-100 bg-red-50 text-red-500 rounded"
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

{#if tabActive === 'content'}
	<section class="grid grid-cols-8">
		<article class="w-full max-w-xl mx-auto py-20 col-span-6">
			<textarea
				type="text"
				class="text-4xl mb-4 font-bold w-full focus:outline-none bg-transparent border py-8 px-0 focus:px-4 transition-all border-b-2 border-transparent border-b-neutral-200 focus:border-black"
				placeholder="Title"
				rows={content.title.length / 20}
				bind:value={content.title}
			></textarea>

			<Editor bind:value={content.content} />
		</article>

		<Sidebar bind:data={content} />
	</section>
{:else}
	<div>SEO</div>
{/if}
<Toaster />
