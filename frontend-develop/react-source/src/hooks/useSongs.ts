import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SongDetail, SongDB } from '../interfaces';
import { AuthContext } from '../context/AuthContext';

export const useSongs = () => {

	const token = localStorage.getItem('token') || '';

	// * All songs
	const [radioSongs, setRadioSongs] = useState<SongDB[]>([]);
	const [isLoadingRadioSongs, setIsLoadingRadioSongs] = useState(true);

	// * Album songs
	const [albumSongs, setAlbumSongs] = useState<SongDB[]>([]);
	const [isLoadingAlbumSongs, setIsLoadingAlbumSongs] = useState(true);

	// * Liked songs
	const [likedSongs, setLikedSongs] = useState<SongDB[]>([]);
	const [isLoadingLikedSongs, setIsLoadingLikedSongs] = useState(true);

	// * Liked songs
	const [onRepeatSongs, setOnRepeatSongs] = useState<SongDB[]>([]);
	const [isLoadingOnRepeatSongs, setIsLoadingOnRepeatSongs] = useState(true);

	// * Most reproduced songs
	const [mostReproducedSongs, setMostReproducedSongs] = useState<SongDetail[]>([]);
	const [isLoadingMostReproduced, setIsLoadingMostReproduced] = useState(true);
	


	// TODO: get all songs
	const getAllSongs = async () => {
		await axios.get(`${process.env.REACT_APP_STREAMING_SERVICE}/song/getSongs`)
			.then((response) => {
				setRadioSongs(response.data.songs);
				setIsLoadingRadioSongs(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};


	// TODO: get songs by album
	const getSongsByAlbum = async (albumId: number) => {

		await axios.get(`${process.env.REACT_APP_STREAMING_SERVICE}/song/getSongsByAlbum/${albumId}`)
			.then((response) => {

				setAlbumSongs(response.data.album);
				setIsLoadingAlbumSongs(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoadingAlbumSongs(true);
			});

	};

	const getLikedSongs = async () => {

		await axios.get(`${process.env.REACT_APP_STREAMING_SERVICE}/song/getFavorites`,{
			headers: {
				'x-auth-token': `Bearer ${token}`,
			},
		}).then((response) => {
			setLikedSongs(response.data.favoritas);
			setIsLoadingLikedSongs(false);
		}).catch((err) => {
			console.log(err);
			setIsLoadingLikedSongs(true);
		});
	};

	const getOnRepeatSongs = async () => {

		await axios.get(`${process.env.REACT_APP_STREAMING_SERVICE}/song/onRepeat`,{
			headers: {
				'x-auth-token': `Bearer ${token}`,
			},
		}).then((response) => {
			setOnRepeatSongs(response.data.onRepeat);
			setIsLoadingOnRepeatSongs(false);
		}).catch((err) => {
			console.log(err);
			setIsLoadingOnRepeatSongs(true);
		});
	};

	// * Like songs
	const likeSong = async (song_id: number) => {


		await axios.post(`${process.env.REACT_APP_STREAMING_SERVICE}/song/favoriteSong`, {
			song_id
		},{
			headers: {
				'x-auth-token': `Bearer ${token}`,
			},
		}).then((response) => {
			//console.log('liked');
		}).catch((err) => {
			console.log(err);
			//console.log('error');
		});


	};


	//  * Get most reproduced songs
	const getMostReproducedSongs = async() => {
		
		await axios.get(`${process.env.REACT_APP_STREAMING_SERVICE}/song/reportecanciones`)
			.then((response) => {


				if(response.data.status) {
					//console.log(response.data);
					//console.log(response.data.reporte[0]);
					setMostReproducedSongs(response.data.reporte[0]);
					//setAlbumSongs(response.data.album);
					setIsLoadingMostReproduced(false);
				}
				
			})
			.catch((err) => {
				console.log(err);
				setIsLoadingMostReproduced(true);
			});
	};



	useEffect(() => {

		getAllSongs();

	}, [isLoadingRadioSongs]);

	useEffect(() => {

		getMostReproducedSongs();

	}, [isLoadingMostReproduced]);

	useEffect(() => {

		getLikedSongs();

	}, [isLoadingLikedSongs]);

	useEffect(() => {

		getOnRepeatSongs();

	}, [isLoadingOnRepeatSongs]);


	return {
		getSongsByAlbum,
		getMostReproducedSongs,
		setIsLoadingAlbumSongs,
		setIsLoadingMostReproduced,
		likeSong,
		getLikedSongs,
		isLoadingMostReproduced,
		radioSongs,
		isLoadingRadioSongs,
		albumSongs,
		isLoadingAlbumSongs,
		mostReproducedSongs,
		likedSongs,
		isLoadingLikedSongs,
		setIsLoadingLikedSongs,
		onRepeatSongs,
		isLoadingOnRepeatSongs,
		setIsLoadingOnRepeatSongs
	};

};
