
import { screen, render } from '@testing-library/react';
import { SongTable } from '../../components/user/SongTable';
import { Song } from '../../interfaces';
import axios, { AxiosResponse } from 'axios';
import { fetchSongs } from '../apiCalls'


// jest.mock('../../hooks/useSongs');
describe('Test on <SongTable />', () => {

	const songs = [
		{
			id: 1,
			name: "Cancion 1",
			album_id: 3,
			file: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
			cover_image: "https://i.scdn.co/image/ab67706f000000032fd8aab5d55d57ce76f91b65"
		},
		{
			id: 2,
			name: "Electronic",
			album_id: 3,
			file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
			cover_image: "https://i.scdn.co/image/ab67706f000000032fd8aab5d55d57ce76f91b65"
		},
		{
			id: 3,
			name: "Caja",
			album_id: 3,
			file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
			cover_image: "https://i.scdn.co/image/ab67706f000000032fd8aab5d55d57ce76f91b65"
		},
		{
			id: 4,
			name: "Come On, Eileen",
			album_id: 4,
			file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
			cover_image: "https://i.scdn.co/image/ab67706f00000003e41284f917a5ff88eb72e38a"
		},
		{
			id: 5,
			name: "Purple Rain",
			album_id: 4,
			file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
			cover_image: "https://i.scdn.co/image/ab67706f00000003e41284f917a5ff88eb72e38a"
		},
		{
			id: 6,
			name: "El Problema",
			album_id: 4,
			file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
			cover_image: "https://i.scdn.co/image/ab67706f00000003e41284f917a5ff88eb72e38a"
		},
		{
			id: 7,
			name: "Cancion 1",
			album_id: 3,
			file: "https://storage.googleapis.com/ayd2_bucket/songs/mojado.mp3",
			cover_image: "https://i.scdn.co/image/ab67706f000000032fd8aab5d55d57ce76f91b65"
		},
		{
			id: 8,
			name: "Electronic",
			album_id: 3,
			file: "https://filesamples.com/samples/audio/mp3/Symphony%20No.6%20(1st%20movement).mp3",
			cover_image: "https://i.scdn.co/image/ab67706f000000032fd8aab5d55d57ce76f91b65"
		},
		{
			id: 9,
			name: "Caja",
			album_id: 3,
			file: "https://filesamples.com/samples/audio/mp3/sample4.mp3",
			cover_image: "https://i.scdn.co/image/ab67706f000000032fd8aab5d55d57ce76f91b65"
		}
	];


	const mockedResponse: AxiosResponse = {
		data: songs,
		status: 200,
		statusText: 'OK',
		headers: {},
		config: {},
	};

	test('should show songs headers', () => {


		render(
			<SongTable songs={mockedResponse.data} handleSwitch={function (): void {
				throw new Error('Function not implemented.');
			}} isAlbum={false} setExternalPlay={function (playlist: Song[]): void {
				throw new Error('Function not implemented.');
			}} />
		);

		screen.debug();
		expect(screen.getByText('Song'));
		expect(screen.getByText('Title'));


		//expect(screen.getByText('Cancion 1'));
		//expect(screen.getByText(songs[0].name));

	});

	// ** Testing song table with all songs from api

	//console.log(mockedResponse.data);

	// test('should show song names', () => {

	// 	render(
	// 		<SongTable songs={songs} handleSwitch={function (): void {
	// 			throw new Error('Function not implemented.');
	// 		}} isAlbum={false} setExternalPlay={function (playlist: Song[]): void {
	// 			throw new Error('Function not implemented.');
	// 		}} />
	// 	);


	// 	//screen.debug()
	// 	//console.log(screen.getByRole('row'));
	// 	//const a: HTMLElement = screen.getByTestId('btn-like');
	// 	screen.getByRole('Play');
	// 	//expect(screen.getByText('💚')).toBeInTheDocument();
	// 	// console.log(a);

	//});

})