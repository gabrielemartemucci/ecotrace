-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Nov 16, 2024 alle 15:35
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ecotrace';
FLUSH PRIVILEGES;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecotrace`
--
CREATE DATABASE IF NOT EXISTS `ecotrace` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ecotrace`;

-- --------------------------------------------------------

--
-- Struttura della tabella `co2_emissions`
--

CREATE TABLE `co2_emissions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `co2_emission` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `factors`
--

CREATE TABLE `factors` (
  `id` int(11) NOT NULL,
  `factor` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `co2_emission` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `factors`
--

INSERT INTO `factors` (`id`, `factor`, `type`, `co2_emission`) VALUES
(1, 'Bicicletta non elettrica', 'Trasporti', 0),
(2, 'Monopattino non elettrico', 'Trasporti', 0),
(3, 'Bicicletta elettrica', 'Trasporti', 10),
(4, 'Monopattino elettrico', 'Trasporti', 20),
(5, 'Auto a benzina', 'Trasporti', 192),
(6, 'Auto a GPL', 'Trasporti', 120),
(7, 'Auto a metano', 'Trasporti', 100),
(8, 'Auto a diesel', 'Trasporti', 171),
(9, 'Auto elettrica', 'Trasporti', 60),
(10, 'Veicolo commerciale leggero', 'Trasporti', 200),
(11, 'Camion', 'Trasporti', 250),
(12, 'Bus urbano', 'Trasporti', 104),
(13, 'Bus extraurbano', 'Trasporti', 27),
(14, 'Filobus', 'Trasporti', 46),
(15, 'Ciclomotore', 'Trasporti', 72),
(16, 'Motociclo', 'Trasporti', 100),
(17, 'Aereo su tratti brevi', 'Trasporti', 254),
(18, 'Aereo su tratti medi', 'Trasporti', 195),
(19, 'Aereo su tratti lunghi', 'Trasporti', 150),
(20, 'Nave', 'Trasporti', 100),
(21, 'Treno non ad alta velocità', 'Trasporti', 40),
(22, 'Treno ad alta velocità', 'Trasporti', 20),
(23, 'Metropolitana', 'Trasporti', 20),
(24, 'Consumo italiano', 'Energia', 200),
(25, 'Manzo', 'Cibo', 70000),
(26, 'Agnello', 'Cibo', 45000),
(27, 'Maiale', 'Cibo', 8500),
(28, 'Pollo', 'Cibo', 6000),
(29, 'Tacchino', 'Cibo', 6000),
(30, 'Pesce', 'Cibo', 3500),
(31, 'Latte', 'Cibo', 1150),
(32, 'Formaggio', 'Cibo', 10500),
(33, 'Riso', 'Cibo', 4500),
(34, 'Frumento', 'Cibo', 1150),
(35, 'Legumi', 'Cibo', 600),
(36, 'Frutta', 'Cibo', 1500),
(37, 'Verdura', 'Cibo', 1100),
(38, 'Caffè', 'Cibo', 3500),
(39, 'Vino', 'Cibo', 2150),
(40, 'Olio d\'oliva', 'Cibo', 2500),
(41, 'Pasta secca', 'Cibo', 1900),
(42, 'Pasta fresca', 'Cibo', 2250),
(43, 'Pane', 'Cibo', 1500),
(44, 'Pizza', 'Cibo', 3750),
(45, 'Cioccolato', 'Cibo', 11000),
(46, 'Patate', 'Cibo', 550),
(47, 'Patatine fritte', 'Cibo', 2500),
(48, 'Uova', 'Cibo', 2500),
(49, 'Biscotti', 'Cibo', 650),
(50, 'Focaccia barese', 'Cibo', 1000);

-- --------------------------------------------------------

--
-- Struttura della tabella `personal_vehicles`
--

CREATE TABLE `personal_vehicles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `co2_emission` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `suggestions`
--

CREATE TABLE `suggestions` (
  `id` int(11) NOT NULL,
  `suggestion` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `suggestions`
--

INSERT INTO `suggestions` (`id`, `suggestion`) VALUES
(1, 'Vai a piedi nei tratti brevi!'),
(2, 'Passa ad un\'auto ibrida o elettrica!'),
(3, 'Cerca di ottimizzare i percorsi e utilizza veicoli a basse emissioni!'),
(4, 'Ottimo! Cerca di incentivare i tuoi conoscenti a prendere il bus con te!'),
(5, 'Cerca di utilizzare il treno per i tratti brevi!'),
(6, 'Scegli i voli diretti!'),
(7, 'Ottimizza le rotte!'),
(8, 'Scegli l\'alta velocità!'),
(9, 'Ottimo! Cerca di incentivare i tuoi conoscenti a prendere il treno con te!'),
(10, 'Ottimo! Cerca di incentivare i tuoi conoscenti a prendere la metro con te!'),
(11, 'Ricordati di spegnere la luce quando non serve!'),
(12, 'Riduci il consumo di carne!'),
(13, 'Riduci il consumo di formaggio!'),
(14, 'Riduci il consumo di cioccolato!');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `co2_emissions`
--
ALTER TABLE `co2_emissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FOREIGN` (`user_id`);

--
-- Indici per le tabelle `factors`
--
ALTER TABLE `factors`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `personal_vehicles`
--
ALTER TABLE `personal_vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FOREIGN` (`user_id`);

--
-- Indici per le tabelle `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `co2_emissions`
--
ALTER TABLE `co2_emissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `factors`
--
ALTER TABLE `factors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT per la tabella `personal_vehicles`
--
ALTER TABLE `personal_vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `suggestions`
--
ALTER TABLE `suggestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `co2_emissions`
--
ALTER TABLE `co2_emissions`
  ADD CONSTRAINT `user_id_ce` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `personal_vehicles`
--
ALTER TABLE `personal_vehicles`
  ADD CONSTRAINT `user_id_pv` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
