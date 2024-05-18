DROP TABLE IF EXISTS `TodoItem`;
CREATE TABLE IF NOT EXISTS `TodoItem`(
     `id`          INTEGER PRIMARY KEY AUTO_INCREMENT,
     `title`       VARCHAR(100) NOT NULL,
     `description` LONGTEXT,
     `toggled`     BOOL);