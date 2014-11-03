-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 21. Okt 2014 um 21:34
-- Server Version: 5.5.27
-- PHP-Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `kickertunier`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_1` int(11) NOT NULL,
  `team_2` int(11) NOT NULL,
  `result` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `winner_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_1` (`team_1`,`team_2`),
  KEY `winner_id` (`winner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `teams`
--

CREATE TABLE IF NOT EXISTS `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_1` int(11) NOT NULL,
  `player_2` int(11) NOT NULL,
  `teamname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `player_1` (`player_1`,`player_2`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=42 ;

--
-- Daten für Tabelle `teams`
--

INSERT INTO `teams` (`id`, `user_1_id`, `user_2_id`, `teamname`) VALUES
(40, 56, 57, 'Musterteam'),
(41, 58, 59, 'Vollenergie');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `secondname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nickname` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=60 ;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `firstname`, `secondname`, `nickname`) VALUES
(56, 'Paula', 'Vollwert', 'PaulaV'),
(57, 'Paul', 'Vollwert', 'PaulV'),
(58, 'Ernst', 'Mustermann', 'ErnstM'),
(59, 'Susi', 'Musterfrau', 'SusiM');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
