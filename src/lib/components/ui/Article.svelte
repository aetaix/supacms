<script>
	import { niceDate } from '$lib/utils';
	let { id, title, excerpt, created, updated, state } = $props();
</script>

<a href="/admin/contents/{id}">
	<article class="border rounded-lg shadow overflow-hidden">
		<div class="p-4">
			{#if state === 'draft'}
			<div class="text-xs bg-neutral-100 text-neutral-500 rounded inline-block mb-2 p-1">Draft</div>
			{:else if state === 'published'}
				<div class="text-xs bg-green-300 rounded inline-block mb-2 p-1">Published</div>
			{/if}
			<h2 class="text-lg font-bold">{title}</h2>
			{#if excerpt}
				<div class="text-sm text-neutral-500">
					{@html excerpt.slice(0, 50)}
					{#if excerpt.length > 50}
						...
					{/if}
				</div>
			{/if}
		</div>
		<footer class="bg-neutral-50 p-4 text-sm">
			{#if created}
				{niceDate(created)}
			{/if}
			{#if updated}
				&middot; Updated: {niceDate(updated)}
			{/if}
		</footer>
	</article>
</a>
