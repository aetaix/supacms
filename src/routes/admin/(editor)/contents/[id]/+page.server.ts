import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ depends, params, locals: { supabase } }) => {

    depends('supabase:db:contents');

    const id = params.id;

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