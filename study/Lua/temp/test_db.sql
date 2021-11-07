USE test_db;

drop table test_table;

create table test_table(
    `num` INT NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(45) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    `salt` VARCHAR(20),
    PRIMARY KEY(`num`),
    UNIQUE KEY `id_UNIQUE` (`id`)
)DEFAULT CHARSET=utf8;