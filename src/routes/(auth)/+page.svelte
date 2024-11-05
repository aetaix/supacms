<script>
	import { enhance, applyAction } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Eye, EyeClosed } from 'lucide-svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import { Input } from '$lib/components/ui/input/index.ts';
	import Loader from '$lib/components/ui/Loader.svelte';

	let { form } = $props();

	let showPassword = $state(false);
	let loading = $state(false);
</script>

<main class="h-screen flex flex-col">
	<div class="flex-grow flex flex-col items-center justify-center gap-6">
		<Logo size={90} />
		<form
			method="POST"
			action="?/login"
			use:enhance={() => {
				loading = true;
				return async ({ result }) => {
					if (result.type === 'redirect') {
						goto(result.location);
					} else {
						loading = false;
						await applyAction(result);
					}
				};
			}}
			class="p-4 bg-white shadow rounded-xl border w-full max-w-xl space-y-4"
		>
			<h1 class="text-2xl font-bold">Welcome!</h1>
			<div>
				<label for="email" class="block mb-1 text-sm">Email</label>
				<Input
					id="email"
					type="email"
					name="email"
					placeholder="Email"
					class="border rounded-lg py-2 px-3"
				/>
			</div>
			<div>
				<label for="password" class="block mb-1 text-sm">Password</label>
				<div class="flex items-center gap-2">
					<Input
						id="password"
						type={showPassword ? 'text' : 'password'}
						name="password"
						placeholder="Password"
						class="border rounded-lg py-2 px-3"
					/>
					<button
						type="button"
						onclick={() => (showPassword = !showPassword)}
						class=" size-10 rounded-lg flex items-center justify-center bg-neutral-100 hover:bg-neutral-200"
					>
						{#if showPassword}
							<EyeClosed size={20} />
						{:else}
							<Eye size={20} />
						{/if}
					</button>
				</div>
			</div>

			<button
				class="{loading
					? 'loading text-white'
					: 'bg-primary hover:bg-primary-hover'} transition-colors w-full rounded-full font-bold py-3 px-4"
			>
				{#if loading}
					<Loader />
				{:else}
					Login
				{/if}
			</button>

			{#if form?.missing}<p
					class="rounded-lg border border-red-500 bg-red-500/10 p-2 text-center text-sm text-red-500"
				>
					The email field is required
				</p>{/if}
			{#if form?.incorrect}<p
					class="rounded-lg border border-red-500 bg-red-500/10 p-2 text-center text-sm text-red-500"
				>
					Vos informations sont incorrectes
				</p>{/if}
		</form>
	</div>
	<footer class="p-4 bg-black text-white text-sm flex justify-between items-center">
		<p>Privacy Policy</p>
		<p class="opacity-50">thoth - v0.1.12</p>
	</footer>
</main>


