import { defineDynamicResource, defineManifest } from '@crxjs/vite-plugin'
import { loadEnv } from 'vite'

export default defineManifest((env) => {
	process.env = { ...process.env, ...loadEnv(env.mode, process.cwd()) }
	return {
		name: 'Open Maps Images in Google Maps',
		description:
			'Since 03-04-2024, Google has removed links to google maps in search results. This extension adds a link to the google maps page of the image.',
		version: '1.0.0',
		manifest_version: 3,
		minimum_chrome_version: '105',
		background: {
			service_worker: 'src/background/index.ts',
			type: 'module',
		},
		icons: {
			16: `public/icons/16.png`,
			32: `public/icons/32.png`,
			48: `public/icons/48.png`,
			128: `public/icons/128.png`,
		},
		action: {
			default_title: 'Made by Kieron AUDIFFREN',
		},
		author: 'Kieron AUDIFFREN',

		content_scripts: [
			{
				js: ['src/content-scripts/index.ts'],
				run_at: 'document_idle',
				matches: ['https://*.google.com/*'],
			},
		],
		host_permissions:
			process.env.NODE_ENV !== 'production'
				? ['http://*/*', 'https://*/*']
				: undefined,
	}
})
