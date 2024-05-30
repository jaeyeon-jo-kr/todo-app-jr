DROP TABLE IF EXISTS `TodoItem`;
CREATE TABLE IF NOT EXISTS `TodoItem`(
     `id`          INTEGER PRIMARY KEY AUTO_INCREMENT,
     `title`       VARCHAR(100) NOT NULL,
     `description` LONGTEXT,
     `toggled`     BOOL DEFAULT false,
     `created_at`     DATETIME DEFAULT CURRENT_TIMESTAMP,
     `updated_at`     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
DROP TABLE IF EXISTS `TodoItemRemoved`;
CREATE TABLE IF NOT EXISTS `TodoItemRemoved`(
     `id`          INTEGER,
     `title`       VARCHAR(100) NOT NULL,
     `description` LONGTEXT,
     `toggled`     BOOL DEFAULT false,
     `created_at`     DATETIME DEFAULT CURRENT_TIMESTAMP,
     `updated_at`     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     `removed_id`          INTEGER PRIMARY KEY AUTO_INCREMENT,
     `removed_at` DATETIME DEFAULT CURRENT_TIMESTAMP);
DROP TABLE IF EXISTS `TodoAlarm`;
CREATE TABLE IF NOT EXISTS `TodoAlarm`(
     `id`          INTEGER PRIMARY KEY AUTO_INCREMENT,
     `todo_item_id` INTEGER NOT NULL,
     `reserved_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
     `reserved` BOOL DEFAULT true,
     `finished` BOOL DEFAULT false,
     `created_at`     DATETIME DEFAULT CURRENT_TIMESTAMP,
     `updated_at`     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
DROP TABLE IF EXISTS `TodoAlarmRemoved`;
CREATE TABLE IF NOT EXISTS `TodoAlarmRemoved`(
     `id`          INTEGER,
     `todo_item_id` INTEGER NOT NULL,
     `reserved_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
     `reserved` BOOL DEFAULT true,
     `finished` BOOL DEFAULT false,
     `created_at`     DATETIME DEFAULT CURRENT_TIMESTAMP,
     `updated_at`     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     `removed_id`          INTEGER PRIMARY KEY AUTO_INCREMENT,
     `removed_at` DATETIME DEFAULT CURRENT_TIMESTAMP);