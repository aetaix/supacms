<script>
	let { open = $bindable(false), collections = $bindable([]) } = $props();
	let { name } = $state('');

	async function create() {

		const slug = name.toLowerCase().replace(/\s/g, '-');

		await fetch('/api/collections/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, slug })
		});

		collections.push({ name, slug });
	}
</script>

{#if open}
	<div class="fixed inset-0 flex justify-center items-center">
		<button
			onclick={() => (open = false)}
			aria-label="backdrop"
			class="bg-black/50 absolute w-full h-full top-0 left-0"
		></button>
		<div class="max-w-lg w-full bg-white p-4 relative">
			<label for="name">Name</label>
			<input bind:value={name} type="text" id="name" name="name" required />
			<button onclick={create}>Create</button>
		</div>
	</div>
{/if}
