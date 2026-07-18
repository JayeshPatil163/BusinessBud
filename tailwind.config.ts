
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: { '2xl': '1400px' }
		},
		extend: {
			fontFamily: {
				sans:    ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				display: ['Playfair Display', 'Georgia', 'serif'],
			},
			colors: {
				border:     'hsl(var(--border))',
				input:      'hsl(var(--input))',
				ring:       'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary:     { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
				secondary:   { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
				destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
				muted:       { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
				accent:      { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
				popover:     { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
				card:        { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
				cream:  '#f6f5f1',
				ink:    '#111110',
				'ink-2':'#3a3935',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))',
				},
				bb:      { black: '#111110', accent: '#111110', surface: { 0: 'rgba(0,0,0,0.02)', 1: 'rgba(0,0,0,0.04)' }, border: 'rgba(0,0,0,0.08)', text: { 1: '#1a1917', 2: '#6b6860', 3: '#a8a49c' } },
				venture: { primary: '#111110', secondary: '#3a3935', dark: '#111110', accent: '#111110', light: '#f0eeea', cta: '#111110', light2: '#f6f5f1' }
			},
			borderRadius: {
				lg:   'var(--radius)',
				md:   'calc(var(--radius) - 2px)',
				sm:   'calc(var(--radius) - 4px)',
				'4xl': '2rem',
				'5xl': '2.5rem',
				'6xl': '3rem',
			},
			keyframes: {
				'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
				'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
				'fade-in':  { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
				'fade-up':  { '0%': { opacity: '0', transform: 'translateY(28px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
				'scale-in': { '0%': { opacity: '0', transform: 'scale(0.96)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
				'float':    { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
				'marquee':  { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
				'blur-in':  { '0%': { opacity: '0', filter: 'blur(8px)' }, '100%': { opacity: '1', filter: 'blur(0)' } },
				'shimmer':  { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
				'spin-slow':{ from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
				'border-glow': { '0%, 100%': { borderColor: 'rgba(0,0,0,0.07)' }, '50%': { borderColor: 'rgba(0,0,0,0.15)' } },
				'pulse-slow': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up':   'accordion-up 0.2s ease-out',
				'fade-in':   'fade-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
				'fade-up':   'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
				'scale-in':  'scale-in 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
				'float':     'float 5s ease-in-out infinite',
				'marquee':   'marquee 28s linear infinite',
				'blur-in':   'blur-in 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
				'shimmer':   'shimmer 4s linear infinite',
				'spin-slow': 'spin-slow 20s linear infinite',
				'border-glow':'border-glow 3s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 3s infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			transitionTimingFunction: {
				'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
