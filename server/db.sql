-- Create the database
CREATE DATABASE TravelManagement;

USE TravelManagement;

-- Table for accommodations
CREATE TABLE Accommodations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('flight', 'train', 'car') NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    schedule DATE NOT NULL,
    seats INT NOT NULL
);

-- Table for booked tickets
CREATE TABLE Bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    type ENUM('flight', 'train', 'car') NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    accommodation_id INT,
    FOREIGN KEY (accommodation_id) REFERENCES Accommodations(id)
);
