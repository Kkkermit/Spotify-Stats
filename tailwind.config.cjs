module.exports = {
	content: ["./index.html", "./app/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				spotify: {
					base: "#121212",
					dark: "#191414",
					green: "#1DB954",
					gray: "#282828",
					lightgray: "#B3B3B3",
					text: {
						base: "#FFFFFF",
						subdued: "#A7A7A7",
					},
				},
			},
			zIndex: {
				40: "40",
				50: "50",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"spotify-gradient": "linear-gradient(to bottom, rgb(18, 18, 18), rgb(0, 0, 0))",
				"spotify-card": "linear-gradient(180deg, rgba(40, 40, 40, 0.8) 0%, rgba(24, 24, 24, 0.8) 100%)",
			},
			animation: {
				"pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"fade-in": "fadeIn 0.5s ease-in-out",
				"slide-up": "slideUp 0.5s ease-out",
				"slide-down": "slideDown 0.5s ease-out",
				"scale-in": "scaleIn 0.3s ease-out",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideUp: {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				slideDown: {
					"0%": { transform: "translateY(-20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				scaleIn: {
					"0%": { transform: "scale(0.9)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
			},
			boxShadow: {
				spotify: "0 8px 24px rgb(0 0 0 / 50%)",
				"spotify-light": "0 4px 12px rgb(0 0 0 / 30%)",
				"spotify-hover": "0 8px 24px rgb(29 185 84 / 30%)",
			},
			fontFamily: {
				spotify: ["Circular Std", "system-ui", "sans-serif"],
			},
			spacing: {
				18: "4.5rem",
				22: "5.5rem",
			},
			borderRadius: {
				spotify: "0.5rem",
			},
			transitionTimingFunction: {
				spotify: "cubic-bezier(0.3, 0, 0.4, 1)",
			},
		},
	},
};
