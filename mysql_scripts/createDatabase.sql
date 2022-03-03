DROP database if EXISTS DiceGame;

CREATE DATABASE DiceGame CHARACTER
SET
    utf8mb4;

USE DiceGame;

/*
CREATE TABLE
    player (
        id INT PRIMARY key AUTO_INCREMENT,
        name VARCHAR(30),
        creation_date DATE not null,
        percentatge_exit FLOAT not null
    );

CREATE TABLE
    game(

        dice1 TINYINT NOT NULL,
        dice2 TINYINT NOT NULL,
        won BOOLEAN not null,
        -- + PK
        -- + FK a player
    )

*/