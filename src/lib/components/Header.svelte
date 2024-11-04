<script>
	import Logo from './ui/Logo.svelte';
	import { Search, Plus } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.ts';

	let { logout } = $props();
</script>

<header class="bg-black text-white flex items-center justify-between p-4">
	<div class="w-1/3 flex items-center">
		<Logo size={90} />
	</div>
	<div class="w-1/3">
		<div class="border border-white/20 focus-within:border-white px-4  rounded-full flex gap-2 items-center">
			<Search size={20} />
			<input type="text" placeholder="Chercher un contenu" class="bg-transparent border-none w-full py-3 focus:outline-none" />
		</div>
	</div>
	<div class="w-1/3 flex justify-end items-center gap-2">
		<button class="py-3 px-4 border border-white/20 hover:bg-primary hover:border-primary transition-colors hover:text-black rounded-full flex items-center gap-2">
			<Plus size={20} />
			Créer</button
		>
		<Avatar.Root>
			<Avatar.Image 
			onclick={logout}
			src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</div>
</header>
