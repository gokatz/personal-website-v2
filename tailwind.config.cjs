// tailwind.config.cjs
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#151515',
        'secondary-black': '#202022',
        'primary-blue': '#676cdb'
      }
    },
  }
};