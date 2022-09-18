export interface Albums {
    status: boolean;
    albums: Album[];
}

export interface Album {
    id:          number;
    name:        string;
    artist_id:   number;
    cover_image: string;
}
