import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-spinners', 'react-spinners/RingLoader'],
    },
  },
  optimizeDeps: {
    include: ['react-icons/md', 'react-icons/fa', 'react-icons/io5'],
  },
});
