import { Grid } from '@nextui-org/react';
import React, { useState } from 'react';
import { PlaylistCard } from '../../components/user/PlaylistCard';
import { TestPlaylist } from '../../interfaces';


const playlists: TestPlaylist[] = [
    {
        id: 1,
        name: 'My playlist',
        playlistCover: 'https://i.pinimg.com/originals/f8/65/d3/f865d3112022612c6875b4ab7ec54239.jpg',
        songs: [
            'song 1',
            'song 2',
            'song 3'
        ]
    },
    {
        id: 2,
        name: 'Happy songs',
        playlistCover: 'https://i.pinimg.com/originals/f8/65/d3/f865d3112022612c6875b4ab7ec54239.jpg'
    },
    {
        id: 1,
        name: 'Sad songs',
        playlistCover: 'https://i.pinimg.com/originals/f8/65/d3/f865d3112022612c6875b4ab7ec54239.jpg'
    }
];

export const PlaylistPage = () => {

    const [isAlbumSelected, setIsAlbumSelected] = useState(false);


    // * Temporal function
    const handleSelect = () => {
        console.log('funcion');
        setIsAlbumSelected(!isAlbumSelected);
        //setIsAlbumSelected(album);
    };

    return (
        <div className='animate__animated animate__fadeIn float-container'style={{ padding: 0 }}>
            <h1 style={{ margin: '20px' }}>My Playlists</h1>
            
            {/** Render playlists cards */}
            <Grid.Container gap={2} justify='flex-start' style={{ overflow: 'hidden' }}>
                {
                    playlists.map((playlist) => (
                        <PlaylistCard playlist={playlist} handleSelect={handleSelect} key={playlist.id} />
                    ))
                }
            </Grid.Container>

        </div>
    );
};
