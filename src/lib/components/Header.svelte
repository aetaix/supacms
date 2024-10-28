<script>
	let { logout, openCreate, collections = $bindable([]) } = $props();
</script>

<header class="flex flex-col justify-between p-2 border-r">
	<h1>Admin</h1>

	<nav>
		{#each collections as collection}
			{@render item(collection)}
		{/each}
		<button onclick={openCreate}>Create</button>
	</nav>

	<button onclick={logout}>Logout</button>
</header>

{#snippet item(collection)}
	<div class="flex gap-2 items-center">
		<a href={`/admin/contents/${collection.slug}`} class="block">{collection.name}</a>
		<button>...</button>
	</div>
{/snippet}
