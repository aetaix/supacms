<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { collections, contents } from '$lib/stores';
	import Header from '$lib/components/Header.svelte';
	import { SquareLibrary } from 'lucide-svelte';
	let { data, children } = $props();
	let { supabase, collections: dataCollections, contents: dataContents } = $derived(data);

	$effect(() => {
		collections.set(dataCollections);
		contents.set(dataContents);
	});

	async function logout() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			goto('/');
		}
	}
</script>

<main>
	<Header {logout} />
	<section class="grid grid-cols-6">
		<aside class="h-[calc(100vh-82px)] border-r col-span-1 p-4 space-y-4">
			<a href="/admin" class="rounded-md flex justify-start gap-2 w-full bg-black text-white p-2">
				<SquareLibrary size={24} />
				Tous les contenus
			</a>
			<ul class="">
				<h2 class="text-sm mb-2">Tous les collections</h2>
				{#each $collections as collection}
					<li>
						<a
							href={'/admin/collections/' + collection.slug}
							class="p-2 w-full text-start flex justify-between items-center rounded-md
						{$page.params.slug === collection.slug ? 'bg-neutral-100 ' : ''}
						"
						>
							<span class="font-bold">{collection.name}</span>

							<span class="text-sm text-neutral-500"
								>{$contents.filter((content) => content.collections.slug === collection.slug)
									.length}</span
							>
						</a>
					</li>
				{/each}
			</ul>
		</aside>
		<div class="col-span-5">
			{@render children()}
		</div>
	</section>
</main>
