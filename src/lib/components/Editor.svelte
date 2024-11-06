<script lang="ts">
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';

	import cx from 'clsx';
	import { createEditor, Editor, EditorContent, BubbleMenu } from 'svelte-tiptap';

	import { Bold, Heading, Italic, Underline as UnderlineIcon, List } from 'lucide-svelte';

	import StarterKit from '@tiptap/starter-kit';
	import Underline from '@tiptap/extension-underline';

	let { value = $bindable() }: { value: string } = $props();

	let editor = $state() as Readable<Editor>;

	onMount(() => {
		editor = createEditor({
			extensions: [StarterKit, Underline],
			content:
				value ||
				`
				<p>Hey, try to select some text here. There will popup a menu for selecting some inline styles.
				Remember: you have full control about content and styling of this menu..</p>
      	`,
			editorProps: {
				attributes: {
					class: 'prose outline-none'
				}
			},
			onUpdate: ({ editor }) => {
				value = editor.getHTML();
			}
		});
	});

	const toggleHeading = () => {
		$editor.chain().focus().toggleHeading({ level: 2 }).run();
	};

	const toggleBold = () => {
		$editor.chain().focus().toggleBold().run();
	};

	const toggleItalic = () => {
		$editor.chain().focus().toggleItalic().run();
	};

	const toogleUnderline = () => {
		$editor.chain().focus().toggleUnderline().run();
	};

	const toogleList = () => {
		$editor.chain().focus().toggleBulletList().run();
	};

	const isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);
</script>

{#if editor}
	<BubbleMenu editor={$editor}>
		<div class="flex border shadow p-1 bg-white gap-1">
			<button
				class={cx('rounded-lg text-neutral-400 flex items-center justify-center size-10', {
					'!text-white bg-neutral-700': isActive('heading', { level: 1 })
				})}
				type="button"
				onclick={toggleHeading}
			>
				<Heading size="16" />
			</button>
			<button
				class={cx('rounded-lg text-neutral-400 flex items-center justify-center size-10', {
					'!text-white bg-neutral-700': isActive('bold')
				})}
				type="button"
				onclick={toggleBold}
			>
				<Bold size="16" />
			</button>
			<button
				class={cx('rounded-lg text-neutral-400 flex items-center justify-center size-10', {
					'!text-white bg-neutral-700': isActive('italic')
				})}
				type="button"
				onclick={toggleItalic}
			>
				<Italic size="16" />
			</button>
			<button
				class={cx('rounded-lg text-neutral-400 flex items-center justify-center size-10', {
					'!text-white bg-neutral-700': isActive('underline')
				})}
				type="button"
				onclick={toogleUnderline}
			>
				<UnderlineIcon size="16" />
			</button>
			<button
				class={cx('rounded-lg text-neutral-400 flex items-center justify-center size-10', {
					'!text-white bg-neutral-700': isActive('bulletList')
				})}
				type="button"
				onclick={toogleList}
			>
			<List size="16" />
			</button>

		</div>
	</BubbleMenu>
{/if}

<EditorContent editor={$editor} />
