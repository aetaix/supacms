import { redirect, fail } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {

    login: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        if (!email || !password) {
            return fail(400, { email, missing: true });
        }


        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            console.error(error)
            return fail(400, { email, incorrect: true });
        } else {
            redirect(303, '/admin')
        }
    },
}