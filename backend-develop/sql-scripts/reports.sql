USE SoundStream;

DROP PROCEDURE  IF EXISTS reporte_canciones ;
DELIMITER  //
CREATE PROCEDURE  `reporte_canciones` ()
BEGIN
	select song.name, count(*) AS total from song
    INNER JOIN history
    ON history.song_id = song.id
    group by song.name
    order by total DESC
    LIMIT 5;
END//
DELIMITER ;

-- call reporte_canciones();


DROP PROCEDURE  IF EXISTS reporte_album;
DELIMITER  //
CREATE PROCEDURE  `reporte_album` ()
BEGIN
	select album.name, count(*) AS total from song
    INNER JOIN history
    ON history.song_id = song.id
    INNER JOIN album
    ON song.album_id = album.id
    group by album.name
    order by total DESC
    LIMIT 5;
END//
DELIMITER ;

-- call reporte_album();


DROP PROCEDURE  IF EXISTS reporte_artista;
DELIMITER  //
CREATE PROCEDURE  `reporte_artista` ()
BEGIN
	select artist.artist, count(*) AS total from song
    INNER JOIN history
    ON history.song_id = song.id
    INNER JOIN album
    ON song.album_id = album.id
    INNER JOIN artist
    ON album.artist_id = artist.id
    group by artist.artist
    order by total DESC
    LIMIT 5;
END//
DELIMITER ;

-- call reporte_artista();


DROP PROCEDURE  IF EXISTS reporte_reproduccion_artista;
DELIMITER  //
CREATE PROCEDURE  `reporte_reproduccion_artista` ()
BEGIN
	select artist.artist, SUM(song.duration)/60 AS total from song
    INNER JOIN history
    ON history.song_id = song.id
    INNER JOIN album
    ON song.album_id = album.id
    INNER JOIN artist
    ON album.artist_id = artist.id
    group by artist.artist
    order by total DESC
    LIMIT 5;
END//
DELIMITER ;

-- call reporte_reproduccion_artista();
