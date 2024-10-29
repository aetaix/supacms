<script>
	import { goto } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import CreateCollection from '$lib/components/CreateCollection.svelte';

	let { data, children } = $props();
	let collections = $state(data.collections);
	let openCreateCollection = $state(false);
	let { supabase } = $derived(data);

	function openCreate() {
		openCreateCollection = true;
	}

	async function logout() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			goto('/');
		}
	}
</script>

<main class="flex min-h-screen pl-14">
	<Header {logout} {openCreate} {collections} />
	<div>
		{@render children()}
	</div>
</main>

<CreateCollection bind:open={openCreateCollection} bind:collections />
