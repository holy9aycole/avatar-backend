DROP DATABASE IF EXISTS avatar_five;
CREATE DATABASE avatar_five DEFAULT CHARACTER SET latin1;
USE avatar_five;

CREATE TABLE brand (
    brand_name VARCHAR(100) NOT NULL, -- Nombre de la marca
    brand_co2 DECIMAL(5, 2) NOT NULL, -- gramos de CO2 emitido por marca de coche,
    PRIMARY KEY(brand_name)
);

CREATE TABLE car (
    car_id CHAR(21) NOT NULL, -- Id del coche
    car_driver CHAR(100) NOT NULL, -- Nombre del conductor del coche
    car_registration CHAR(10) NOT NULL, -- Numero de matricula del coche
    brand_name CHAR(100) NOT NULL, -- Nombre de la marca del coche
    car_km DECIMAL(50, 5) NOT NULL, -- Kilometro recorridos por el coche al año
    car_lifetime INT NOT NULL, -- Tiempo de vida del coche desde que se fabrico hasta ahora
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha del registro
    PRIMARY KEY(car_id),
    CONSTRAINT fk_brand_car FOREIGN KEY (brand_name) REFERENCES brand (brand_name)
);

CREATE TABLE forecast (
    forecast_id CHAR(6) NOT NULL, -- Id del resultado del pronóstico de co2
    forecast_co2 DECIMAL(10, 3) NOT NULL, -- gramos de co2 emitidos por un coche al año
    car_id CHAR(10) NOT NULL, -- Numero de matricula del coche
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha de realizacion del pronostico
    PRIMARY KEY(forecast_id),
    CONSTRAINT fk_forecast_car FOREIGN KEY (car_id) REFERENCES car (car_id)
);

-- Insersion de datos --
INSERT INTO brand (brand_name, brand_co2)
    VALUES ("Toyota", 99.9), ("Mercedez", 132), ("Lexus", 145), ("Coaster Toyota", 178),
           ("Iveco", 270);
