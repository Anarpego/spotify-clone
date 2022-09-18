import axios, { AxiosResponse } from 'axios';
import { jest } from '@jest/globals';
import { fetchSongs, fetchAlbums, fetchSongsByAlbum } from './apiCalls';

jest.mock('axios');

// Create an object of type of mocked Axios.
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('get all songs', () => {

	test('should return songs list', async () => {
		const songs = [
			{
				"id": 1,
				"name": "Cancion 1",
				"album_id": 3,
				"file": "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
				"cover_image": "https://i.scdn.co/image/ab67706f000000032fd8aab5d55d57ce76f91b65"
			},
			{
				"id": 2,
				"name": "Electronic",
				"album_id": 3,
				"file": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
				"cover_image": "https://i.scdn.co/image/ab67706f000000032fd8aab5d55d57ce76f91b65"
			},
			{
				"id": 3,
				"name": "Caja",
				"album_id": 3,
				"file": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
				"cover_image": "https://i.scdn.co/image/ab67706f000000032fd8aab5d55d57ce76f91b65"
			},
			{
				"id": 4,
				"name": "Come On, Eileen",
				"album_id": 4,
				"file": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
				"cover_image": "https://i.scdn.co/image/ab67706f00000003e41284f917a5ff88eb72e38a"
			},
			{
				"id": 5,
				"name": "Purple Rain",
				"album_id": 4,
				"file": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
				"cover_image": "https://i.scdn.co/image/ab67706f00000003e41284f917a5ff88eb72e38a"
			},
			{
				"id": 6,
				"name": "El Problema",
				"album_id": 4,
				"file": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
				"cover_image": "https://i.scdn.co/image/ab67706f00000003e41284f917a5ff88eb72e38a"
			},
			{
				"id": 7,
				"name": "Cancion 1",
				"album_id": 3,
				"file": "https://storage.googleapis.com/ayd2_bucket/songs/mojado.mp3",
				"cover_image": "https://i.scdn.co/image/ab67706f000000032fd8aab5d55d57ce76f91b65"
			},
			{
				"id": 8,
				"name": "Electronic",
				"album_id": 3,
				"file": "https://filesamples.com/samples/audio/mp3/Symphony%20No.6%20(1st%20movement).mp3",
				"cover_image": "https://i.scdn.co/image/ab67706f000000032fd8aab5d55d57ce76f91b65"
			},
			{
				"id": 9,
				"name": "Caja",
				"album_id": 3,
				"file": "https://filesamples.com/samples/audio/mp3/sample4.mp3",
				"cover_image": "https://i.scdn.co/image/ab67706f000000032fd8aab5d55d57ce76f91b65"
			}
		];

		const mockedResponse: AxiosResponse = {
			data: songs,
			status: 200,
			statusText: 'OK',
			headers: {},
			config: {},
		};

		mockedAxios.get.mockResolvedValueOnce(mockedResponse);
		expect(axios.get).not.toHaveBeenCalled();
		const data = await fetchSongs();
		//console.log(data);
		expect(axios.get).toHaveBeenCalled();
		expect(data).toEqual(songs);
	})


})

describe('get all songs', () => {

	test('should return songs list', async () => {
		const albumSongs = [
			{
				"id": 1,
				"name": "Test Song",
				"album_id": 1,
				"file": "https://filesamples.com/samples/audio/mp3/sample4.mp3",
				"cover_image": "https://i.scdn.co/image/ab67616d0000b27314653b83cd7d851accdb5142"
			},
			{
				"id": 4,
				"name": "cancion de swagger",
				"album_id": 1,
				"file": "https://storage.googleapis.com/ayd2_bucket/songs/cancion de swagger.mp3",
				"cover_image": "https://storage.googleapis.com/ayd2_bucket/song_cover_image/cancion de swagger.jpg"
			},
			{
				"id": 6,
				"name": "My test song",
				"album_id": 1,
				"file": "https://storage.googleapis.com/ayd2_bucket/songs/mojado.mp3",
				"cover_image": "https://i.scdn.co/image/ab67616d0000b27314653b83cd7d851accdb5142"
			}
		];

		const mockedResponse: AxiosResponse = {
			data: albumSongs,
			status: 200,
			statusText: 'OK',
			headers: {},
			config: {},
		};

		mockedAxios.get.mockResolvedValueOnce(mockedResponse);
		expect(axios.get).not.toHaveBeenCalled();
		// * Fetch songs from album with id 1
		const data = await fetchSongsByAlbum(1);
		//console.log(data);
		expect(axios.get).toHaveBeenCalled();
		expect(data).toEqual(albumSongs);
	})


})


describe('get all albums', () => {
	
	test('should return albums list', async () => {
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
		];

		const mockedResponse: AxiosResponse = {
			data: albums,
			status: 200,
			statusText: 'OK',
			headers: {},
			config: {},
		};
	
		mockedAxios.get.mockResolvedValueOnce(mockedResponse);
		expect(axios.get).not.toHaveBeenCalled();
		const data = await fetchAlbums();
		//console.log(data);
		expect(axios.get).toHaveBeenCalled();
		expect(data).toEqual(albums);
	})


})


describe('get user account', () => {

	test('should return user account', async () => {

		const user = {
			id: 4,
			name: "Maria Lopez",
			email: "maria@gmail.com",
			password: "$2b$10$7hSF3SqBdZ6.d3NRnw1hYOqXr7v0IUWWjbwW/uRRg5rMcd8xOF3gK",
			card_id: 4,
			subscription: 0,
			gravatar: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
		}

		const mockedResponse: AxiosResponse = {
			data: user,
			status: 200,
			statusText: 'OK',
			headers: {},
			config: {},
		};

	

		mockedAxios.get.mockResolvedValueOnce(mockedResponse);
		expect(axios.get).not.toHaveBeenCalled();
		const data = await fetchAlbums();
		console.log(data);
		expect(axios.get).toHaveBeenCalled();
		expect(data).toEqual(user);
	});

});