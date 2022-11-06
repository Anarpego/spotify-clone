USE SoundStream;

DROP PROCEDURE  IF EXISTS favorite_playlist;
DELIMITER  //
CREATE PROCEDURE  `favorite_playlist` ( id INT )
BEGIN
	-- ID: ID de cliente al que corresponden la lista de favoritos
	SELECT song.*, TRUE FROM song
    INNER JOIN favorite
    ON song.id = favorite.song_id
    WHERE favorite.client_id = id;
END//
DELIMITER ;

-- call favorite_playlist(1);


-- GEL ALL CANCIONES + FAVORITAS
DROP PROCEDURE  IF EXISTS radio_song_fav;
DELIMITER  //
CREATE PROCEDURE  `radio_song_fav` ( id INT )
BEGIN
	-- ID: ID correspondiente al cliente
    -- Devuelve las canciones de la playlist seleccionada, identificando si las canciones favoritas
	SELECT song.*, fav.song_fav FROM song
	LEFT JOIN (SELECT *, TRUE AS song_fav FROM favorite WHERE client_id = id) fav
    ON fav.song_id = song.id;
END//
DELIMITER ;

-- call radio_song_fav(1);


DROP PROCEDURE  IF EXISTS single_song_fav;
DELIMITER  //
CREATE PROCEDURE  `single_song_fav` ( id_client INT, id_song INT )
BEGIN
	-- ID_CLIENTE: ID correspondiente al Cliente
	-- ID_SONG: ID correspondiente a la Cancion
    -- Devuelve la cancion identificando si es favorita o no
	SELECT song.*, fav.song_fav FROM song
	LEFT JOIN (SELECT *, TRUE AS song_fav FROM favorite WHERE client_id = id_client) fav
    ON fav.song_id = song.id
    WHERE song.id = id_song;
END//
DELIMITER ;

-- call single_song_fav(2,3);


DROP PROCEDURE  IF EXISTS create_verify_code;
DELIMITER  //
CREATE PROCEDURE  `create_verify_code` ( email VARCHAR(500), code INT )
BEGIN
	DECLARE count INT;
	SET count = ( SELECT count(*) FROM email_code WHERE email_code.email = email );
    
    IF !count THEN
		INSERT INTO email_code VALUES (email, code);
	ELSE
		UPDATE email_code SET email_code.code = code WHERE email_code.email = email;
    END IF;
END//
DELIMITER ;


DROP PROCEDURE  IF EXISTS delete_card;
DELIMITER  //
CREATE PROCEDURE  `delete_card` ( id INT )
BEGIN
	DECLARE card_id INT;
	SET card_id = ( SELECT client.card_id FROM client WHERE client.id = id );
    
    UPDATE client SET client.card_id = null WHERE client.id = id;
    
    DELETE FROM card WHERE card.id = card_id;
END//
DELIMITER ;

DROP PROCEDURE  IF EXISTS subscription;
DELIMITER  //
CREATE PROCEDURE  `subscription` ( id INT )
BEGIN
	DECLARE card_id INT;
	SET card_id = ( SELECT client.card_id FROM client WHERE client.id = id );
    
    IF ( SELECT card.balance FROM card WHERE card.id = card_id ) >= 200 THEN
		UPDATE card SET card.balance = (card.balance - 200) WHERE  card.id = card_id;
        UPDATE client SET subscription =  true WHERE client.id = id;
    END IF;
END//
DELIMITER ;

DROP PROCEDURE  IF EXISTS delete_client_card;
DELIMITER  //
CREATE PROCEDURE  `delete_client_card` ( id INT )
BEGIN
	DECLARE card_id INT;
	SET card_id = ( SELECT client.card_id FROM client WHERE client.id = 1 );
    
    DELETE FROM client WHERE client.id = id;
    IF card_id THEN
		DELETE FROM card WHERE card.id = card_id;
    END IF;
    
END//
DELIMITER ;


DROP PROCEDURE  IF EXISTS favorite_song;
DELIMITER  //
CREATE PROCEDURE  `favorite_song` (id_client INT, id_song INT)
BEGIN
	DECLARE var INT;
    SET var = (SELECT count(*) FROM favorite WHERE favorite.client_id = id_client AND favorite.song_id = id_song);
	IF NOT var THEN 
		INSERT INTO favorite VALUES (id_client, id_song);
        SELECT TRUE;
	ELSE
		DELETE FROM favorite WHERE favorite.client_id = id_client AND favorite.song_id = id_song;
        SELECT FALSE;
    END IF;
END//
DELIMITER ;

-- CALL favorite_song(1,3);