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

INSERT INTO projects (title, description, imgurl) VALUES ('Construccion Terraza', 'Construccion terraza y quincho', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbl00OZ12aMJzxIU9yR4_3SrnlidhNfRo8Q&s');
INSERT INTO projects (title, description, imgurl) VALUES ('Remodelacion cocina', 'Se moderniza cocina', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbl00OZ12aMJzxIU9yR4_3SrnlidhNfRo8Q&s');

SELECT * FROM projects;