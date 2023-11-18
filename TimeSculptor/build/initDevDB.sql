-- Used to initialize a dev database
-- Not intended for production use
-- Do not run this directly, use db_init.sh instead
-- Make sure to use password for root user in db_init.sh
-- DDL Statements
-- --------------
-- DROP DATABASE IF EXISTS dev_db;
CREATE DATABASE IF NOT EXISTS dev_db;
CREATE USER IF NOT EXISTS 'dev'@'localhost' IDENTIFIED BY 'TimeSculptor';
GRANT ALL PRIVILEGES ON dev_db.* TO 'dev'@'localhost';
USE dev_db;
CREATE TABLE Credential (
   username VARCHAR(128) NOT NULL,
   password VARCHAR(128) NOT NULL
);
INSERT INTO Credential
SET username = 'admin',
   password = 'password';