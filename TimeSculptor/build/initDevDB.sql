-- Used to initialize a dev database
-- Not intended for production use
-- Do not run this directly, use db_init.sh instead
-- Make sure to use the password for the root user in db_init.sh
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
   schedule_name VARCHAR(128) NOT NULL,
   username VARCHAR(128) NOT NULL,
   sched_id INT NOT NULL AUTO_INCREMENT,
   PRIMARY KEY (sched_id),
   UNIQUE KEY (schedule_name, username)
);
CREATE TABLE IF NOT EXISTS Event (
   sched_id INT NOT NULL,
   id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   title VARCHAR(128),
   dateAndTime DATETIME,
   duration INT,
   color VARCHAR(64),
   icon VARCHAR(64),
   FOREIGN KEY (sched_id)
      REFERENCES Schedule(sched_id)
      ON DELETE CASCADE
);
INSERT IGNORE INTO Credential
SET username = 'admin',
   password = 'password';
INSERT IGNORE INTO Schedule
SET schedule_name = 'testing',
   username = 'admin';

