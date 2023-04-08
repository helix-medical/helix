CREATE DATABASE IF NOT EXISTS helix;

CREATE TABLE
    `helix`.`patients` (
        `id` VARCHAR(8) NOT NULL,
        `name` TEXT NOT NULL,
        `lastName` TEXT NOT NULL,
        `birthDate` TEXT NOT NULL,
        `sex` TINYTEXT NOT NULL,
        `email` TEXT NOT NULL,
        `city` TEXT NOT NULL,
        `nextApp` TEXT,
        `passif` JSON NOT NULL,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `helix`.`appointments` (
        `id` VARCHAR(8) NOT NULL,
        `patientId` VARCHAR(8) NOT NULL,
        `date` TEXT NOT NULL,
        `reasons` TEXT NOT NULL,
        `anamnesis` TEXT NOT NULL,
        `conclusion` TEXT NOT NULL,
        `status` TEXT NOT NULL,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `helix`.`users` (
        `uid` VARCHAR(8) NOT NULL,
        `name` TEXT NOT NULL,
        `lastName` TEXT NOT NULL,
        `role` TEXT NOT NULL,
        `state` TEXT NOT NULL,
        `password` TEXT NOT NULL,
        `clearPassword` TEXT NOT NULL,
        `refreshToken` TEXT,
        `lastActive` TEXT NOT NULL,
        PRIMARY KEY (`uid`)
    );

CREATE TABLE
    `helix`.`accounting` (
        `uid` VARCHAR(8) NOT NULL,
        `amount` INT NOT NULL,
        `patientId` VARCHAR(8) NOT NULL,
        `method` TEXT NOT NULL,
        `date` TEXT NOT NULL,
        PRIMARY KEY (`uid`)
    );