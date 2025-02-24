import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSpotify } from "../../hooks/useSpotify";

interface Artist {
	id: string;
	name: string;
	images: { url: string }[];
	genres: string[];
	followers: { total: number };
}

const TopArtists: React.FC = () => {
	const { accessToken, isAuthenticated } = useSpotify();
	const [artists, setArtists] = useState<Artist[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [timeRange, setTimeRange] = useState<"short_term" | "medium_term" | "long_term">("medium_term");

	useEffect(() => {
		const fetchTopArtists = async () => {
			if (!accessToken) return;

			try {
				const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=9&time_range=${timeRange}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch top artists");
				}

				const data = await response.json();
				setArtists(data.items);
			} catch (error) {
				console.error("Error fetching top artists:", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (isAuthenticated) {
			fetchTopArtists();
		}
	}, [accessToken, isAuthenticated, timeRange]);

	if (!isAuthenticated) {
		return (
			<div className="p-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-6">
					Your Top Artists
				</h2>
				<div className="text-center text-gray-400">Please log in to view your top artists</div>
			</div>
		);
	}

	return (
		<div className="p-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-lg shadow-lg">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
					Your Top Artists
				</h2>
				<div className="space-x-2">
					{["short_term", "medium_term", "long_term"].map((range) => (
						<button
							key={range}
							onClick={() => setTimeRange(range as any)}
							className={`px-4 py-2 rounded-full text-sm ${
								timeRange === range ? "bg-green-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
							} transition-all duration-300`}
						>
							{range.split("_")[0].charAt(0).toUpperCase() + range.split("_")[0].slice(1)}
						</button>
					))}
				</div>
			</div>

			{isLoading ? (
				<div className="flex justify-center items-center h-64">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{artists.map((artist, index) => (
						<motion.div
							key={artist.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
						>
							<div className="relative pb-[100%]">
								<img src={artist.images[0]?.url} alt={artist.name} className="absolute w-full h-full object-cover" />
							</div>
							<div className="p-4">
								<h3 className="text-xl font-bold mb-2">{artist.name}</h3>
								<p className="text-sm text-gray-400">{artist.genres.slice(0, 2).join(", ")}</p>
								<p className="text-sm text-gray-400">{artist.followers.total.toLocaleString()} followers</p>
							</div>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
};

export default TopArtists;
