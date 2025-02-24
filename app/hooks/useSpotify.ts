import { useState, useEffect } from "react";

interface SpotifyAuth {
	accessToken: string | null;
	refreshToken: string | null;
	expiresIn: number | null;
}

interface UseSpotifyReturn {
	accessToken: string | null;
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
	refreshAccessToken: () => Promise<void>;
}

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const SCOPES = [
	"user-read-recently-played",
	"user-top-read",
	"user-read-currently-playing",
	"user-read-playback-state",
].join(" ");

export const useSpotify = (): UseSpotifyReturn => {
	const [auth, setAuth] = useState<SpotifyAuth>({
		accessToken: localStorage.getItem("spotify_access_token"),
		refreshToken: localStorage.getItem("spotify_refresh_token"),
		expiresIn: Number(localStorage.getItem("spotify_expires_in")),
	});

	const login = () => {
		const state = generateRandomString(16);
		localStorage.setItem("spotify_auth_state", state);

		const params = new URLSearchParams({
			client_id: SPOTIFY_CLIENT_ID!,
			response_type: "code",
			redirect_uri: REDIRECT_URI!,
			state: state,
			scope: SCOPES,
		});

		window.location.href = `${SPOTIFY_AUTH_ENDPOINT}?${params.toString()}`;
	};

	const logout = () => {
		localStorage.removeItem("spotify_access_token");
		localStorage.removeItem("spotify_refresh_token");
		localStorage.removeItem("spotify_expires_in");
		setAuth({ accessToken: null, refreshToken: null, expiresIn: null });
	};

	const refreshAccessToken = async () => {
		if (!auth.refreshToken) return;

		try {
			const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					grant_type: "refresh_token",
					refresh_token: auth.refreshToken,
					client_id: SPOTIFY_CLIENT_ID!,
				}),
			});

			const data = await response.json();

			const newAuth = {
				accessToken: data.access_token,
				refreshToken: data.refresh_token ?? auth.refreshToken,
				expiresIn: Date.now() + data.expires_in * 1000,
			};

			localStorage.setItem("spotify_access_token", newAuth.accessToken);
			localStorage.setItem("spotify_refresh_token", newAuth.refreshToken);
			localStorage.setItem("spotify_expires_in", newAuth.expiresIn.toString());

			setAuth(newAuth);
		} catch (error) {
			console.error("Error refreshing token:", error);
			logout();
		}
	};

	useEffect(() => {
		const handleCallback = async () => {
			const searchParams = new URLSearchParams(window.location.search);
			const code = searchParams.get("code");
			const state = searchParams.get("state");
			const storedState = localStorage.getItem("spotify_auth_state");

			if (!code || !state || state !== storedState) return;

			try {
				const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams({
						code,
						redirect_uri: REDIRECT_URI!,
						grant_type: "authorization_code",
						client_id: SPOTIFY_CLIENT_ID!,
					}),
				});

				const data = await response.json();

				const newAuth = {
					accessToken: data.access_token,
					refreshToken: data.refresh_token,
					expiresIn: Date.now() + data.expires_in * 1000,
				};

				localStorage.setItem("spotify_access_token", newAuth.accessToken);
				localStorage.setItem("spotify_refresh_token", newAuth.refreshToken);
				localStorage.setItem("spotify_expires_in", newAuth.expiresIn.toString());

				setAuth(newAuth);
				window.history.replaceState({}, "", "/");
			} catch (error) {
				console.error("Error getting token:", error);
			}
		};

		handleCallback();
	}, []);

	useEffect(() => {
		if (!auth.accessToken || !auth.expiresIn) return;

		const timeUntilExpiry = auth.expiresIn - Date.now();
		if (timeUntilExpiry <= 0) {
			refreshAccessToken();
			return;
		}

		const refreshTimer = setTimeout(() => {
			refreshAccessToken();
		}, timeUntilExpiry - 60000); // Refresh 1 minute before expiry

		return () => clearTimeout(refreshTimer);
	}, [auth.accessToken, auth.expiresIn]);

	return {
		accessToken: auth.accessToken,
		isAuthenticated: !!auth.accessToken,
		login,
		logout,
		refreshAccessToken,
	};
};

function generateRandomString(length: number): string {
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	return Array.from({ length }, () => possible.charAt(Math.floor(Math.random() * possible.length))).join("");
}

export default useSpotify;
