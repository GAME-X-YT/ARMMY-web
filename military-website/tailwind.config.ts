import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tactical: {
          dark: "#0B0F0A",
          olive: "#333D29",
          khaki: "#D3D3C1",
          accent: "#283618",
          alert: "#BC4749"
        }
      }
    },
  },
  plugins: [],
}

export default config