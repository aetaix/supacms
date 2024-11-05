<script>
	import Loader from '$lib/components/ui/Loader.svelte';
	import { ArrowLeft, Save } from 'lucide-svelte';
	let { data } = $props();
	let { content } = $state(data);

	let slug = $derived(content.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase());

	let loading = $state(false);

	async function save() {
		loading = !loading;
	}
</script>

<header class="flex gap-2 items-center p-4 border-b">
	<div class="w-1/3 flex items-center gap-4">
		<a
			href="/admin"
			class="size-10 flex items-center hover:bg-black hover:text-white justify-center border rounded-full"
		>
			<ArrowLeft size="24" />
		</a>
		Edit / {content.title}
	</div>
	<div class="w-1/3 flex justify-center items-center"></div>
	<div class="w-1/3 flex justify-end items-center">
		<button
		onclick={save}
			class=" {loading
				? 'loading text-white w-24 px-3'
				: 'bg-primary hover:bg-primary-hover px-4'} rounded-full py-3 transition-all flex gap-2 items-center"
		>
			{#if loading}
				<Loader />
			{:else}
				<Save size="24" />
				Save
			{/if}
		</button>
	</div>
</header>

<article class="w-full max-w-xl mx-auto pt-20">
	<input
		type="text"
		class="text-4xl mb-4 font-bold w-full focus:outline-none border py-8 px-0 focus:px-4 transition-all border-b-2 border-transparent border-b-neutral-200 focus:border-black"
		bind:value={content.title}
	/>

	<textarea bind:value={content.content} class="w-full"></textarea>
</article>
