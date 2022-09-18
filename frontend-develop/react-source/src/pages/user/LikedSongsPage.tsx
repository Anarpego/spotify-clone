import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Loading, Spacer } from '@nextui-org/react';
import { AuthContext } from '../../context/AuthContext';
import { useSongs } from '../../hooks/useSongs';
import { Song } from '../../interfaces';
import { SongTable } from '../../components/user/SongTable';
import { BottomNavbar } from '../../components/ui/BottomNavbar';

const playlist: Song[] = [

];

export const LikedSongsPage = () => {

	const { auth } = useContext(AuthContext);
	const { likedSongs, isLoadingLikedSongs } = useSongs();
	const [externalPlay, setExternalPlay] = useState(false);
	const [isAlbumSelected, setIsAlbumSelected] = useState(false);

	const handleSelect = () => {
		//console.log('funcion');
		setIsAlbumSelected(!isAlbumSelected);
		//setIsAlbumSelected(album);

	};

	useEffect(() => {
			
		if (!isLoadingLikedSongs) {
			//console.log(radioSongs);

			likedSongs.map((song) => {
				playlist.push({
					dbId: song.id,
					trackTitle: song.name,
					coverImage: song.cover_image,
					streamUrl: song.file,
				});
			});
		}

	}, [isLoadingLikedSongs]);

	return (
		<div className='animate__animated animate__fadeIn float-container' style={{ width: '100%', padding: '50px' }}>
			<h1>Liked songs</h1>
			<hr />
			<Spacer y={1} />

			{
				isLoadingLikedSongs ?
					(
						<>
							<h3>Loading </h3><Loading type='points' />
						</>

					)
					:
					(
						<>
							<SongTable songs={likedSongs} handleSwitch={handleSelect} isAlbum={false} setExternalPlay={function (): void { return; }} />
							<BottomNavbar
								playlist={playlist}
								playing={externalPlay}
								setExternalPlay={setExternalPlay} />
						</>

					)
			}
			
		</div>
	);
};
