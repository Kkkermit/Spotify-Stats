import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
	return (
		<footer className="bg-spotify-base border-t border-spotify-gray/10 mt-auto">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
					{/* Left section */}
					<div className="flex items-center space-x-4">
						<motion.a
							href="https://developer.spotify.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-spotify-green transition-colors duration-300"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Powered by Spotify API
						</motion.a>
						<span className="text-gray-600">•</span>
						<motion.a
							href="https://github.com/yourusername/spotify-stats"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-spotify-green transition-colors duration-300"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							GitHub
						</motion.a>
					</div>

					{/* Center section */}
					<motion.p
						className="text-sm text-gray-400"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
					>
						© {new Date().getFullYear()} Spotify Stats. Built with
						<span className="bg-gradient-to-r from-spotify-green to-green-400 bg-clip-text text-transparent ml-1">
							♥
						</span>
						{""} by Kkermit
					</motion.p>

					{/* Right section */}
					<div className="flex items-center space-x-4">
						<motion.a
							href="/privacy"
							className="text-sm text-gray-400 hover:text-spotify-green transition-colors duration-300"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Privacy Policy
						</motion.a>
						<span className="text-gray-600">•</span>
						<motion.a
							href="/terms"
							className="text-sm text-gray-400 hover:text-spotify-green transition-colors duration-300"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Terms of Use
						</motion.a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
