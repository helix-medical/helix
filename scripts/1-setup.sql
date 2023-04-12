CREATE DATABASE IF NOT EXISTS helix;

CREATE TABLE
    `helix`.`patients` (
        `id` VARCHAR(8) NOT NULL,
        `name` VARCHAR(80) NOT NULL,
        `lastName` VARCHAR(80) NOT NULL,
        `birthDate` VARCHAR(16) NOT NULL,
        `sex` VARCHAR(1) NOT NULL,
        `email` VARCHAR(150) NOT NULL,
        `city` VARCHAR(80) NOT NULL,
        `passif` JSON NOT NULL,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `helix`.`users` (
        `uid` VARCHAR(8) NOT NULL,
        `name` VARCHAR(80) NOT NULL,
        `lastName` VARCHAR(80) NOT NULL,
        `role` VARCHAR(12) NOT NULL,
        `state` VARCHAR(16) NOT NULL,
        `password` TEXT NOT NULL,
        `refreshToken` TEXT,
        `lastActive` VARCHAR(20) NOT NULL,
        PRIMARY KEY (`uid`)
    );

CREATE TABLE
    `helix`.`appointments` (
        `id` VARCHAR(8) NOT NULL,
        `patientId` VARCHAR(8) NOT NULL,
        `date` VARCHAR(16) NOT NULL,
        `kind` VARCHAR(16) NOT NULL,
        `content` JSON NOT NULL,
        `status` VARCHAR(10) NOT NULL,
        `payment` VARCHAR(8),
        `practitioner` VARCHAR(8) NOT NULL,
        PRIMARY KEY (`id`),
        FOREIGN KEY (`patientId`) REFERENCES `helix`.`patients`(`id`) ON DELETE CASCADE,
        FOREIGN KEY (`practitioner`) REFERENCES `helix`.`users`(`uid`) ON DELETE RESTRICT
    );

CREATE TABLE
    `helix`.`accounting` (
        `uid` VARCHAR(8) NOT NULL,
        `amount` INT NOT NULL,
        `method` VARCHAR(10) NOT NULL,
        `date` VARCHAR(10) NOT NULL,
        `appointment` VARCHAR(8),
        PRIMARY KEY (`uid`),
        FOREIGN KEY (`appointment`) REFERENCES `helix`.`appointments`(`id`) ON DELETE
        SET NULL
    );

SELECT * FROM helix.patients;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';

FLUSH PRIVILEGES;