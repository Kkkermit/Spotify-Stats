const BASE_URL = "https://api.spotify.com/v1";

async function fetchWithAuth(url: string, token: string) {
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
}

export async function getTopArtists(token: string) {
	const url = `${BASE_URL}/me/top/artists`;
	return fetchWithAuth(url, token);
}

export async function getTopTracks(token: string) {
	const url = `${BASE_URL}/me/top/tracks`;
	return fetchWithAuth(url, token);
}

export async function getRecentlyPlayed(token: string) {
	const url = `${BASE_URL}/me/player/recently-played`;
	return fetchWithAuth(url, token);
}
