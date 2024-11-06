<script>
	import { niceDate } from '$lib/utils';
	let { id, title, excerpt, created, updated } = $props();
</script>

<a href="/admin/contents/{id}">
	<article class="border rounded-lg shadow overflow-hidden">
		<div class="p-4">
			<h2 class="text-lg font-bold">{title}</h2>
			{#if excerpt}
				{@html excerpt}
			{/if}
		</div>
		<footer class="bg-neutral-100 p-4 text-sm">
			{#if created}
			
				{niceDate(created)}
			{/if}
			{#if updated}
				&middot; Updated: {niceDate(updated)}
			{/if}
		</footer>
	</article>
</a>
