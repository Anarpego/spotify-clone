import { render, screen } from '@testing-library/react';
import { AlbumCard } from '../../components/user/AlbumCard';
import { Album } from '../../interfaces';

describe('first', () => {

	// id:          number;
	// name:        string;
	// artist_id:   number;
	// cover_image: string;
	const album: Album = {
		id: 1,
		name: 'Fuerza Natural',
		artist_id: 1,
		cover_image: 'https://i.scdn.co/image/ab67616d0000b27314653b83cd7d851accdb5142'
	}


	test('should return album card', () => {
		render(
			<AlbumCard album={album} handleSwitch={function (album: Album): void {
				throw new Error('Function not implemented.');
			}} />
		);
	});

	test('Should show the Album information', () => {

		render(
			<AlbumCard album={album} handleSwitch={function (album: Album): void {
				throw new Error('Function not implemented.');
			}} />);


		// * debug
		//screen.debug();

		// const { src, alt } = screen.getByRole('img') as HTMLInputElement | null;
		// //console.log(src);

		// expect(src).toBe(album.cover_image);

		//expect( src ).toBe( album.cover_image);
		//expect(screen.getByText(title)).toBeTruthy();

	});


	test('should show the album title', () => {


		render(
			<AlbumCard album={album} handleSwitch={function (album: Album): void {
				throw new Error('Function not implemented.');
			}} />
		);

		//screen.getByText(album.name);
		expect( screen.getByText( album.name ) ).toBeTruthy();
		// console.log()

	});

});