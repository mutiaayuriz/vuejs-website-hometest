import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({ 
      template: { 
          compilerOptions: {
              isCustomElement: (tag) => ['v-list-item-icon'].includes(tag),
          }
      }
    }),
  ]
})
