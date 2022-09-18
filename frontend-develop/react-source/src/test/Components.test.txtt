import { render, screen } from '@testing-library/react';
import SoundPlayer from '../components/ui/SoundPlayer';
import { Album, Song } from '../interfaces';
import { act } from 'react-dom/test-utils';
import { RadioPage } from '../pages/user/RadioPage';
import { PlaylistPage } from '../pages/user/PlaylistPage';
import { AlbumCard } from '../components/user/AlbumCard';



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
	}
];

test('Render a song table', () => {
	act(() => {
		render(<SoundPlayer playlist={testPlaylist} playing={false} setExternalPlay={function (): void { }} />)
	})

})

// ----------------------


test('Render home table', () => {


	// act(() => {
	// 	render(<HomePage />);
	// })



	//expect(screen.getByTitle('Home')).toBeInTheDocument();

})

const albums = [
	{
		"id": 1,
		"name": "Fuerza Natural",
		"artist_id": 1,
		"cover_image": "https://i.scdn.co/image/ab67616d0000b27314653b83cd7d851accdb5142"
		},
		{
		"id": 2,
		"name": "Ahi vamos",
		"artist_id": 1,
		"cover_image": "https://i.scdn.co/image/ab67616d0000b273d543f7c7de880da5370922c0"
		},
		{
		"id": 3,
		"name": "album de arjona 2",
		"artist_id": 1,
		"cover_image": "https://i.scdn.co/image/ab67616d00001e02ebc54ddc4b04a8396b98b261"
		},
		{
		"id": 4,
		"name": "Grandes exitos",
		"artist_id": 1,
		"cover_image": "https://i.scdn.co/image/ab67706f000000034eb58a097da59ad442e26bf2"
		},
		{
		"id": 5,
		"name": "Album de prueba 1",
		"artist_id": 1,
		"cover_image": "https://i.scdn.co/image/ab67706f00000003fd6bff9e6d173b371e5865e2"
		},
		{
		"id": 6,
		"name": "Album de prueba 2",
		"artist_id": 1,
		"cover_image": "https://storage.googleapis.com/ayd2_bucket/album_cover_image/Album de prueba 2.jpg"
		}
]

test('Render album card table', () => {

	act(() => {
		render(<AlbumCard album={albums[0]} handleSwitch={function (album: Album): void {
			throw new Error('Function not implemented.');
		} } /> )
	})
})


// test('Render Sidebar', () => {

// 	render(<Sidebar />)

// })


// * Test block
test("Show RadioPage page", () => {

	act(() => {
		render(<RadioPage />);
	})


})



test("Show playlist page", () => {

	render(<PlaylistPage />);
})



