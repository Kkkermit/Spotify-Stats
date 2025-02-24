import React from "react";
import { motion } from "framer-motion";
import SpotifyLogin from "../components/auth/SpotifyLogin";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen bg-spotify-base flex flex-col relative overflow-hidden">
			<main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
				<motion.div
					className="text-center relative z-20 max-w-4xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<motion.h1
						className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.8 }}
					>
						<span className="bg-gradient-to-r from-spotify-green via-green-400 to-green-300 bg-clip-text text-transparent">
							Welcome to Spotify Stats
						</span>
					</motion.h1>
					<motion.p
						className="text-xl md:text-2xl text-gray-400 mb-12 font-light max-w-2xl mx-auto"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.8 }}
					>
						Discover your most listened to songs, artists, and more!
					</motion.p>
					<SpotifyLogin />
				</motion.div>

				{/* Updated decorative background elements */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5 }}
					className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
				>
					{/* Top right gradient */}
					<div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2">
						<div
							className="w-full h-full bg-gradient-radial from-spotify-green/20 
                                     via-spotify-green/5 to-transparent blur-3xl transform rotate-45"
						/>
					</div>

					{/* Bottom left gradient */}
					<div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2">
						<div
							className="w-full h-full bg-gradient-radial from-spotify-green/20 
                                     via-spotify-green/5 to-transparent blur-3xl transform -rotate-45"
						/>
					</div>
				</motion.div>
			</main>
		</div>
	);
};

export default Home;
