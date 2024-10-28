import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends, locals: { supabase } }) => {
    depends('supabase:db:collections');
    const { data, error } = await supabase
        .from('collections')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        throw error;
    }

    return { collections: data ?? [] };
};

