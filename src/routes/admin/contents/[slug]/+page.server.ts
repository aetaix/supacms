import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, depends, locals: { supabase } }) => {
    depends('supabase:db:contents');
    console.log('params', params);
    const { data: contents, error } = await supabase
        .from('contents')
        .select('* , collections!inner(slug)')
        .eq('collections.slug', params.slug)
        .order('created_at', { ascending: false });

    console.log('contents', contents);

    if (error) {
        throw error;
    }
    return { contents: contents ?? [] };
};