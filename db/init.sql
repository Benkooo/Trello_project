CREATE DATABASE IF NOT EXISTS trello;
USE trello;

CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) UNIQUE COLLATE utf8_bin NOT NULL,
    email varchar(255) UNIQUE COLLATE utf8_bin NOT NULL,
    password varchar(255) COLLATE utf8_bin NOT NULL,
    unique_login varchar(255) UNIQUE COLLATE utf8_bin NOT NULL
);

CREATE TABLE IF NOT EXISTS teams (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    team_name varchar(255) COLLATE utf8_bin NOT NULL,
    user_id int(11) NOT NULL,
    unique_id varchar(255) COLLATE utf8_bin NOT NULL
);

CREATE TABLE IF NOT EXISTS personal (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int(11) NOT NULL,
    unique_id varchar(255) COLLATE utf8_bin NOT NULL
);

CREATE TABLE IF NOT EXISTS user_boards (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    board_id int(11) NOT NULL,
    unique_id varchar(255) COLLATE utf8_bin NOT NULL,
    team BIT,
    starred BIT
);

CREATE TABLE IF NOT EXISTS boards (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    board_name varchar(255) COLLATE utf8_bin NOT NULL,
    bg_color varchar(255) COLLATE utf8_bin,
    url varchar(255) UNIQUE COLLATE utf8_bin NOT NULL
);

CREATE TABLE IF NOT EXISTS labels (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    color varchar(255) COLLATE utf8_bin NOT NULL,
    text varchar(255) COLLATE utf8_bin NOT NULL,
    board_id int(11) NOT NULL
);

CREATE TABLE IF NOT EXISTS board_data (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    board_id int(11) UNIQUE NOT NULL,
    json varchar(MAX) COLLATE utf8_bin NOT NULL
);
