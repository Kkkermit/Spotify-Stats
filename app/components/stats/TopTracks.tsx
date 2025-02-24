import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSpotify } from "../../hooks/useSpotify";

interface Track {
	id: string;
	name: string;
	artists: { name: string }[];
	album: {
		images: { url: string }[];
	};
	duration_ms: number;
}

const TopTracks: React.FC = () => {
	const { accessToken, isAuthenticated } = useSpotify();
	const [tracks, setTracks] = useState<Track[]>([]);
	const [timeRange, setTimeRange] = useState<"short_term" | "medium_term" | "long_term">("medium_term");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTopTracks = async () => {
			if (!accessToken) return;

			try {
				const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=${timeRange}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch top tracks");
				}

				const data = await response.json();
				setTracks(data.items);
			} catch (error) {
				console.error("Error fetching top tracks:", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (isAuthenticated) {
			fetchTopTracks();
		}
	}, [accessToken, isAuthenticated, timeRange]);

	const formatDuration = (ms: number) => {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	if (!isAuthenticated) {
		return (
			<div className="p-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-6">
					Your Top Tracks
				</h2>
				<div className="text-center text-gray-400">Please log in to view your top tracks</div>
			</div>
		);
	}

	return (
		<div className="p-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-lg shadow-lg">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
					Your Top Tracks
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
				<div className="grid gap-4">
					{tracks.map((track, index) => (
						<motion.div
							key={track.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300"
						>
							<span className="text-gray-400 w-8">{index + 1}</span>
							<img src={track.album.images[2]?.url} alt={track.name} className="w-12 h-12 rounded-md mr-4" />
							<div className="flex-1">
								<h3 className="font-semibold">{track.name}</h3>
								<p className="text-sm text-gray-400">{track.artists.map((artist) => artist.name).join(", ")}</p>
							</div>
							<span className="text-gray-400 text-sm">{formatDuration(track.duration_ms)}</span>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
};

export default TopTracks;
