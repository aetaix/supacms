<script>
	import { page } from '$app/stores';
	import * as Accordion from '$lib/components/ui/accordion/index.ts';
	import { Textarea } from '$lib/components/ui/textarea/index.ts';
	import { Input } from '$lib/components/ui/input/index.ts';

	import { Settings, Pencil } from 'lucide-svelte';
	let { data = $bindable() } = $props();
	function slugify(string) {
		return string.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
	}

	let inputFile = $state(null);
	let loading = $state(false);
	function trigger() {
		inputFile.click();
	}
	function handleFile() {
		loading = true;
		const file = inputFile.files[0];
		const formData = new FormData();

		formData.append('id', $page.params.id);
		formData.append('file', file);

		fetch('/api/medias/create', {
			method: 'POST',
			body: formData
		})
			.then((res) => res.json())
			.then((d) => {
				loading = false;
				console.log(d);
				data.thumbnail = d.url;
			})
			.catch((err) => console.error(err));
	}
</script>

<aside class="border-l col-span-2 min-h-[calc(100vh-80px)]">
	<header class="p-4 border-b flex items-center gap-2">
		<Settings size="24" />
		<h2 class="">Paramètres</h2>
	</header>
	<Accordion.Root type="multiple" class="w-full" value={["thumbnail"]}>
		<Accordion.Item value="thumbnail" class="px-4" >
			<Accordion.Trigger class="font-semibold text-sm">Miniature</Accordion.Trigger>
			<Accordion.Content>
				<input bind:this={inputFile} onchange={handleFile} type="file" class="sr-only" />
				{#if data.thumbnail}
				<div class="group flex justify-center items-center relative h-40">
					<img src={data.thumbnail} alt="thumbnail" class="w-full h-full object-cover rounded-lg" />
					<button 
					onclick={trigger}
					class="opacity-0 group-hover:opacity-100 px-3 py-2 rounded-full bg-white hover:bg-primary absolute top-4 right-4 flex items-center gap-2">
						<Pencil size="16" />
						Editer</button>
				</div>
				{:else}
					<button onclick={trigger} class="rounded-full text-white bg-black px-4 py-3"
						>Upload</button
					>
				{/if}
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item class="px-4">
			<Accordion.Trigger class="font-semibold text-sm">Extrait</Accordion.Trigger>
			<Accordion.Content>
				<Textarea bind:value={data.excerpt} placeholder="Excerpt" />
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item class="px-4">
			<Accordion.Trigger class="font-semibold text-sm">Lien</Accordion.Trigger>
			<Accordion.Content>
				<Input
					bind:value={data.slug}
					onchange={() => {
						data.slug = slugify(data.slug);
					}}
					placeholder="Slug"
				/>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item class="px-4">
			<Accordion.Trigger class="font-semibold text-sm">Auteur</Accordion.Trigger>
			<Accordion.Content>
				<Input bind:value={data.author} placeholder="Author" />
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</aside>
