export interface Artist {
	id: string;
	name: string;
	genres: string[];
	images: { url: string }[];
}

export interface Track {
	id: string;
	name: string;
	artists: Artist[];
	album: {
		name: string;
		images: { url: string }[];
	};
	duration_ms: number;
	explicit: boolean;
	popularity: number;
}

export interface User {
	id: string;
	display_name: string;
	followers: { total: number };
	images: { url: string }[];
}
