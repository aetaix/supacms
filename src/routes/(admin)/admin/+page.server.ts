import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
    depends('supabase:db:contents');
    const { data: contents, error } = await supabase
        .from('contents')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }

    console.log('contents', contents);

    return { contents: contents ?? [] };
};



