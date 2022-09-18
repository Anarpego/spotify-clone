
// * Temporal interfaces
export interface TestAlbum {
    id: number;
    title: string;
    artist: string;
    albumCover: string;
}

export interface TestPlaylist {
    id: number;
    name: string;
    playlistCover: string;
    songs?: string[];
}

export interface Song {
    dbId?: number | 0;
    streamUrl: string;
    trackTitle: string;
    coverImage: string;
}