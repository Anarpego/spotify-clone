const { response } = require('express');
const { queries } = require('../db/queries');
const { Storage } = require('@google-cloud/storage');
const CacheService = require('../cache/index');
const cache = new CacheService();
/* eslint-disable */
// Instantiate a storage client
const projectId = 'ayd2-352400'; // Get this from Google Cloud
const keyFilename = './keys/ayd2-352400-ef64747e570d.json'; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket('ayd2_bucket');

const deleteArtist = async (req, res = response) => {
  try {
    const artistId = req.params.id;
    await queries.deleteArtist(artistId);

    global.log.info(`Artista eliminado`);
    res.status(200).json({
      mensaje: 'Artista eliminado correctamente',
      status: true,
    });
  } catch (error) {
    console.log(error);
    global.log.error(`Error al eliminar artista`);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      correcto: false,
    });
  }
};

const getOneArtist = async (req, res = response) => {
  try {
    const artistId = req.params.id;
    const artist = await queries.getOneArtist(artistId);

    global.log.info(`Artista enviado`);
    res.status(200).json({
      status: true,
      artist: artist[0],
    });
  } catch (error) {
    console.log(error);
    global.log.error(`Error al obtener artista`);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      correcto: false,
    });
  }
};

const getArtists = async (req, res = response) => {
  try {
    const artists = await queries.getArtists();

    global.log.info(`Lista de artistas enviada`);
    res.status(200).json({
      status: true,
      artists,
    });
  } catch (error) {
    console.log(error);
    global.log.error(`Error al obtener lista de artistas`);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      correcto: false,
    });
  }
};
const createArtist = async (req, res = response) => {
  console.log(req.body);


  try {


    const { artist } = req.body;
    const artistBody = { artist };

    await queries.createArtist(artistBody);

    global.log.info(`Artista creado`);
    res.status(200).json({
      mensaje: 'Artista creado correctamente',
      status: true,
    });
  } catch (error) {
    console.log(error);
    global.log.error(`Error al crear artista`);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      status: false,
    });
  }
};

const deleteAlbum = async (req, res = response) => {
  try {
    const albumId = req.params.id;
    const albumCache = await cache.getAlbum(albumId);
    const albumsCache = await cache.getAllAlbums();
    if (albumCache != null) {
      global.log.debug('borrando datos de cache');
      await cache.deleteAlbum(albumId);
    }
    if (albumsCache != null) {
      global.log.debug('borrando datos de cache');
      await cache.deleteAlbum();
    }
    await queries.deleteAlbum(albumId);

    global.log.info(`Album eliminado`);
    res.status(200).json({
      mensaje: 'Album eliminado correctamente',
      status: true,
    });
  } catch (error) {
    console.log(error);
    global.log.error(`Error al eliminar album`);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      correcto: false,
    });
  }
};

const getOneAlbum = async (req, res = response) => {
  try {
    const albumId = req.params.id;
    let data;
    const albumCache = await cache.getAlbum(albumId);
    if (albumCache == null) {
      global.log.debug('almacenar dato en cache');
      const album = await queries.getOneAlbum(albumId);
      const artist = await queries.getOneArtist(album[0].artist_id);
      data = {
        id: album[0].id,
        name: album[0].name,
        artist: artist[0].artist,
        cover_image: album[0].cover_image,
      };
      await cache.storeAlbum(albumId, data);
    } else {
      data = albumCache;
    }

    global.log.info(`Album enviado`);
    res.status(200).json({
      status: true,
      album: data,
    });
  } catch (error) {
    console.log(error);
    global.log.error(`Error al obtener album`);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      correcto: false,
    });
  }
};

const getAlbums = async (req, res = response) => {
  try {
    const albumsCache = await cache.getAllAlbums();
    let data;
    if (albumsCache == null) {
      global.log.debug('almacenar data en cache');
      data = await queries.getAlbums();
      cache.storeAllAlbums(data);
    } else {
      data = albumsCache;
    }

    global.log.info(`Lista de albums enviada`);
    res.status(200).json({
      status: true,
      albums: data,
    });
  } catch (error) {
    global.log.error(`Error al obtener lista de albumes`);
    console.log(error);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      correcto: false,
    });
  }
};

const createAlbum = async (req, res = response) => {
  console.log(req.body);


  try {
    const { name, artist_id, cover_image } = req.body;
    const blob = bucket.file(`album_cover_image/${name}.jpg`);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      next(err);
    });

    blobStream.on('finish', async () => {
      // The public URL can be used to directly access the file via HTTP.
      console.log(bucket.name);
      console.log(blob.name);
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const albumBody = { name, artist_id, publicUrl };

      albumCache = await cache.getAllAlbums();

      if (albumCache != null) {
        global.log.debug('borrando datos de cache');
        await cache.deleteAllAlbums();
      }

      await queries.createAlbum(albumBody);

      global.log.info(`Album creado`);
      res.status(200).json({
        mensaje: 'Album creado correctamente',
        status: true,
      });
    });
    blobStream.end(Buffer.from(cover_image, 'base64'));
  } catch (error) {
    global.log.error(`Error al crear album`);
    console.log(error);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      status: false,
    });
  }
};

const updateAlbum = async (req, res = response) => {
  console.log(req.body);


  try {
    const albumId = req.params.id;
    const { name, artist_id, cover_image } = req.body;
    const blob = bucket.file(`album_cover_image/${name}.jpg`);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      next(err);
    });

    blobStream.on('finish', async () => {
      // The public URL can be used to directly access the file via HTTP.
      console.log(bucket.name);
      console.log(blob.name);
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const albumBody = { name, artist_id, publicUrl };

      const albumCache = await cache.getAlbum(albumId);
      const albumsCache = await cache.getAllAlbums();
      if (albumCache != null) {
        global.log.debug('borrando datos de cache');
        await cache.deleteAlbum(albumId);
      }
      if (albumsCache != null) {
        global.log.debug('borrando datos de cache');
        await cache.deleteAlbum();
      }

      await queries.updateAlbum(albumId, albumBody);

      global.log.info(`Album actualizado`);
      res.status(200).json({
        mensaje: 'Album actualizado correctamente',
        status: true,
      });
    });
    blobStream.end(Buffer.from(cover_image, 'base64'));
  } catch (error) {
    global.log.error(`Error al actualizar album`);
    console.log(error);
    return res.status(400).json({
      mensaje: 'Error en el servidor. Contacte con el administrador.',
      status: false,
    });
  }
};


const reporteArtistas = async (req, res = response) => {
  try {

    const reporte = await queries.reporteArtistas();
    global.log.info('Reporte de artistas enviado');
    res.status(200).json({
      status: true,
      reporte
    })
  } catch (error) {
    global.log.error('Error al obtener reporte de artistas');
    return res.status(400).json({
      mensaje: 'Error en el servidor.',
      correcto: false,
    })
  }
}


const reporteAlbums = async (req, res = response) => {
  try {

    const reporte = await queries.reporteAlbums();
    global.log.info('Reporte de albums enviado');
    res.status(200).json({
      status: true,
      reporte
    })
  } catch (error) {
    global.log.error('Error al obtener reporte de albums');
    return res.status(400).json({
      mensaje: 'Error en el servidor.',
      correcto: false,
    })
  }
}


module.exports = {
  createArtist,
  getArtists,
  createAlbum,
  getAlbums,
  getOneAlbum,
  getOneArtist,
  deleteArtist,
  deleteAlbum,
  updateAlbum,
  reporteArtistas,
  reporteAlbums
};
