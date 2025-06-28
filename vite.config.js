import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dualspark-portfolio/', // Update this if your repo name is different
    plugins: [react()],
});
