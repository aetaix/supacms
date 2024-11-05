<script>
	let { id, title, content } = $props();
</script>

<a href="/admin/contents/{id}">
<article class="border rounded-lg shadow overflow-hidden">
	<div class="p-4">
		<h2 class="text-lg font-bold">{title}</h2>
		<p>{content}</p>
	</div>
	<footer class="bg-neutral-100 p-4"></footer>
</article>
</a>