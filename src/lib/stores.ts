import { writable } from "svelte/store";

export const loading = writable(false);

export const collections = writable([]);
export const contents = writable([]);