import { Song } from '../interfaces';


// * Stored songs
// let storedSongs = JSON.parse(localStorage.getItem('songs') || '[]');

// * Save song to local storage
export const saveSongToHistory = (song: Song) => {

	
	const songs: Song[] = JSON.parse(localStorage.getItem('songs') || '[]');

	//
	// * Validate if the song exist
	const a = songs.filter((song_) => song_.trackTitle === song.trackTitle);

	if (a.length === 0) {
		//console.log('saving song');
		songs.push(song);
	}

	localStorage.setItem('songs', JSON.stringify(songs));

};


export const storedSongs: Song[] = JSON.parse(localStorage.getItem('songs') || '[]');
