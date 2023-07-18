-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 18 juil. 2023 à 15:21
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `coinsbot`
--

-- --------------------------------------------------------

--
-- Structure de la table `batiment`
--

CREATE TABLE `batiment` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `bar` varchar(255) NOT NULL DEFAULT 'no',
  `garage` varchar(255) NOT NULL DEFAULT 'no',
  `magasin` varchar(255) NOT NULL DEFAULT 'no',
  `cinema` varchar(255) NOT NULL DEFAULT 'no',
  `gare` varchar(255) NOT NULL DEFAULT 'no',
  `mairie` varchar(255) NOT NULL DEFAULT 'no',
  `entrepot` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bot`
--

CREATE TABLE `bot` (
  `botId` varchar(255) DEFAULT NULL,
  `statut` varchar(255) NOT NULL DEFAULT '❤️ Remade by ruwinou /zcN3sB5KSv',
  `type` varchar(255) NOT NULL DEFAULT 'watching'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `commandBlock`
--

CREATE TABLE `commandBlock` (
  `guildId` varchar(255) DEFAULT NULL,
  `channelId` varchar(255) DEFAULT NULL,
  `statut` varchar(255) NOT NULL DEFAULT 'on'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `commands`
--

CREATE TABLE `commands` (
  `guildId` varchar(255) DEFAULT NULL,
  `adds` varchar(255) NOT NULL DEFAULT 'on',
  `remove` varchar(255) NOT NULL DEFAULT 'on',
  `reset` varchar(255) NOT NULL DEFAULT 'on'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `gain`
--

CREATE TABLE `gain` (
  `guildId` varchar(255) DEFAULT NULL,
  `workmin` varchar(255) NOT NULL DEFAULT '20',
  `workmax` varchar(255) NOT NULL DEFAULT '250',
  `dailymin` varchar(255) NOT NULL DEFAULT '100',
  `dailymax` varchar(255) NOT NULL DEFAULT '1000',
  `bar` varchar(255) NOT NULL DEFAULT '100',
  `garage` varchar(255) NOT NULL DEFAULT '200',
  `magasin` varchar(255) NOT NULL DEFAULT '300',
  `cinéma` varchar(255) NOT NULL DEFAULT '400',
  `gare` varchar(255) NOT NULL DEFAULT '500',
  `mairie` varchar(255) NOT NULL DEFAULT '600',
  `vocal` varchar(255) NOT NULL DEFAULT '0',
  `stream` varchar(255) NOT NULL DEFAULT '0',
  `cam` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `guild`
--

CREATE TABLE `guild` (
  `guildId` varchar(255) DEFAULT NULL,
  `prefix` varchar(255) NOT NULL DEFAULT '&'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job`
--

CREATE TABLE `job` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `cultivateur` varchar(255) NOT NULL DEFAULT 'no',
  `blanchisseur` varchar(255) NOT NULL DEFAULT 'no',
  `policier` varchar(255) NOT NULL DEFAULT 'no',
  `hacker` varchar(255) NOT NULL DEFAULT 'no',
  `cambrioleur` varchar(255) NOT NULL DEFAULT 'no',
  `juge` varchar(255) NOT NULL DEFAULT 'no',
  `tueur` varchar(255) NOT NULL DEFAULT 'no',
  `braqueur` varchar(255) NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `juge`
--

CREATE TABLE `juge` (
  `guildId` varchar(255) DEFAULT NULL,
  `messageId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `list`
--

CREATE TABLE `list` (
  `guildId` varchar(255) DEFAULT NULL,
  `whitelistId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `list2`
--

CREATE TABLE `list2` (
  `guildId` varchar(255) DEFAULT NULL,
  `ownerId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mine`
--

CREATE TABLE `mine` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `wagon` varchar(255) NOT NULL DEFAULT '0',
  `charbon` varchar(255) NOT NULL DEFAULT '0',
  `fer` varchar(255) NOT NULL DEFAULT '0',
  `ors` varchar(255) NOT NULL DEFAULT '0',
  `diamant` varchar(255) NOT NULL DEFAULT '0',
  `mine` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `team`
--

CREATE TABLE `team` (
  `guildId` varchar(255) DEFAULT NULL,
  `ownerId` varchar(255) DEFAULT NULL,
  `id` varchar(255) DEFAULT NULL,
  `nom` varchar(25) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `coins` varchar(255) NOT NULL DEFAULT '0',
  `reputation` varchar(255) NOT NULL DEFAULT '0',
  `cadenas` varchar(255) NOT NULL DEFAULT '5',
  `avatar` varchar(255) NOT NULL DEFAULT 'no',
  `banner` varchar(255) NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tmembers`
--

CREATE TABLE `tmembers` (
  `guildId` varchar(255) DEFAULT NULL,
  `teamId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `grade` varchar(255) NOT NULL DEFAULT 'Membres'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `coins` varchar(255) NOT NULL DEFAULT '0',
  `banque` varchar(255) NOT NULL DEFAULT '0',
  `reputation` varchar(255) NOT NULL DEFAULT '0',
  `color` varchar(255) NOT NULL DEFAULT 'LightGrey',
  `team` varchar(255) NOT NULL DEFAULT 'no',
  `pill` varchar(255) NOT NULL DEFAULT '0',
  `vocal` varchar(255) NOT NULL DEFAULT 'on'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `xp`
--

CREATE TABLE `xp` (
  `guildId` varchar(255) DEFAULT NULL,
  `xp` varchar(255) NOT NULL DEFAULT 'on',
  `msg` varchar(255) NOT NULL DEFAULT '5',
  `vocal` varchar(255) NOT NULL DEFAULT '10'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `xp`
--

INSERT INTO `xp` (`guildId`, `xp`, `msg`, `vocal`) VALUES
('1121718364105101463', 'on', '5', '10'),
('1069937639890899015', 'on', '5', '10');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
