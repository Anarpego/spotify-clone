import axios from 'axios';

// Add songs to history
export const addSongToHistory = async (userId: number, songId: number) => {
  await axios
    .post(`${process.env.REACT_APP_STREAMING_SERVICE}/song/guardarHistorial`, {
      client_id: userId,
      song_id: songId,
    })
    .then((response) => {
		console.log(response.data);
      console.log('agregada');
    })
    .catch((err) => {
      console.log('error');
    });
};
