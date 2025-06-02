import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load .env file
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  server:{host:true},
  plugins: [react()],
})
