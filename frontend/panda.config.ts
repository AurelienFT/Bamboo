import { defineConfig } from "@pandacss/dev"

export default defineConfig({
    // Whether to use css reset
    preflight: true,
    conditions: {
      extend: {
        dark: '.dark &, [data-theme="dark"] &',
        light: '.light &',
        supportsBackdrop:
          '@supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px)))'
      }
    },
    include: ['./src/**/*.{js,ts,svelte}'],
    // Where to look for your css declarations

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
      tokens: {
        colors: {
          current: { value: 'currentColor' },
          dark: { value: '#111' },
          black: { value: '#000' },
          white: { value: '#fff' },
          gray: {
            50: { value: '#f9fafb' },
            100: { value: '#f3f4f6' },
            200: { value: '#e5e7eb' },
            300: { value: '#d1d5db' },
            400: { value: '#9ca3af' },
            500: { value: '#6b7280' },
            600: { value: '#4b5563' },
            700: { value: '#374151' },
            800: { value: '#1f2937' },
            900: { value: '#111827' },
            950: { value: '#030712' }
          },
          neutral: {
            50: { value: '#fafafa' },
            100: { value: '#f5f5f5' },
            200: { value: '#e5e5e5' },
            300: { value: '#d4d4d4' },
            400: { value: '#a3a3a3' },
            500: { value: '#737373' },
            600: { value: '#525252' },
            700: { value: '#404040' },
            800: { value: '#262626' },
            900: { value: '#171717' },
            950: { value: '#0a0a0a' }
          },
          red: {
            50: { value: '#fef2f2' },
            100: { value: '#fee2e2' },
            200: { value: '#fecaca' },
            300: { value: '#fca5a5' },
            400: { value: '#f87171' },
            500: { value: '#ef4444' },
            600: { value: '#dc2626' },
            700: { value: '#b91c1c' },
            800: { value: '#991b1b' },
            900: { value: '#7f1d1d' },
            950: { value: '#450a0a' }
          },
          orange: {
            50: { value: '#fff7ed' },
            100: { value: '#ffedd5' },
            200: { value: '#fed7aa' },
            300: { value: '#fdba74' },
            400: { value: '#fb923c' },
            500: { value: '#f97316' },
            600: { value: '#ea580c' },
            700: { value: '#c2410c' },
            800: { value: '#9a3412' },
            900: { value: '#7c2d12' },
            950: { value: '#431407' }
          },
          yellow: {
            50: { value: '#fefce8' },
            100: { value: '#fef9c3' },
            200: { value: '#fef08a' },
            300: { value: '#fde047' },
            400: { value: '#facc15' },
            500: { value: '#eab308' },
            600: { value: '#ca8a04' },
            700: { value: '#a16207' },
            800: { value: '#854d0e' },
            900: { value: '#713f12' },
            950: { value: '#422006' }
          },
          blue: {
            50: { value: '#eff6ff' },
            100: { value: '#dbeafe' },
            200: { value: '#bfdbfe' },
            300: { value: '#93c5fd' },
            400: { value: '#60a5fa' },
            500: { value: '#3b82f6' },
            600: { value: '#2563eb' },
            700: { value: '#1d4ed8' },
            800: { value: '#1e40af' },
            900: { value: '#1e3a8a' },
            950: { value: '#172554' }
          },
          blackAlpha: {
            50: { value: 'rgba(0, 0, 0, 0.04)' },
            100: { value: 'rgba(0, 0, 0, 0.06)' },
            200: { value: 'rgba(0, 0, 0, 0.08)' },
            300: { value: 'rgba(0, 0, 0, 0.16)' },
            400: { value: 'rgba(0, 0, 0, 0.24)' },
            500: { value: 'rgba(0, 0, 0, 0.36)' },
            600: { value: 'rgba(0, 0, 0, 0.48)' },
            700: { value: 'rgba(0, 0, 0, 0.64)' },
            800: { value: 'rgba(0, 0, 0, 0.80)' },
            900: { value: 'rgba(0, 0, 0, 0.92)' }
          },
          whiteAlpha: {
            50: { value: 'rgba(255, 255, 255, 0.04)' },
            100: { value: 'rgba(255, 255, 255, 0.06)' },
            200: { value: 'rgba(255, 255, 255, 0.08)' },
            300: { value: 'rgba(255, 255, 255, 0.16)' },
            400: { value: 'rgba(255, 255, 255, 0.24)' },
            500: { value: 'rgba(255, 255, 255, 0.36)' },
            600: { value: 'rgba(255, 255, 255, 0.48)' },
            700: { value: 'rgba(255, 255, 255, 0.64)' },
            800: { value: 'rgba(255, 255, 255, 0.80)' },
            900: { value: 'rgba(255, 255, 255, 0.92)' }
          },
        }
      },
      semanticTokens: {
        colors: {
          bg: {
            main: {
              value: {
                base: '{colors.yellow.300}',
                _dark: '{colors.gray.700}'
              }
            },
            muted: {
              value: {
                base: '{colors.gray.900}',
                _dark: '{colors.gray.400}'
              }
            },
            dark: {
              value: {
                base: '{colors.black}',
                _dark: '{colors.gray.400}'
              }
            },
            inverted: {
              value: { base: '{colors.white}', _dark: '{colors.black}' }
            },
            emphasized: {
              value: { base: '{colors.white}', _dark: '{colors.yellow.300}' }
            },
            'emphasized.hover': {
              value: {
                base: '{colors.gray.100}',
                _dark: '{colors.gray.800}'
              }
            }
          },
          text: {
            main: {
              value: { base: '{colors.black}', _dark: '{colors.white}' }
            },
            headline: {
              value: { base: '{colors.black}', _dark: '{colors.yellow.300}' }
            },
            muted: {
              value: {
                base: '{colors.gray.800}',
                _dark: '{colors.gray.50}'
              }
            }
          }
        }
      }
    },

    // The output directory for your css system
    outdir: "styled-system",
    
    
})