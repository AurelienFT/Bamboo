import { defineConfig } from "@pandacss/dev"

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    include: ['./src/**/*.{js,ts,svelte}'],
    // Where to look for your css declarations

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
      extend: {}
    },

    // The output directory for your css system
    outdir: "styled-system",
    
    
})