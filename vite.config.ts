import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    }
  }
})
