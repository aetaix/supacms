# Thoth CMS

> Thoth: The Egyptian god of wisdom, writing, scripture, and tales.

Arf. Again another headless CMS...
Yup, I know what you're thinking. After endless hours of searching for the perfect CMS, I've always ended up with the same conclusion: they all are too complex, or overfeatured, or too expensive, or too slow, or too... you name it. So I decided to choose simplicity other than anything else. 

Thoth CMS is a simple headless CMS that allows you to create, edit, and delete content and collections. That's it. No more, no less.
It don't require a team of DevOps to deploy it, nor a team of developers to maintain it. 

Build around Svelte 5 and TailwindCSS, Thoth provide a simple and fast interface to manage your content. Plus it's integrated with Vercel and Supabase, so you can deploy it in a few clicks.

> **Note:** Thoth is still in development and not ready for production use.



## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
