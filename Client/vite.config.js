import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows access from external devices
    port: 5173,  // Use the port you're running the dev server on
  },
});
