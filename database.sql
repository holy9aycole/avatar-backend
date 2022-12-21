DROP DATABASE IF EXISTS avatar_five;
CREATE DATABASE avatar_five DEFAULT CHARACTER SET latin1;
USE avatar_five;

CREATE TABLE brand (
    brand_name VARCHAR(100) NOT NULL, -- Nombre de la marca
    brand_co2 DECIMAL(7, 2) NOT NULL, -- gramos de CO2 emitido por marca de coche,
    PRIMARY KEY(brand_name)
);

CREATE TABLE project (
    period CHAR(20) NOT NULL, -- Periodo del actuacion del proyecto. Por ej: 2020-2021
    PRIMARY KEY(period)
);

CREATE TABLE car (
    car_id CHAR(21) NOT NULL, -- Id del coche
    car_driver CHAR(100) NOT NULL, -- Nombre del conductor del coche
    car_registration CHAR(10) NOT NULL, -- Numero de matricula del coche
    brand_name CHAR(100) NOT NULL, -- Nombre de la marca del coche
    car_km INT NOT NULL, -- Kilometro recorridos por el coche al año
    period CHAR(20) NOT NULL, -- Periodo del actuacion del proyecto. Por ej: 2020-2021
    forecast_co2 INT NOT NULL, -- gramos de co2 emitidos por un coche al año
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha del registro
    PRIMARY KEY(car_id),
    CONSTRAINT fk_brand_car FOREIGN KEY (brand_name) REFERENCES brand (brand_name),
    CONSTRAINT fk_project_car FOREIGN KEY (period) REFERENCES project (period)
);

CREATE TABLE user (
    id CHAR(11) NOT NULL,
    name CHAR(100) NOT NULL,
    surname CHAR(100) NOT NULL,
    type ENUM("ITV", "MA") NOT NULL,
    email CHAR(100) NOT NULL,
    password CHAR(60) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- Insersion de datos --
INSERT INTO project (period) VALUES ("2019-2020"), ("2020-2021"), ("2021-2022"), ("2022-2023");

INSERT INTO brand (brand_name, brand_co2)
    VALUES ("TOYOTA", 99.9), ("MERCEDES", 132), ("LEXUS", 145), ("COASTER", 178),
           ("IVECO", 270), ("NISSAN", 316), ("BMW", 1458), ("AUDI", 141), ("MITSUBISHI", 115), ("PORCHE", 251);

INSERT INTO user (id, name, surname, type, email, password) VALUES ("123456789", "Nacho", "Mecha", "ITV", "kitty@gmail.com", "$2b$10$y7IzEbfwzVSEimkGZI/FlOqEFCAY3r.I5.wzOZbXusPS3iz6ahSM6");
