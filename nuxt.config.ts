// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/ui'],
	typescript: {
		shim: false
	},
	devtools: { enabled: true },
	imports: {
		dirs: [
			'composables',
			'composables/*/index.{ts,js,mjs,mts}',
			'composables/**'
		]
	}
});
