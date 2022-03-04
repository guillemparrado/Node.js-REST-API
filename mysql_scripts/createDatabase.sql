-- Cal executar cada cop que es modifiqui l'estructura d'alguna taula a app/models (sinó, mysql té taula preexistent amb estructura diferent i execució d l'app dona error amb nova estructura quan el problema no és de l'app)

DROP database /*if EXISTS*/ DiceGame;

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