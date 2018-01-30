CREATE DATABASE project2db;
\c project2db;

-- //when pushing to horoku comment out /c from here and above 

DROP TABLE IF EXISTS places;

CREATE TABLE places (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);