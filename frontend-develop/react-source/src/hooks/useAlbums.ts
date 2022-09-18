import axios from 'axios';
import { useState, useEffect } from 'react';
import { Album, AlbumReport } from '../interfaces';

export const useAlbums = () => {

	// * All albums
	const [albums, setAlbums] = useState<Album[]>([]);
	const [isAlbumsLoading, setIsAlbumsLoading] = useState(true);

	// * Most reproduced albums
	const [mostReproducedAlbums, setMostReproducedAlbums] = useState<AlbumReport[]>([]);
	const [loadingMostReproducedAlbums, setLoadingMostReproducedAlbums] = useState(true);


	const getAlbums = async () => {

		await axios.get(`${process.env.REACT_APP_STREAMING_SERVICE}/album/getAlbums`)
			.then((response) => {

				setAlbums(response.data.albums);
				setIsAlbumsLoading(false);

			})
			.catch((err) => {
				console.log(err);
				setIsAlbumsLoading(true);
			});

	};


	const getMostReproducedAlbums = async () => {
		await axios.get(`${process.env.REACT_APP_STREAMING_SERVICE}/album/reporteAlbums`)
		.then((response) => {

			
			if(response.data.status) {
				//console.log(response.data.reporte[0]);
				setMostReproducedAlbums(response.data.reporte[0]);
				setLoadingMostReproducedAlbums(false);
			}

		})
		.catch((err) => {
			console.log(err);
			setIsAlbumsLoading(true);
		});

	};

	useEffect(() => {

		getAlbums();
	}, [isAlbumsLoading]);


	useEffect(() => {
	
		getMostReproducedAlbums();
	}, []);
	


	return {
		albums,
		mostReproducedAlbums,
		loadingMostReproducedAlbums,
		isAlbumsLoading
	};
};
