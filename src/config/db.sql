DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS projects;

CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE projects (
    uid SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL UNIQUE,
    description VARCHAR(300) NOT NULL,
    imgurl VARCHAR(300) NOT NULL
);

INSERT INTO users (email, password, username)
VALUES ('test1@test.com', '123123', 'Test1');

SELECT * FROM users;