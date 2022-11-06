USE SoundStream;

CREATE TABLE card(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
number VARCHAR(250) NOT NULL,
last_number VARCHAR(250) NOT NULL,
cvv VARCHAR(250) NOT NULL,
exp_date DATE NOT NULL,
balance INT NOT NULL
);
-- DROP TABLE card;

CREATE TABLE client(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(500) NOT NULL,
email VARCHAR(500) NOT NULL UNIQUE,
password VARCHAR(250) NOT NULL,
card_id INT,
subscription bool default false,
gravatar VARCHAR(500) NOT NULL,
FOREIGN KEY (card_id) REFERENCES card(id)
);
-- DROP TABLE client;

CREATE TABLE artist(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
artist VARCHAR(500) NOT NULL
);
-- DROP TABLE artist;

CREATE TABLE album(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(500) NOT NULL,
artist_id INT NOT NULL,
cover_image VARCHAR(500) NOT NULL,
FOREIGN KEY (artist_id) REFERENCES artist(id)
);
-- DROP TABLE album;

CREATE TABLE song(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(500) NOT NULL,
album_id INT NOT NULL,
file VARCHAR(500) NOT NULL,
cover_image VARCHAR(500) NOT NULL,
duration INT NOT NULL,
FOREIGN KEY (album_id) REFERENCES album(id)
);
-- DROP TABLE song;

CREATE TABLE playlist(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
client_id INT NOT NULL,
FOREIGN KEY (client_id) REFERENCES client(id)
);
-- DROP TABLE playlist;

CREATE TABLE playlist_song(
playlist_id INT NOT NULL,
song_id INT NOT NULL,
PRIMARY KEY (playlist_id, song_id),
FOREIGN KEY (playlist_id) REFERENCES playlist(id),
FOREIGN KEY (song_id) REFERENCES song(id)
);
-- DROP TABLE playlist_song;

CREATE TABLE email_code(
	email VARCHAR(500) PRIMARY KEY NOT NULL,
    code INT NOT NULL,
    FOREIGN KEY (email) REFERENCES client(email)
);
-- DROP TABLE email_code;

CREATE TABLE history(
	client_id  INT NOT NULL,
    song_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(id),
    FOREIGN KEY (song_id) REFERENCES song(id)
);
-- DROP TABLE history;

CREATE TABLE favorite(
	client_id  INT NOT NULL,
    song_id INT NOT NULL,
    PRIMARY KEY ( client_id, song_id),
    FOREIGN KEY (client_id) REFERENCES client(id),
    FOREIGN KEY (song_id) REFERENCES song(id)
);
-- DROP TABLE favorite;

