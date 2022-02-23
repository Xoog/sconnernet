module.exports = {
  darkMode: 'class',
  content: ['./src/**/*{md,html,js,liquid}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Atkinson-Hyperlegible', 'sans-serif'],
        serif: ['Atkinson-Hyperlegible', 'serif']
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: "white",
            a: {
              color: theme("colors.green.200"),
              textDecoration: "underline",
              "&:hover": {
                color: "#FFFFFF",
                backgroundColor: theme("colors.gray.700"),
                borderRadius: "5px",
              },
              "&:active": {
                color: "#FFFFFF",
                backgroundColor: "#DB0A5B",
              },
              "&:focus": {
                boxShadow: "0 -2px #DB0A5B, 0 4px #000",
                outline: "none",
                backgroundColor: theme("colors.pink.700"),
                textDecoration: "none",
                color: "white",
              },
            },
            h1: {
              color: "white",
            },
            h2: {
              color: "white",
            },
            h3: {
              color: "white",
            },
            h4: {
              color: "white",
            },
            h5: {
              color: "white",
            },
            h6: {
              color: "white",
            },
            th: {
              color: "white",
            },
            strong: {
              color: "white",
            },
            "blockquote p": {
              color: "white",
            },
            code: {
              color: "white",
            },
            figcaption: {
              color: theme("colors.gray.400"),
            },
            "::selection": {
              backgroundColor: "white",
            },
          },
        },
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

