const { response } = require('express');
const { queries } = require('../db/queries');
const { Storage } = require('@google-cloud/storage');

/* eslint-disable */
// Instantiate a storage client
const projectId = 'ayd2-352400'; // Get this from Google Cloud
const keyFilename = './keys/ayd2-352400-ef64747e570d.json'; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket('ayd2_bucket');

const deleteSong = async (req, res = response) => {
  try {
    const songId = req.params.id;
    await queries.deleteSong(songId);

    global.log.info(`Cancion eliminada`);
    res.status(200).json({
      mensaje: 'Cancion eliminada correctamente',
      status: true,
    });
  } catch (error) {
    console.log(error);
    global.log.error(`Error al eliminar cancion`);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      correcto: false,
    });
  }
};
const getOneSong = async (req, res = response) => {
  try {
    const songId = req.params.id;
    const song = await queries.getOneSong(songId);

    const album = await queries.getOneAlbum(song[0].album_id);

    const artist = await queries.getOneArtist(album[0].artist_id);

    global.log.info(`Cancion enviada`);
    res.status(200).json({
      status: true,
      song: {
        id: song[0].id,
        name: song[0].name,
        album: {
          id: album[0].id,
          name: album[0].name,
          artist: artist[0].artist,
          cover_image: album[0].cover_image,
        },
        file: song[0].file,
        cover_image: song[0].cover_image,
      },
    });
  } catch (error) {
    global.log.error(`Error al obtener cancion`);
    console.log(error);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      correcto: false,
    });
  }
};

const getSongs = async (req, res = response) => {
  try {
    const songs = await queries.getSongs();

    global.log.info(`Lista de canciones enviada`);
    res.status(200).json({
      status: true,
      songs,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      correcto: false,
    });
  }
};

const createSong = async (req, res = response, next) => {
  // console.log(req.body)
  const { name, album_id, file, cover_image } = req.body;

  try {
    const blob = bucket.file(`song_cover_image/${name}.jpg`);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      next(err);
    });

    blobStream.on('finish', async () => {
      // The public URL can be used to directly access the file via HTTP.
      console.log(bucket.name);
      console.log(blob.name);
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const blob2 = bucket.file(`songs/${name}.mp3`);
      const blobStream2 = blob2.createWriteStream();

      blobStream2.on('error', (err) => {
        next(err);
      });

      blobStream2.on('finish', async () => {
        const publicUrlAudio = `https://storage.googleapis.com/${bucket.name}/${blob2.name}`;

        const songBody = { name, album_id, publicUrlAudio, publicUrl };
        await queries.createSong(songBody);

        global.log.info(`Cancion creada`);
        res.status(200).json({
          mensaje: 'Cancion creada correctamente',
          status: true,
        });
      });

      blobStream2.end(Buffer.from(file, 'base64'));
      // res.status(200).send(publicUrl);
    });

    blobStream.end(Buffer.from(cover_image, 'base64'));
  } catch (error) {
    global.log.error(`Error al crear cancion`);
    console.log(error);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      correcto: false,
    });
  }
};

const updateSong = async (req, res = response, next) => {
  // console.log(req.body)
  const songId = req.params.id;
  const { name, album_id, file, cover_image } = req.body;

  try {
    const blob = bucket.file(`song_cover_image/${name}.jpg`);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      next(err);
    });

    blobStream.on('finish', async () => {
      // The public URL can be used to directly access the file via HTTP.
      console.log(bucket.name);
      console.log(blob.name);
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const blob2 = bucket.file(`songs/${name}.mp3`);
      const blobStream2 = blob2.createWriteStream();

      blobStream2.on('error', (err) => {
        next(err);
      });

      blobStream2.on('finish', async () => {
        const publicUrlAudio = `https://storage.googleapis.com/${bucket.name}/${blob2.name}`;

        const songBody = { name, album_id, publicUrlAudio, publicUrl };
        await queries.updateSong(songId, songBody);

        global.log.info(`Cancion actualizada`);
        res.status(200).json({
          mensaje: 'Cancion actualizada correctamente',
          status: true,
        });
      });

      blobStream2.end(Buffer.from(file, 'base64'));
      // res.status(200).send(publicUrl);
    });

    blobStream.end(Buffer.from(cover_image, 'base64'));
  } catch (error) {
    global.log.error(`Error al actualizar cancion`);
    console.log(error);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      correcto: false,
    });
  }
};

const getSongsByAlbum = async (req, res = response) => {
  try {
    const idAlbum = req.params.id;
    const album = await queries.getSongsByAlbum(idAlbum);

    global.log.info(`Lista de canciones enviada`);
    res.status(200).json({
      status: true,
      album,
    });
  } catch (error) {
    global.log.error(`Error al obtener lista de canciones`);
    console.log(error);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      correcto: false,
    });
  }
};

const reporteCanciones = async (req, res = response) => {
  try {

    const reporte = await queries.reporteCanciones();
    global.log.info('Reporte de canciones enviado');
    res.status(200).json({
      status: true,
      reporte
    })
  } catch (error) {
    global.log.error('Error al obtener reporte de canciones');
    return res.status(400).json({
      mensaje: 'Error en el servidor.',
      correcto: false,
    })
  }
}


const guardarHistorial = async (req, res = response) => {
  

  try{

    const { client_id, song_id } = req.body;
    const historialBody = {client_id, song_id};
    await queries.guardarHistorial(historialBody);

    global.log.info(`Historial guardado`);
    res.status(200).json({
      status: true,
      mensaje: 'historial guardado correctamente',
    });
  }catch(error){
    global.log.error('Error al guardar historial');
    return res.status(400).json({
      mensaje: 'Error en el servidor.',
      correcto: false,
    })
  }
  
}



const onRepeat = async (req, res = response) => {



  try {

    const { id } = req.user.client;
    const onRepeat = await queries.onRepeat(id);

    global.log.info(`Lista de canciones onRepeat enviada`);
    res.status(200).json({
      status: true,
      onRepeat,
    });
  }catch(error){
    global.log.error('Error al obtener canciones on repeat');
    return res.status(400).json({
      mensaje: 'Error en el servidor.',
      correcto: false,
    })
  }
}

const cancionesFavoritas = async (req, res = response) => {

  

  try {
    const { id } = req.user.client;
    const favoritas = await queries.getFavorites(id);

    global.log.info(`Lista de canciones favoritas enviada`);
    res.status(200).json({
      status: true,
      favoritas,
    });
  }catch(error){
    global.log.error('Error al obtener canciones favoritas');
    return res.status(400).json({
      mensaje: 'Error en el servidor.',
      correcto: false,
    })
  }
}

const reporteArtistasConMasMinutosDeReproduccion = async (req, res = response) => {
  try {

    const reporte = await queries.reporteArtistasConMasMinutosDeReproduccion();
    global.log.info('Reporte de artistas con mas minutos de reproduccion');
    res.status(200).json({
      status: true,
      reporte
    })
  } catch (error) {
    global.log.error('Error al obtener reporte de artistas con mas minutos de reproduccion');
    return res.status(400).json({
      mensaje: 'Error en el servidor.',
      correcto: false,
    })
  }
}

const getHistorial = async (req, res = response) => {



  try {

    const  id  = req.params.clienteId;
    const getHistorial = await queries.getHistorial(id);

    global.log.info(`Historial del cliente ${id} enviado`);
    res.status(200).json({
      status: true,
      getHistorial,
    });
  }catch(error){
    global.log.error('Error al obtener historial del cliente ${id}');
    return res.status(400).json({
      mensaje: 'Error en el servidor.',
      correcto: false,
    })
  }
}

const favoriteASong = async (req, res = response) => {


  try {
    const { id } = req.user.client;
    const { song_id } = req.body;
    const result = await queries.favoriteSong(id, song_id);

    global.log.info(`Cancion con Id ${song_id} guardada en favoritos`);
    res.status(200).json({
      status: true,
      favorite: result[0][0].status,
      mensaje: `cancion ${result[0][0].status ? 'guardada' : 'eliminada'} en favoritos correctamente`,
    });
  }catch(error){
    global.log.error('Error al guardar/eliminar cancion en favoritos');
    return res.status(400).json({
      mensaje: 'Error en el servidor.',
      correcto: false,
    })
  }
}

module.exports = {
  createSong,
  getSongs,
  getOneSong,
  getSongsByAlbum,
  deleteSong,
  updateSong,
  reporteCanciones,
  guardarHistorial,
  onRepeat,
  cancionesFavoritas,
  reporteArtistasConMasMinutosDeReproduccion,
  getHistorial,
  favoriteASong
};
