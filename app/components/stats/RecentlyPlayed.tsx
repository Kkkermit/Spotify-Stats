import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSpotify } from "../../hooks/useSpotify";

interface Track {
	track: {
		id: string;
		name: string;
		artists: { name: string }[];
		album: {
			images: { url: string }[];
		};
	};
	played_at: string;
}

const RecentlyPlayed: React.FC = () => {
	const { accessToken, isAuthenticated } = useSpotify();
	const [recentTracks, setRecentTracks] = useState<Track[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecentlyPlayed = async () => {
			if (!accessToken) return;

			try {
				const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=20", {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch recently played tracks");
				}

				const data = await response.json();
				setRecentTracks(data.items);
			} catch (error) {
				console.error("Error fetching recently played tracks:", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (isAuthenticated) {
			fetchRecentlyPlayed();
		}
	}, [accessToken, isAuthenticated]);

	const formatPlayedAt = (date: string) => {
		const playedAt = new Date(date);
		const now = new Date();
		const diffInMinutes = Math.floor((now.getTime() - playedAt.getTime()) / (1000 * 60));

		if (diffInMinutes < 60) {
			return `${diffInMinutes}m ago`;
		} else if (diffInMinutes < 1440) {
			return `${Math.floor(diffInMinutes / 60)}h ago`;
		} else {
			return playedAt.toLocaleDateString();
		}
	};

	if (!isAuthenticated) {
		return (
			<div className="p-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-6">
					Recently Played
				</h2>
				<div className="text-center text-gray-400">Please log in to view your recently played tracks</div>
			</div>
		);
	}

	return (
		<div className="p-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-lg shadow-lg">
			<h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-6">
				Recently Played
			</h2>

			{isLoading ? (
				<div className="flex justify-center items-center h-64">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
				</div>
			) : (
				<div className="grid gap-4">
					{recentTracks.map((item, index) => (
						<motion.div
							key={`${item.track.id}-${item.played_at}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300"
						>
							<img src={item.track.album.images[2]?.url} alt={item.track.name} className="w-12 h-12 rounded-md mr-4" />
							<div className="flex-1">
								<h3 className="font-semibold">{item.track.name}</h3>
								<p className="text-sm text-gray-400">{item.track.artists.map((artist) => artist.name).join(", ")}</p>
							</div>
							<span className="text-gray-400 text-sm">{formatPlayedAt(item.played_at)}</span>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
};

export default RecentlyPlayed;
