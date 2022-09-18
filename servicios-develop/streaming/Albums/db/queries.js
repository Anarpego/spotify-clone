const pool = require('./config');
/* eslint-disable */
const deleteArtist = (id) => {
  return new Promise((resolve, reject) => {
    const query = `delete from artist where id = ${id}`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const getOneArtist = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select * from artist where id = ${id}`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const getArtists = () => {
  return new Promise((resolve, reject) => {
    const query = `select * from artist`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};
const createArtist = (artistBody) => {
  const { artist } = artistBody;
  return new Promise((resolve, reject) => {
    const query = `insert into artist(artist) values ("${artist}")`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const deleteAlbum = (id) => {
  return new Promise((resolve, reject) => {
    const query = `delete from album where id = ${id}`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const getOneAlbum = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select * from album where id = ${id}`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const getAlbums = () => {
  return new Promise((resolve, reject) => {
    const query = `select * from album`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};
const createAlbum = (albumBody) => {
  const { name, artist_id, publicUrl } = albumBody;
  return new Promise((resolve, reject) => {
    const query = `insert into album(name, artist_id, cover_image) values ("${name}",${artist_id},"${publicUrl}")`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const updateAlbum = (albumId, albumBody) => {
  const { name, artist_id, publicUrl } = albumBody;
  return new Promise((resolve, reject) => {
    const query = `update album set name = "${name}", artist_id = ${artist_id}, cover_image = "${publicUrl}" where id = ${albumId}`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};


const reporteArtistas = () =>{
  return new Promise((resolve, reject) =>{
    const query = 'call reporte_artista()';
    pool.query(query, (err, res) =>{
      if(err) reject(err);
      resolve(res);
    })
  })
}

const reporteAlbums = () =>{
  return new Promise((resolve, reject) =>{
    const query = 'call reporte_album()';
    pool.query(query, (err, res) =>{
      if(err) reject(err);
      resolve(res);
    })
  })
}
const queries = {
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

module.exports = {
  queries,
};
