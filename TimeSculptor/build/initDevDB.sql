-- Used to initialize a dev database
-- Not intended for production use
-- Do not run this directly, use db_init.sh instead
-- Make sure to use password for root user in db_init.sh
-- DDL Statements
-- --------------
DROP DATABASE IF EXISTS dev_db;
CREATE DATABASE IF NOT EXISTS dev_db;

CREATE USER IF NOT EXISTS 'dev'@'localhost' IDENTIFIED BY 'TimeSculptor';
GRANT ALL PRIVILEGES ON dev_db.* TO 'dev'@'localhost';

USE dev_db;

CREATE TABLE IF NOT EXISTS Credential (
   username VARCHAR(128) PRIMARY KEY NOT NULL,
   password VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS Schedule (
   schedule_name VARCHAR(128) PRIMARY KEY NOT NULL,
   username VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS Event (
   schedule_name VARCHAR(128) NOT NULL,
   id VARCHAR(128) PRIMARY KEY NOT NULL,
   event VARCHAR(256)
);

INSERT IGNORE INTO Credential
SET   username = 'admin',
      password = 'password';

INSERT IGNORE INTO Schedule
SET   schedule_name  = 'testing',
      username       = 'admin';

INSERT IGNORE INTO Event
SET   schedule_name  = 'testing',
      id             = '1',
      event          = 'placeholder';