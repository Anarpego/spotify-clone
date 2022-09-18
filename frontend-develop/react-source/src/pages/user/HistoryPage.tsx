import { useState, useEffect } from 'react';
import { SongDB } from '../../interfaces/songs';
import { SongTable } from '../../components/user/SongTable';
import { Song } from '../../interfaces/interfaces';
import { BottomNavbar } from '../../components/ui/BottomNavbar';





export const HistoryPage = () => {


	const stored: SongDB[] = [];
	const [isAlbumSelected, setIsAlbumSelected] = useState(false);
	const [myStoredSongs, setmyStoredSongs] = useState<SongDB[]>([]);
	const [auxSongs, setAuxSongs] = useState<Song[]>([]);
	const [externalPlay, setExternalPlay] = useState(false);
	const [loading, setLoading] = useState(true);


	const handleSelect = () => {
		//console.log('funcion');
		setIsAlbumSelected(!isAlbumSelected);
		//setIsAlbumSelected(album);

	};



	useEffect(() => {
		const arr: Song[] = JSON.parse(localStorage.getItem('songs') || '[]');

		arr.map((song, i) => {

			const a = stored.filter((song_) => song_.name === song.trackTitle);

			if (a.length === 0) {
				//console.log('no esta duplicado');
				stored.push({
					id: i,
					album_id: 1,
					name: song.trackTitle,
					cover_image: song.coverImage,
					file: song.streamUrl,
				});


				setLoading(false);
			}

			
		});

		setAuxSongs(arr);
		setmyStoredSongs(stored);
		//console.log(stored);

	}, []);


	return (
		<div className='animate__animated animate__fadeIn float-container'
			style={{ width: '100%', padding: '50px' }}>
			<h1>Played Songs</h1>
			<hr />
			{
				!loading &&
				(
					<SongTable songs={myStoredSongs} handleSwitch={handleSelect} isAlbum={false} setExternalPlay={function (): void { return; }} />
				)
			}


			<BottomNavbar
				playlist={auxSongs}
				playing={externalPlay}
				setExternalPlay={setExternalPlay} />
		</div>
	);
};
