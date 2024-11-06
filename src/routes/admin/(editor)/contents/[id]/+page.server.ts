import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ depends, params, url, locals: { supabase } }) => {

    depends('supabase:db:contents');

    const id = params.id;

    if (id === 'new') {
        return {
            content: {
                id: 'new',
                title: '',
                excerpt: '',
                content: '',
                collection_id: url.searchParams.get('collection') ?? 1,
                created_at: new Date().toISOString(),
                slug: '',
                updated_at: null
            }
        };
    }

    const { data: content, error } = await supabase
        .from('contents')
        .select('*, collections(*)')
        .eq('id', id)
        .single();

    if (error) {
        return { status: error, error: error.message };
    }

    return { content: content ?? null };
};

export const actions = {
    save: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const object = formData.get('content') as string;
        // JSON.parse is used to convert the FormData object to a plain object
        const content = JSON.parse(object);
        let isNew = false;

        // Check the content object
        // if content title is empty, return fail
        if (content.title === '') {
            return fail(400, { missingTitle: true });
        }

        // Format content object

        // if content excerpt is empty, automatically generate excerpt from content content
        if (!content.excerpt) { content.excerpt = content.content.slice(0, 200); }
        // remove collections key of content object
        delete content.collections;
        delete content.created_at;
        // update the updated_at key of content object
        content.updated_at = new Date().toISOString();
        // if content id is 'new', remove the id key of content object
        if (content.id === 'new') {
            delete content.id;
            isNew = true;
        }

        console.log(content);

        const { data, error } = await supabase
            .from('contents')
            .upsert(content)
            .select();

        if (error) {
            console.error(error);
            return fail(400, { error: error.message });
        }

        console.log(data);

        if (isNew && data) {
            redirect(303, `/admin/contents/${data[0].id}`);
        }

    }
} satisfies Actions;