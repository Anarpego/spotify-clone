export interface SongsResponse {
	status: boolean;
	album: SongDB[];
}

export interface SongDB {
	id: number;
	name: string;
	album_id: number;
	file: string;
	cover_image: string;
	count?: number;
}
