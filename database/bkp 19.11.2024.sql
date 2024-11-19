-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.4.0 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.8.0.6908
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

-- Copiando estrutura para tabela board_vumer.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `token` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela board_vumer.sessions: ~2 rows (aproximadamente)
INSERT INTO `sessions` (`token`, `user_id`) VALUES
	(1, 2),
	(2, 1);

-- Copiando estrutura para tabela board_vumer.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'Sem',
  `surname` varchar(255) NOT NULL DEFAULT 'nome',
  `email` varchar(300) NOT NULL DEFAULT 'Sem e-mail',
  `password` varchar(500) NOT NULL DEFAULT 'Sem senha',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela board_vumer.users: ~1 rows (aproximadamente)
INSERT INTO `users` (`user_id`, `name`, `surname`, `email`, `password`) VALUES
	(1, 'Kalisom', 'Cruz', 'kalisom.cruz@vumer.com.br', '$2b$10$Bj7y5kbpUMB85/UYzFuLke7z9Am8idwWdbW/j.z4EFfVQlh0y5/32');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
