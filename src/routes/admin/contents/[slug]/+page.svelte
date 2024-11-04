<script>
	let { data } = $props();
	let { contents } = $derived(data);
</script>

{#snippet article(content)}
	<div>
		<h2>{content.title}</h2>
		<p>{content.body}</p>
	</div>
{/snippet}

{#each contents as content}
	{@render article(content)}
{/each}
