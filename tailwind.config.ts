import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				green: {
					'50': '#edfcf4',
					'100': '#d2f9e2',
					'200': '#a9f1ca',
					'300': '#72e3ad',
					'400': '#3ecf8e',
					'500': '#16b372',
					'600': '#0a915c',
					'700': '#08744c',
					'800': '#095c3e',
					'900': '#084c34',
					'950': '#032b1e',
				}
			}
		}
	},

	plugins: [typography]
} as Config;
