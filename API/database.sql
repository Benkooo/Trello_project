CREATE DATABASE IF NOT EXISTS trello;
USE trello;

CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) UNIQUE COLLATE utf8_bin NOT NULL,
    email varchar(255) UNIQUE COLLATE utf8_bin NOT NULL,
    password varchar(255) COLLATE utf8_bin NOT NULL
);
