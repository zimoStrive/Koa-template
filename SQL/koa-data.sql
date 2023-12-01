
CREATE DATABASE /*!32312 IF NOT EXISTS*/`koaData` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;

USE `koaData`;

/*Table structure for table `avatar` */

DROP TABLE IF EXISTS `avatar`;

CREATE TABLE `avatar` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `size` INT(11) DEFAULT NULL,
  `user_id` INT(11) DEFAULT NULL,
  `createAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `filename` (`filename`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

/*Data for the table `avatar` */

INSERT  INTO `avatar`(`id`,`filename`,`mimetype`,`size`,`user_id`,`createAt`,`updateAt`) VALUES (7,'c2a46358c8536f4260aab8a039f824e3','image/jpeg',77307,27,'2023-11-25 17:50:06','2023-11-25 17:50:06');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `avatar_url` VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=INNODB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

/*Data for the table `user` */

INSERT  INTO `user`(`id`,`name`,`password`,`createAt`,`updateAt`,`avatar_url`) VALUES (27,'zimo','a03ab19b866fc585b5cb1812a2f63ca861e7e7643ee5d43fd7106b623725fd67','2023-11-25 17:26:54','2023-11-25 17:50:06','localhost:8000/api/users/avatar/27');

