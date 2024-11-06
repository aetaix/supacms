<script>
	import { enhance, applyAction } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { Toaster } from '$lib/components/ui/sonner/index.ts';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.ts';
	import Editor from '$lib/components/Editor.svelte';
	import Loader from '$lib/components/ui/Loader.svelte';
	import { ArrowLeft, Save, Ellipsis, Trash, Copy } from 'lucide-svelte';
	let { data, form } = $props();
	let { content } = $state(data);

	let slug = $derived(content.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase());

	let loading = $state(false);
</script>

<header class="flex gap-2 items-center p-4 border-b h-20">
	<div class="w-1/3 flex items-center gap-4">
		<a
			href="/admin"
			class="size-10 shrink-0 flex items-center transition-colors hover:bg-black hover:text-white justify-center border rounded-full"
		>
			<ArrowLeft size="24" />
		</a>
		<div class="flex items-center">
			<span class="shrink-0">Edit /</span><span class="truncate font-bold">{content.title}</span>
		</div>
	</div>
	<div class="w-1/3 flex justify-center items-center"></div>
	<div class="w-1/3 flex justify-end items-center gap-2">
		<form
			method="POST"
			action="?/save"
			use:enhance={({ formData }) => {
				loading = true;
				// append all content data to the form
				formData.append('content', JSON.stringify(content));

				return async ({ result }) => {
					if (result.type === 'error') {
						loading = false;
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
			<button
				type="submit"
				class=" {loading
					? 'loading text-white w-24 px-3'
					: 'bg-primary hover:bg-primary-hover px-4'} rounded-full py-3 transition-all flex gap-2 items-center"
			>
				{#if loading}
					<Loader />
				{:else}
					<Save size="20" />
					Save
				{/if}
			</button>
		</form>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="size-10 shrink-0 flex items-center transition-colors hover:bg-black hover:text-white justify-center border rounded-full"
			>
				<Ellipsis size="20" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<form method="POST" use:enhance={({ formData }) => {
				
						// append all content data to the form
						formData.append('id', content.id);
		
						return async ({ result }) => {
							if (result.type === 'error') {
								
							} else {
								await applyAction(result);
							}
						};
					}}>
						<button
							formaction="?/dupliacte"
							class="w-full p-1 flex items-center gap-2 justify-start text-sm hover:bg-neutral-100 rounded"
						>
							<Copy size="16" />
							Duplicate</button
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

<article class="w-full max-w-xl mx-auto py-20">
	<input
		type="text"
		class="text-5xl mb-4 font-bold w-full focus:outline-none bg-transparent border py-8 px-0 focus:px-4 transition-all border-b-2 border-transparent border-b-neutral-200 focus:border-black"
		placeholder="Title"
		bind:value={content.title}
	/>

	<Editor bind:value={content.content} />
</article>

<Toaster />
