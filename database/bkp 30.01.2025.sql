-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.4.2 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para board_vumer
CREATE DATABASE IF NOT EXISTS `board_vumer` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `board_vumer`;

-- Copiando estrutura para tabela board_vumer.games
CREATE TABLE IF NOT EXISTS `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL DEFAULT '0',
  `game_name` varchar(255) NOT NULL DEFAULT 'Sem Nome',
  `type` enum('Futebol','Basquete','Outro') NOT NULL DEFAULT 'Outro',
  `description` varchar(500) NOT NULL DEFAULT 'Sem Descrição',
  `game_private` enum('Y','N') NOT NULL DEFAULT 'Y',
  `game_org` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela board_vumer.games: ~8 rows (aproximadamente)
INSERT INTO `games` (`id`, `user_id`, `game_name`, `type`, `description`, `game_private`, `game_org`) VALUES
	(1, 2, 'torneio teste ', 'Basquete', '', 'Y', 0),
	(2, 2, 'teste 1', 'Futebol', 'futebol dos amigos', 'Y', 0),
	(3, 2, 'teste 2', 'Futebol', '', 'Y', 0),
	(4, 2, 'torneio teste ', 'Futebol', 'teste', 'Y', 0),
	(5, 2, 'torneio teste ', 'Futebol', 'teste', 'Y', 0),
	(6, 2, 'torneio teste ', 'Basquete', 'teste', 'Y', 0),
	(7, 2, 'teste', 'Basquete', 'jogo do sabado', 'Y', 0),
	(8, 2, 'teste 2', 'Futebol', 'jogo do domingo', 'N', 0);

-- Copiando estrutura para tabela board_vumer.licenses
CREATE TABLE IF NOT EXISTS `licenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL DEFAULT '0',
  `org_name` varchar(500) NOT NULL DEFAULT 'Sem Nome',
  `type` enum('Vitalício','Teste','Mensal','Anual') NOT NULL DEFAULT 'Teste',
  `validate` date NOT NULL DEFAULT '2024-12-17',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela board_vumer.licenses: ~1 rows (aproximadamente)
INSERT INTO `licenses` (`id`, `user_id`, `org_name`, `type`, `validate`) VALUES
	(1, 2, 'Sem Nome', 'Vitalício', '2024-12-17');

-- Copiando estrutura para tabela board_vumer.organizations
CREATE TABLE IF NOT EXISTS `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `org_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Sem nome',
  `owner_id` int NOT NULL DEFAULT '0',
  `owner_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Sem nome',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela board_vumer.organizations: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela board_vumer.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `name` varchar(50) NOT NULL DEFAULT 'sem_permissao',
  `user_id` int NOT NULL DEFAULT '0',
  `org_id` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela board_vumer.permissions: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela board_vumer.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `token` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela board_vumer.sessions: ~46 rows (aproximadamente)
INSERT INTO `sessions` (`token`, `user_id`) VALUES
	(1, 2),
	(2, 1),
	(3, 2),
	(4, 2),
	(5, 2),
	(6, 2),
	(7, 2),
	(8, 2),
	(9, 2),
	(10, 2),
	(11, 2),
	(12, 2),
	(13, 2),
	(14, 2),
	(15, 2),
	(16, 2),
	(17, 2),
	(18, 2),
	(19, 2),
	(20, 2),
	(21, 2),
	(22, 2),
	(23, 2),
	(24, 2),
	(25, 2),
	(26, 2),
	(27, 2),
	(28, 2),
	(29, 2),
	(30, 2),
	(31, 2),
	(32, 2),
	(33, 2),
	(34, 2),
	(35, 2),
	(36, 2),
	(37, 2),
	(38, 2),
	(39, 2),
	(40, 2),
	(41, 2),
	(42, 2),
	(43, 2),
	(44, 2),
	(45, 2),
	(46, 2);

-- Copiando estrutura para tabela board_vumer.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'Sem',
  `surname` varchar(255) NOT NULL DEFAULT 'nome',
  `email` varchar(300) NOT NULL DEFAULT 'Sem e-mail',
  `password` varchar(500) NOT NULL DEFAULT 'Sem senha',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela board_vumer.users: ~2 rows (aproximadamente)
INSERT INTO `users` (`user_id`, `name`, `surname`, `email`, `password`) VALUES
	(1, 'Kalisom', 'Cruz', 'kalisom.cruz@vumer.com.br', '$2b$10$Bj7y5kbpUMB85/UYzFuLke7z9Am8idwWdbW/j.z4EFfVQlh0y5/32'),
	(2, 'arthur', 'scherer', 'arthurscherer1644@gmail.com', '$2b$10$JVvayGjVHypWB2n1YkegO.Y1N9L01v4AaBcz3P43V825WcEzxMlWK');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
