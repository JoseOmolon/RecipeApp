import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Do not set 'react-spinners' as external
    },
  },
  optimizeDeps: {
    include: [
      'react-spinners',
      'react-icons/md',
      'react-icons/fa',
      'react-icons/io5'
    ],
  },
});
