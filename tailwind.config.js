/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary_green: '#3c6e71',
        secondary_nuance: '#d9d9d9'
      },
      fontFamily: {
        sourceSans3Italic: ['SourceSans3-Italic'],
        sourceSans3Regular: ['SourceSans3-Regular'],
        spaceMonoRegular: ['SpaceMono-Regular']
      }
    },
  },
  plugins: [],
}