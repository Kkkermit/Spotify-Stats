import React from "react";
import { motion } from "framer-motion";
import TopArtists from "../components/stats/TopArtists";
import TopTracks from "../components/stats/TopTracks";
import RecentlyPlayed from "../components/stats/RecentlyPlayed";

const Dashboard: React.FC = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	return (
		<div className="min-h-screen bg-spotify-base relative overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
				<motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
					<motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-center mb-12">
						<span className="bg-gradient-to-r from-spotify-green via-green-400 to-green-300 bg-clip-text text-transparent">
							Your Spotify Dashboard
						</span>
					</motion.h1>

					<motion.div variants={itemVariants} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<div className="bg-spotify-gray/30 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-spotify-green/5 transition-all duration-300">
							<TopArtists />
						</div>
						<div className="bg-spotify-gray/30 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-spotify-green/5 transition-all duration-300">
							<TopTracks />
						</div>
						<div className="md:col-span-2 lg:col-span-1 bg-spotify-gray/30 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-spotify-green/5 transition-all duration-300">
							<RecentlyPlayed />
						</div>
					</motion.div>
				</motion.div>
			</div>

			{/* Background decorative elements */}
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2">
					<div className="w-full h-full bg-gradient-radial from-spotify-green/10 via-spotify-green/5 to-transparent blur-3xl transform rotate-45" />
				</div>
				<div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2">
					<div className="w-full h-full bg-gradient-radial from-spotify-green/10 via-spotify-green/5 to-transparent blur-3xl transform -rotate-45" />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
