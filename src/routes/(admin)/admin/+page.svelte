<script>
	import { goto } from '$app/navigation';

	let { data } = $props();
	let { supabase } = $derived(data);

	async function logout() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			goto('/');
		}
	}
</script>

<h1>Admin</h1>

<button onclick={logout}>Logout</button>
