import { defineConfig } from 'vite'
import { resolve } from 'path'

const isGhPages = process.env.GH_PAGES === 'true'
const repoName = 'Magnit' // update if your repo name differs

export default defineConfig({
  base: isGhPages ? `/${repoName}/` : '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        geography: resolve(process.cwd(), 'geography/index.html'),
        forInternetShops: resolve(process.cwd(), 'for-internet-shops/index.html'),
        vacancies: resolve(process.cwd(), 'vacancies/index.html'),
        contacts: resolve(process.cwd(), 'contacts/index.html'),
      },
    },
  },
})

