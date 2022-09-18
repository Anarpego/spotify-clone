import { useState, useEffect } from 'react';
import { Grid, Loading, Spacer } from '@nextui-org/react';
import { Album, Song } from '../../interfaces';
import { AlbumCard } from '../../components/user/AlbumCard';
import { SongTable } from '../../components/user/SongTable';
import { BottomNavbar } from '../../components/ui/BottomNavbar';
import { useAlbums } from '../../hooks/useAlbums';
import { useSongs } from '../../hooks/useSongs';
// import { AuthContext } from '../../context/AuthContext';

// * Empty album
const initialAlbum: Album = {
	id: 0,
	name: '',
	artist_id: 0,
	cover_image: ''
};


// * Prueba
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
		coverImage: 'https://storage.googleapis.com/ayd2_bucket/song_cover_image/mojado.jpg'
	},

];

let playerSongs: Song[] = [

];


export const HomePage = () => {

	// const{auth} = useContext(AuthContext);
	// console.log(auth);

	const [isAlbumSelected, setIsAlbumSelected] = useState(false);
	const [albumSelected, setAlbumSelected] = useState<Album>(initialAlbum);
	const [externalPlay, setExternalPlay] = useState(false);
	const [playlist, setPlaylist] = useState<Song[]>(testPlaylist);


	const [albumSelectedSongs, setAlbumSelectedSongs] = useState<Song[]>([]);

	// * Call useAlbums Hook
	const { albums, isAlbumsLoading } = useAlbums();
	// * Call useSongs Hook
	const { getSongsByAlbum, albumSongs, isLoadingAlbumSongs, setIsLoadingAlbumSongs } = useSongs();


	// * Change the actual album selected
	const handleSwitch = (album: Album = initialAlbum) => {

		// * If there is an album selected, then execute the getSongsByAlbum function from the custom hook
		if (isAlbumSelected === false) {
			//console.log(album);
			setAlbumSelected(album);
			console.log('album selected:', album.id);
			getSongsByAlbum(album.id);
			setIsAlbumSelected(true);

		} else {
			playerSongs = [];
			setAlbumSelected(initialAlbum);
			setAlbumSelectedSongs([]);
			setIsAlbumSelected(false);
			setIsLoadingAlbumSongs(true);
		}


	};

	// * Playlist or album
	const playFromExternal = (newPlaylist: Song[] = []) => {

		setExternalPlay(true);
		setPlaylist(newPlaylist);
	};

	useEffect(() => {

		if (!isLoadingAlbumSongs) {
			console.log('loading album player...');
			console.log(albumSongs);
			albumSongs.map((song) => {
				playerSongs.push({
					streamUrl: song.file,
					trackTitle: song.name,
					coverImage: song.cover_image
				});
			});

			setAlbumSelectedSongs(playerSongs);
			//console.log(playerSongs);
		}

	}, [isLoadingAlbumSongs]);


	return (
		<>
			<div className='animate__animated animate__fadeIn float-container'
				style={{ width: '100%', padding: '50px' }}>

				{/** Write a conditional here */}
				{
					isAlbumSelected ?
						(

							<div>
								<SongTable
									songs={albumSongs}
									handleSwitch={handleSwitch}
									isAlbum
									albumName={albumSelected.name}
									setExternalPlay={() => playFromExternal(testPlaylist)}
								/>
							</div>

						)
						: (
							<>
								<h1>Home</h1>
								<hr />
								<Spacer y={1} />
								{
									isAlbumsLoading ? (
										<>
											<h3>Loading </h3><Loading type='points' />
										</>
									) :
										(
											<Grid.Container gap={2} justify='flex-start' style={{ overflow: 'hidden' }}>
												{/**xs={6} md={4} xl={2} sm={3} */}
												{
													albums.map((album) => (

														<AlbumCard
															album={album}
															handleSwitch={handleSwitch}
															key={album.id} />

													))
												}
											</Grid.Container>
										)
								}


							</>
						)
				}
				{


				}
				{
					isLoadingAlbumSongs ?
						(
							<h3></h3>
						)
						:
						(
							<BottomNavbar
								playlist={albumSelectedSongs}
								playing={externalPlay}
								setExternalPlay={setExternalPlay} />
						)

				}

			</div>

		</>

	);
};

// streamUrl: string;
//     trackTitle: string;
//     coverImage: string;
/**
 * 
 * 
 * 					albumSongs.map((song) => {
							testSongs.push({
								streamUrl: song.file,
								trackTitle: song.name,
								coverImage: song.cover_image
							})
						})
 */