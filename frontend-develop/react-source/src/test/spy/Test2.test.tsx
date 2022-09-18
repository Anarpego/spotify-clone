import {  render, screen } from '@testing-library/react';
import { SongTable } from '../../components/user/SongTable'
import { BottomNavbar } from '../../components/ui/BottomNavbar';

import mockFetch from './mockFetch';
import { HomePage } from '../../pages/user';

const radio = [
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

const radioSongs = [
	{
		"id": 1,
		"name": "cancion2",
		"album_id": 1,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/cancion2.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/cancion2.jpg"
	},
	{
		"id": 2,
		"name": "I Dont love you",
		"album_id": 2,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/06-my_chemical_romance-i_dont_love_you.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/i%20dont%20love%20you%20MCR.jpg"
	},
	{
		"id": 3,
		"name": "Disenchanted",
		"album_id": 2,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/Disenchanted%20%20%20My%20chemical%20romance%20www.dilandau.eu.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/MCR%20disenchanted.jpg"
	},
	{
		"id": 4,
		"name": "Wake me up when september ends",
		"album_id": 3,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/11%20Wake%20me%20up%20when%20September%20Ends.MP3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/green%20day%20wake%20me%20up%20when%20september%20ends.jpg"
	},
	{
		"id": 5,
		"name": "Boulevard of broken dreams",
		"album_id": 3,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/Green%20Day%20-%20Boulevard%20of%20Broken%20Dreams.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/green%20day%20boulevar%20of%20broken%20dreams.jpg"
	},
	{
		"id": 6,
		"name": "Best of me",
		"album_id": 4,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/12%20%20%20Sum%2041%20%20%20Best%20Of%20Me%20www.dilandau.eu.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/Sum41%20best%20of%20me.jpg"
	},
	{
		"id": 7,
		"name": "Crash",
		"album_id": 4,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/Crash%20%20%20Sum%2041%20%20%20Screaming%20Bloody%20Murder%20www.dilandau.eu.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/sum41%20crash.jpg"
	},
	{
		"id": 8,
		"name": "Alibi",
		"album_id": 5,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/30%20Seconds%20to%20Mars%20-%20Alibi.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/30%20seconds%20to%20mars%20alibi.jpg"
	},
	{
		"id": 9,
		"name": "Faded",
		"album_id": 6,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/Alan%20Walker%20-%20Faded%20(Sub%20Espa%C3%B1ol).mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/Alan%20walker%20faded.jpg"
	},
	{
		"id": 10,
		"name": "Sing me to sleep",
		"album_id": 6,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/Alan%20Walker%20-%20Sing%20me%20to%20sleep.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/Alan%20walker%20sing%20me%20to%20sleep.jpg"
	},
	{
		"id": 11,
		"name": "Creep",
		"album_id": 7,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/Creep%20%20%20Radiohead%20www.dilandau.eu.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/radiohead%20creep.jpg"
	},
	{
		"id": 12,
		"name": "Letdown",
		"album_id": 7,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/Radiohead%20-%20Let%20Down.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/radiohead%20letdown.jpg"
	},
	{
		"id": 13,
		"name": "Street Spirit",
		"album_id": 7,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/Radiohead%20-%20Street%20Spirit%20(Fade%20Out).mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/radiohead%20street%20spirit.jpg"
	},
	{
		"id": 14,
		"name": "Every body is changing",
		"album_id": 8,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/everybody%20s%20changing-%20keane.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/Keane%20every%20body%20is%20changing.jpg"
	},
	{
		"id": 15,
		"name": "Love is the end",
		"album_id": 8,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/Keane%20-%20Love%20Is%20The%20End.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/keane%20love%20is%20the%20end.jpg"
	},
	{
		"id": 16,
		"name": "Fly to me",
		"album_id": 8,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/keane%20-%20Fly%20to%20me%20(sub.%20espa%C3%B1ol).mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/keane%20fly%20to%20me.jpg"
	},
	{
		"id": 17,
		"name": "The reason",
		"album_id": 9,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/Hoobastank%20-%20The%20Reason%20(1).mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/hoobastank%20the%20reason.jpg"
	},
	{
		"id": 18,
		"name": "You 're Beautiful",
		"album_id": 1,
		"file": "https://storage.googleapis.com/ayd2_bucket/songs/01.You're%20Beautiful%20%20%20James%20Blunt%20%20%20You%20Are%20Beautiful%20%E7%BE%8E%E4%B8%BD%E7%9A%84%E4%BD%A0%20www.dilandau.eu.mp3",
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/youre%20beautiful%20james%20blunt.jpg"
	}
]




beforeEach(() => {
	return jest.spyOn(window, "fetch").mockImplementation(mockFetch as any);
});



describe('tests with Test2.test.jsx', () => {


	test('should first', () => {

		render(
			<>

				<HomePage />

			</>
		);

		//screen.debug();

	});

	test('should render song table', () => {

		render(
			<>
				<SongTable songs={radioSongs} handleSwitch={() => handleSelect()} isAlbum={false} setExternalPlay={false as any} />
			</>
		);

		//screen.debug();
		expect(screen.getAllByRole('gridcell'));
		// expect(getByText('cancion2')).toBeInTheDocument();
		jest.spyOn(window, "fetch").mockRestore();
	});


});

afterEach(() => {
	jest.restoreAllMocks()
});

function handleSelect(): void {
	throw new Error('Function not implemented.');
}
