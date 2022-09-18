import { Loading, Spacer } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { BottomNavbar } from '../../components/ui/BottomNavbar';
import { SongTable } from '../../components/user/SongTable';
import { useSongs } from '../../hooks/useSongs';
import { Song, SongDB } from '../../interfaces';



const testPlaylist: Song[] = [
	{
		streamUrl: 'https://filesamples.com/samples/audio/mp3/sample4.mp3',
		trackTitle: 'My Chemical Romance - Welcome to the Black Parade',
		coverImage: 'https://m.media-amazon.com/images/I/81BXhwCtiKL._SL1500_.jpg'
	},
	{
		streamUrl: 'https://filesamples.com/samples/audio/mp3/Symphony%20No.6%20(1st%20movement).mp3',
		trackTitle: 'Classical Something',
		coverImage: 'https://i.scdn.co/image/ab67616d0000b27397a52e0aeda9d95fb881c56d'
	},
	{
		streamUrl: 'https://storage.googleapis.com/ayd2_bucket/songs/mojado.mp3',
		trackTitle: 'Cancion de prueba',
		coverImage: 'https://i.scdn.co/image/ab67706f00000003e41284f917a5ff88eb72e38a'
	},

];

// TestPlatlist
const testSongs: SongDB[] = [
	{
		id: 1,
		name: 'My Chemical Romance - Welcome to the Black Parade',
		album_id: 1,
		file: 'https://filesamples.com/samples/audio/mp3/sample4.mp3',
		cover_image: 'https://i.scdn.co/image/ab67616d0000b27314653b83cd7d851accdb5142'
	},
	{
		id: 2,
		name: 'Classical Something',
		album_id: 1,
		file: 'https://storage.googleapis.com/ayd2_bucket/songs/cancion2.mp3',
		cover_image: 'https://storage.googleapis.com/ayd2_bucket/song_cover_image/cancion2.jpg'
	},
	{
		id: 3,
		name: 'Cancion de Prueba',
		album_id: 1,
		file: 'https://storage.googleapis.com/ayd2_bucket/songs/mojado.mp3',
		cover_image: 'https://i.scdn.co/image/ab67706c0000bebb9dfb9f8ba0e47db33e607039'
	},

];

// ! Don't delete - use for testing data.
// const testSongs: SongDB[] = [
// 	{
// 		id: 1,
// 		name: 'Test Song',
// 		album_id: 1,
// 		file: 'https://filesamples.com/samples/audio/mp3/sample4.mp3',
// 		cover_image: 'https://i.scdn.co/image/ab67616d0000b27314653b83cd7d851accdb5142'
// 	},
// 	{
// 		id: 2,
// 		name: 'cancion2',
// 		album_id: 1,
// 		file: 'https://storage.googleapis.com/ayd2_bucket/songs/cancion2.mp3',
// 		cover_image: 'https://storage.googleapis.com/ayd2_bucket/song_cover_image/cancion2.jpg'
// 	}
// ];

const radio: Song[] = [

];


export const RadioPage = () => {

	// *  Calling songs Hook
	const { radioSongs, isLoadingRadioSongs } = useSongs();

	const [isAlbumSelected, setIsAlbumSelected] = useState(false);

	const [externalPlay, setExternalPlay] = useState(false);
	const [playlist, setPlaylist] = useState<Song[]>(testPlaylist);


	const handleSelect = () => {
		//console.log('funcion');
		setIsAlbumSelected(!isAlbumSelected);
		//setIsAlbumSelected(album);

	};

	useEffect(() => {

		if (!isLoadingRadioSongs) {
			//console.log(radioSongs);

			radioSongs.map((song) => {
				radio.push({
					dbId: song.id,
					trackTitle: song.name,
					coverImage: song.cover_image,
					streamUrl: song.file,
				});
			});

		}

	}, [isLoadingRadioSongs]);


	return (
		<div className="animate__animated animate__fadeIn float-container"
			style={{ width: '100%', padding: '50px' }}
		>
			<h1>My Radio</h1>
			<hr />
			<Spacer y={1} />

			{/** Don't delete */}
			{/* <SongTable songs={testSongs} handleSwitch={handleSelect} isAlbum={false} setExternalPlay={function (): void { return; }} />
			<BottomNavbar
				playlist={testPlaylist}
				playing={externalPlay}
				setExternalPlay={setExternalPlay} /> */}
			{
				isLoadingRadioSongs ?
					(
						<>
							<h3>Loading </h3><Loading type='points' />
						</>

					)
					:
					(
						<>
							<SongTable songs={radioSongs} handleSwitch={handleSelect} isAlbum={false} setExternalPlay={function (): void { return; }} />
							<BottomNavbar
								playlist={radio}
								playing={externalPlay}
								setExternalPlay={setExternalPlay} />
						</>

					)
			}

		</div>
	);
};
