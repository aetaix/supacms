// src/routes/create/+server.js
export async function POST({ request, locals: { supabase } }) {
    const { name, slug } = await request.json();

    const { error } = await supabase
        .from('collections')
        .insert([{ name, slug }]);

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    // Return success response or redirect
    return new Response('Form submitted successfully!', { status: 200 });
}

