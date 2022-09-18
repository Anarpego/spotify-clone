const pool = require('./config');
/* eslint-disable */
const deleteSong = (id) => {
  return new Promise((resolve, reject) => {
    const query = `delete from song where id = ${id}`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const getOneSong = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select * from song where id = ${id}`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};
const getSongs = () => {
  return new Promise((resolve, reject) => {
    const query = `select * from song`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};
const createSong = (songBody) => {
  const { name, album_id, publicUrlAudio, publicUrl } = songBody;
  return new Promise((resolve, reject) => {
    const query = `insert into song(name, album_id, file, cover_image) values ("${name}",${album_id},"${publicUrlAudio}","${publicUrl}")`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const updateSong = (songId, songBody) => {
  const { name, album_id, publicUrlAudio, publicUrl } = songBody;
  return new Promise((resolve, reject) => {
    const query = `update song set name = "${name}", album_id = ${album_id}, file = "${publicUrlAudio}", cover_image = "${publicUrl}" where id = ${songId}`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const getSongsByAlbum = (idAlbum) => {
  return new Promise((resolve, reject) => {
    const query = `select song.id, song.name, song.album_id, song.file, song.cover_image
         from song inner join album on album.id = song.album_id where album.id = ${idAlbum}`;
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

const getOneArtist = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select * from artist where id = ${id}`;
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};


const reporteCanciones = () => {
  return new Promise((resolve, reject) => {
    const query = 'call reporte_canciones()';
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}

const guardarHistorial = (historialBody) => {
  const { client_id, song_id } = historialBody;
  return new Promise ( ( resolve, reject) =>{
    const query = `insert into history (client_id, song_id) values ( ${client_id} ,${song_id} )`
    pool.query(query, (err, res) =>{
      if (err) reject (err);
      resolve(res);
    })
  })
}

const onRepeat = (id) => {
  return new Promise((resolve, reject) => {
    const query = `WITH data as (
        select song_id, count(*) as count
        from history
        where client_id = ${id}
        group by song_id)
        SELECT s.id, s.name, s.album_id, s.file, s.cover_image, d.count
      from data as d
      join song s on s.id = d.song_id
      order by d.count desc`;

    pool.query(query, (err, res) => {
      if(err) reject(err);
      resolve(res);
    })
  })
}

const getFavorites = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select s.id, s.name, s.album_id, s.file, s.cover_image
      from favorite
      join song s on favorite.song_id = s.id
      where client_id = ${id}`;

    pool.query(query, (err, res) => {
      if(err) reject(err);
      resolve(res);
    })
  })
}

const reporteArtistasConMasMinutosDeReproduccion = () => {
  return new Promise((resolve, reject) => {
    const query = 'call reporte_reproduccion_artista()';
    pool.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  })
}

const getHistorial = (idCliente) => {
  return new Promise((resolve, reject) => {
    const query = `select song.name, SUM(song.duration)/60 AS total from song
                    INNER JOIN history
                    ON history.song_id = song.id AND history.client_id = ${idCliente}
                    group by song.name
                    order by total DESC`;

    pool.query(query, (err, res) => {
      if(err) reject(err);
      resolve(res);
    })
  })
}

const favoriteSong = (clientId, songId) => {
  return new Promise((resolve, reject) => {
    const query = `call favorite_song(${clientId}, ${songId})`;
    pool.query(query, (err, res) => {
      if(err) reject(err);
      resolve(res);
    })
  })
}

const queries = {
  createSong,
  getSongs,
  getOneSong,
  getSongsByAlbum,
  deleteSong,
  getOneAlbum,
  getOneArtist,
  updateSong,
  onRepeat,
  reporteCanciones,
  guardarHistorial,
  getFavorites,
  reporteArtistasConMasMinutosDeReproduccion,
  getHistorial,
  favoriteSong
};

module.exports = {
  queries,
};
