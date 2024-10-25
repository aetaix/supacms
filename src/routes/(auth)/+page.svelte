<script>
	import { enhance } from '$app/forms';
	let loading = $state(false)
</script>

<main class="h-screen flex items-center justify-center bg-zinc-900 text-white">
	<div class="bg-zinc-800 border border-zinc-700 rounded-xl shadow w-full max-w-xl p-8 space-y-4">
		<h1 class="text-2xl font-semibold">Login</h1>
		<p class="text-zinc-200">Hey! Enter your details to get sign in to your account.</p>
		<form
			method="POST"
			action="?/login"
			use:enhance={() => {
				loading = true
			}}
			class="flex flex-col space-y-4"
		>
			<input class="border rounded-lg py-2 px-3" name="email" type="email" placeholder="Email" />
			<input
				class="border rounded-lg py-2 px-3"
				name="password"
				type="password"
				placeholder="Password"
			/>
			<button class="bg-green-400 text-green-950 py-2 px-3 rounded-lg">
				{#if loading}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="animate-spin h-5 w-5 text-white"
						viewBox="0 0 24 24"
					>
						<circle cx="12" cy="12" r="10" class="opacity-25" />
						<path
							class="opacity-75"
							fill="white"
							d="M4 12a8 8 0 018-8V2.83a1 1 0 011.7-.71l5 5a1 1 0 010 1.42l-5 5a1 1 0 01-1.41-1.42L11.59 9H12a1 1 0 010 2h-4a1 1 0 01-1-1V4a1 1 0 012 0v4z"
						/>
					</svg>
				{:else}
					Login
				{/if}
			</button>
		</form>
	</div>
</main>
