<script>
	import Logo from './Logo.svelte';

	let { logout, openCreate, collections = $bindable([]) } = $props();
</script>

<header
	class="bg-zinc-950 group hover:w-64 transition-all flex flex-col border-r w-14 overflow-hidden fixed top-0 left-0 h-screen z-50"
>
	<Logo class="w-8 mx-2" />

	<nav class="h-full py-4">
		{#snippet item(collection)}
			<div class="group-hover:flex gap-4 items-center px-2 hidden mb-2">
				<div class="rounded w-10 h-10 bg-zinc-800 shrink-0"></div>
				<a href={`/admin/contents/${collection.slug}`} class="block">{collection.name}</a>
				<button>...</button>
			</div>
		{/snippet}
		{#each collections as collection}
			{@render item(collection)}
		{/each}
		<div class="flex gap-4 items-center px-2">
			<div class="rounded w-10 h-10 bg-zinc-800 shrink-0"></div>
			<button onclick={openCreate}>Create</button>
		</div>
	</nav>

	<div class="flex gap-4 items-center px-2">
		<div class="rounded w-10 h-10 bg-zinc-800 shrink-0"></div>
		<button onclick={logout}>Logout</button>
	</div>
</header>
