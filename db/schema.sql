CREATE DATABASE project2db;
\c project2db;

-- //when pushing to horoku comment out /c from here and above 

DROP TABLE IF EXISTS places;

CREATE TABLE places (
  id SERIAL PRIMARY KEY UNIQUE,
  name VARCHAR(255)
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  rest_id INTEGER REFERENCES places(id),
  comment TEXT
);