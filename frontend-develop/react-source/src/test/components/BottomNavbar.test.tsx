import { screen, render, fireEvent } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import { BottomNavbar } from '../../components/ui/BottomNavbar';
import { AuthContext, AuthProvider } from '../../context/AuthContext';
import { Song } from '../../interfaces/interfaces';


describe('tests on <BottomNavbar />', () => {

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


	test('should render BottomNavbar', () => {

		render(
			<AuthProvider>

				<BottomNavbar playlist={testPlaylist} playing={false} setExternalPlay={function (flag: boolean): void {
								throw new Error('Function not implemented.');
							}} />
			</AuthProvider>

		);

		screen.debug();


		const prevBtn = screen.getByTestId('test-prev');
		const playBtn = screen.getByTestId('test-play');
		const nextBtn = screen.getByTestId('test-next');
		const cover = screen.getByTestId('album-cover');

		expect(cover)

		expect(playBtn);
		

		// * playing a song (prev and next)
		fireEvent.click(playBtn);
		wait(4000);
		fireEvent.click(nextBtn);
		wait(4000);
		fireEvent.click(nextBtn);
		wait(4000);
		fireEvent.click(nextBtn);
		wait(4000);
		fireEvent.click(prevBtn);
		wait(4000);
		fireEvent.click(prevBtn);
		wait(4000);

		// const playBtn = document.getElementById("playbtn") as HTMLInputElement | null;

		// if (playBtn !== null) {
		// 	console.log('play!');
		// 	fireEvent.click(playBtn);
		// }


	});


});