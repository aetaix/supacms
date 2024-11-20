import type { RequestHandler } from '@sveltejs/kit';

interface Supabase {
	from: (table: string) => any;
	storage: {
		from: (bucket: string) => any;
	};
}

interface User {
	id: string;
}

interface Locals {
	supabase: Supabase;
	user: User;
}

const getFileName = (file: File, ): string => {
    const name = file.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
	const timestamp = new Date().getTime();
	const extension = file.name.split('.').pop();
	return `${name}_ts-${timestamp}.${extension}`;
};

const getPublicUrl = (path: string): string => {
	return `https://ponpqrcjoutsvysxluxa.supabase.co/storage/v1/object/public/${path}`;
};


export const POST: RequestHandler = async ({ request, locals: { supabase, user } }) => {
	if (!user) {
		return new Response(JSON.stringify({ error: 'You must be logged in to upload a file' }), {
			status: 401
		});
	}

	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;
		if (!file) {
			return new Response(JSON.stringify({ error: 'No file found in request' }), {
				status: 400
			});
		}
		const fileName = getFileName(file);

		const { data: media, error } = await supabase.storage.from('medias').upload(fileName, file);
		if (error) {
			console.error('error', error);
			return new Response(JSON.stringify({ error: 'An error occurred while uploading the file' }), {
				status: 500
			});
		}

		const url = getPublicUrl(media.fullPath);	

		const id = formData.get('id') as string;

		// update the content thumbnail with the media url 
		const { error: updateError } = await supabase
		.from('contents')
		.update({ thumbnail: url })
		.match({ id });

		if (updateError) {
			console.error('error', updateError);
			return new Response(JSON.stringify({ error: 'An error occurred while updating the content' }), {
				status: 500
			});
		}

		return new Response(JSON.stringify({ url }), { status: 200 });

	} catch (error) {
		console.error('error', error);
		return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
			status: 500
		});
	}
};
