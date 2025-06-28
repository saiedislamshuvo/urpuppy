import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '');

  return {
    css: {
      preprocessorOptions: {
        //scss: {
         // additionalData: `$cloudfront-url: '${env.VITE_CLOUDFRONT_URL || 'https://d1ycq56gu6gk7x.cloudfront.net'}';`
       //}
      }
    },
    plugins: [
      laravel({
        input: ['resources/sass/app.scss', 'resources/js/app.tsx'],
        ssr: 'resources/js/ssr.tsx',
        refresh: true,
      }),
      compression(),
      react(),
    ],
    ssr: {
      noExternal: true
    },
    server: {
      cors: true
    }
  };
});
