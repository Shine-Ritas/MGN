import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // UI libraries
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-icons',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip'
          ],
          
          // State management
          'state-vendor': [
            '@reduxjs/toolkit',
            'react-redux',
            'redux-thunk'
          ],
          
          // Rich text editor
          'editor-vendor': [
            '@tiptap/extension-color',
            '@tiptap/extension-text-align',
            '@tiptap/extension-underline',
            '@tiptap/react',
            '@tiptap/starter-kit'
          ],
          
          // Charts and data visualization
          'chart-vendor': [
            'chart.js',
            'react-chartjs-2',
            'recharts'
          ],
          
          // Animation and motion
          'animation-vendor': [
            'framer-motion',
            'react-transition-group'
          ],
          
          // Form handling
          'form-vendor': [
            'react-hook-form',
            '@hookform/resolvers',
            'yup',
            'zod'
          ],
          
          // Utility libraries
          'utils-vendor': [
            'axios',
            'crypto-js',
            'date-fns',
            'lodash.debounce',
            'numeral',
            'uuid',
            'js-cookie',
            'dompurify'
          ],
          
          // Media and file handling
          'media-vendor': [
            'react-cropper',
            'react-easy-crop',
            'react-dropzone',
            'jszip',
            'react-lazy-load-image-component'
          ],
          
          // DnD and carousel
          'interaction-vendor': [
            '@dnd-kit/core',
            '@dnd-kit/modifiers',
            '@dnd-kit/sortable',
            'embla-carousel-autoplay',
            'embla-carousel-react'
          ],
          
          // Icons and styling
          'styling-vendor': [
            'lucide-react',
            'react-icons',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            'tailwindcss-animate'
          ]
        }
      }
    },
    // Increase chunk size warning limit to 1000kb
    chunkSizeWarningLimit: 1000
  },
  // server:{
  //   allowedHosts:["506a55aec323.ngrok-free.app"],
  // }
  // server: {
  //   watch: {
  //     usePolling: false,
  //   },
  //   hmr: true
  // }
});
