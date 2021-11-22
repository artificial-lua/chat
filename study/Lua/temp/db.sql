DROP DATABASE user_info;

CREATE DATABASE user_info;

USE user_info;

CREATE TABLE user_info_table(
    `num` INT NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(20) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    `salt` VARCHAR(20),
    PRIMARY KEY (`num`),
    UNIQUE KEY `id` (`id`)
)DEFAULT CHARSET=utf8;