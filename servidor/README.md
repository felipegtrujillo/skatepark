npm install 

levantar el servidor con npm run start

CREATE DATABASE skatepark;

<!-- para gestionar los skaters se crea una tabla skaters con los datos de los skaters -->

CREATE TABLE skaters (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  nombre VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  anos_experiencia INT NOT NULL,
  especialidad VARCHAR(50) NOT NULL,
  foto VARCHAR(255) NOT NULL,
  estado BOOLEAN NOT NULL
);

<!-- para gestionar la administracion se crea una tabla admin con los administradores del sitio y los estado de los skater -->

CREATE TABLE admin (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  nombre VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL
);

<!-- Insertar un registro de ejemplo de ADMIN -->
INSERT INTO admin (email, nombre, password)
VALUES ('admin@email.com', 'Admin', 'admin123');



