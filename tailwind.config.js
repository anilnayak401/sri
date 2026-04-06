/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // ── BRAND SYSTEM ──────────────────────────────────────────
        primary:            '#C2185B',   // deep rose — headings, buttons, highlights
        'primary-dark':     '#8E0038',   // hover / pressed state
        'primary-light':    '#F8BBD0',   // tints, backgrounds
        'primary-container':'#FCE4EC',   // card backgrounds, chips

        secondary:          '#0F4C5C',   // teal — accents, icons, hover
        'secondary-dark':   '#082F3A',   // deeper teal
        'secondary-light':  '#B2EBF2',   // tint
        'secondary-container':'#E0F7FA', // card backgrounds

        // ── SURFACE / NEUTRAL ─────────────────────────────────────
        surface:                '#FFFFFF',
        'surface-low':          '#FDF6F9',
        'surface-container':    '#F8E6EC',   // brand bg-light
        'surface-container-low':'#FDF0F5',
        'surface-container-high':'#F3D0DC',
        'surface-container-lowest':'#FFFFFF',
        'surface-container-highest':'#EEC4D2',
        'surface-bright':       '#FFFFFF',
        'surface-dim':          '#E8C8D4',
        'surface-variant':      '#F8E6EC',

        // ── ON-COLORS ─────────────────────────────────────────────
        'on-primary':           '#FFFFFF',
        'on-primary-container': '#8E0038',
        'on-secondary':         '#FFFFFF',
        'on-secondary-container':'#082F3A',
        'on-surface':           '#1A1A1A',
        'on-surface-variant':   '#4A4A4A',
        'on-background':        '#1A1A1A',

        // ── SEMANTIC ──────────────────────────────────────────────
        error:              '#BA1A1A',
        'error-container':  '#FFDAD6',
        'on-error':         '#FFFFFF',
        'on-error-container':'#93000A',

        // ── OUTLINE ───────────────────────────────────────────────
        outline:            '#9E7B87',
        'outline-variant':  '#E8C8D4',

        // ── INVERSE ───────────────────────────────────────────────
        'inverse-surface':      '#2D1A20',
        'inverse-on-surface':   '#FDEEF3',
        'inverse-primary':      '#F8BBD0',

        // ── LEGACY ALIASES (keep for backward compat) ─────────────
        tertiary:               '#C2185B',
        'tertiary-container':   '#F8BBD0',
        'on-tertiary':          '#FFFFFF',
        'on-tertiary-container':'#8E0038',

        // ── SHADCN TOKENS ─────────────────────────────────────────
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
      },
      fontFamily: {
        sans:     ['Inter', 'system-ui', 'sans-serif'],
        display:  ['Manrope', 'sans-serif'],
        headline: ['Manrope', 'sans-serif'],
        body:     ['Inter', 'sans-serif'],
        label:    ['Inter', 'sans-serif'],
      },
      borderRadius: {
        clinical: '0.75rem',
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        ambient: '0 20px 40px rgba(194, 24, 91, 0.08)',
        glass:   '0 4px 30px rgba(194, 24, 91, 0.06)',
        primary: '0 8px 32px rgba(194, 24, 91, 0.25)',
        secondary:'0 8px 32px rgba(15, 76, 92, 0.20)',
      },
      backdropBlur: { glass: '20px' },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
