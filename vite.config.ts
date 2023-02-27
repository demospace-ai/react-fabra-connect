import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({})],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "FabraConnect",
      fileName: "fabra-connect",
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    }
  }
});
