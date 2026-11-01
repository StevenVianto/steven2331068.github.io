import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://steven2331068.github.io',
  integrations: [react()],
  output: 'static',
});
