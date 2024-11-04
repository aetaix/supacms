<script>
	let { title, content } = $props();
</script>

<article class="border rounded-lg shadow overflow-hidden">
	<div class="p-4">
		<h2 class="text-lg font-bold">{title}</h2>
		<p>{content.body}</p>
	</div>
	<footer class="bg-neutral-100 p-4"></footer>
</article>
