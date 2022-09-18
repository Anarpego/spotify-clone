import axios from "axios";


// * Songs
export const fetchSongs = async () => {
	try {
		return (await axios.get(`${process.env.REACT_APP_STREAMING_SERVICE}/song/getSongs`)).data;
	} catch (e) {
		return [];
	}
};

export const fetchSongsByAlbum = async (albumId: number) => {
	try {
		return (await axios.get(`${process.env.REACT_APP_STREAMING_SERVICE}/song/getSongsByAlbum/${albumId}`)).data;
	} catch (e) {
		return [];
	}
};

// * Albums
export const fetchAlbums = async () => {
	try {
		return (await axios.get(`${process.env.REACT_APP_STREAMING_SERVICE}/album/getAlbums`)).data;
	} catch (e) {
		return [];
	}
};

// * Account
export const fetchAccount = async () => {

	const token = localStorage.getItem('token') || '';
	try {
		return (
			await axios.get(`${process.env.REACT_APP_ACCOUNT_SERVICE}/account/user`, 
			{
				headers: {
					'x-auth-token': `Bearer ${token}`
				}
			})
		).data;

	} catch (e) {
		return [];
	}

}