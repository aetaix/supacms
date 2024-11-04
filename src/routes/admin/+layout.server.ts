/**
 * This file is necessary to ensure protection of all routes in the `admin`
 * directory. It makes the routes in this directory _dynamic_ routes, which
 * send a server request, and thus trigger `hooks.server.ts`.
 **/
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends, locals: { supabase } }) => {
    depends('supabase:db:collections');
    // Fetch collections from the database, ordered by name in ascending order
    const { data: collections, error: errorCollections } = await supabase
        .from('collections')
        .select('*')
        .order('name', { ascending: true });

    // If there is an error fetching collections, throw the error
    if (errorCollections) {
        throw errorCollections;
    }

    // Fetch contents from the database, ordered by creation date in descending order
    const { data: contents, error: errorContents } = await supabase
        .from('contents')
        .select('*, collections(*)')
        .order('created_at', { ascending: false });

    // If there is an error fetching contents, throw the error
    if (errorContents) {
        throw errorContents;
    }

    return { collections: collections ?? [], contents: contents ?? [] };
};