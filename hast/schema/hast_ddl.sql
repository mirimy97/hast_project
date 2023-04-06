CREATE TABLE IF NOT EXISTS `hast`.`export_table` (
    `export_event_id` BIGINT NOT NULL,
    `export_root_code` VARCHAR(10) NULL DEFAULT NULL,
    `export_base_code` VARCHAR(10)NULL DEFAULT NULL,
    `export_code` VARCHAR(10) NULL DEFAULT NULL,
    `export_country_code` VARCHAR(10) NULL DEFAULT NULL,
    `export_lat` DOUBLE NULL DEFAULT NULL,
    `export_long` DOUBLE NULL DEFAULT NULL,
    `export_date` DATE NULL DEFAULT NULL,
    `export_datetime` TIMESTAMP NULL DEFAULT NULL,
    `export_url` TEXT NULL DEFAULT NULL,
    `export_score` DOUBLE NULL DEFAULT NULL,
    `export_row_count` BIGINT NULL DEFAULT NULL,

    PRIMARY KEY (`export_event_id`)
    ) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `hast`.`point_table` (
    `point_id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `point_event_id` BIGINT NOT NULL,
    `point_country_code` CHAR(10) NULL DEFAULT NULL,
    `point_kor_comment` VARCHAR(255) NULL DEFAULT NULL,
    `point_eng_comment` VARCHAR(255) NULL DEFAULT NULL,
    `point_sentence` INT NULL DEFAULT NULL,
    `point_confidence` DOUBLE NULL DEFAULT NULL,
    `point_mentions_tone` DOUBLE NULL DEFAULT NULL,
    `point_gkg_tone` DOUBLE NULL DEFAULT NULL,
    `point_gkg_positive` DOUBLE NULL DEFAULT NULL,
    `point_gkg_negative` DOUBLE NULL DEFAULT NULL,
    `point_gkg_activity` DOUBLE NULL DEFAULT NULL,
    `point_gkg_news` DOUBLE NULL DEFAULT NULL,
    `point_gkg_count` INT NULL DEFAULT NULL,
    `point_event_datetime` TIMESTAMP NULL DEFAULT NULL,
    `point_datetime` TIMESTAMP NULL DEFAULT NULL,
    `point_time_diff` BIGINT NULL DEFAULT NULL,
    `point_source` TEXT NULL DEFAULT NULL,
    `point_url` TEXT NULL DEFAULT NULL,
    `point_image` TEXT NULL DEFAULT NULL,
    `point_theme_crime` DOUBLE NULL DEFAULT NULL,
    `point_theme_accident` DOUBLE NULL DEFAULT NULL,
    `point_theme_disease` DOUBLE NULL DEFAULT NULL,
    `point_theme_disaster` DOUBLE NULL DEFAULT NULL,
    `point_theme_politic` DOUBLE NULL DEFAULT NULL,
    `point_theme_total` DOUBLE NULL DEFAULT NULL,
    `point_category` INT NULL DEFAULT NULL,
    `point_year` CHAR(4) NULL DEFAULT NULL,
    `point_month` CHAR(2) NULL DEFAULT NULL,
    `point_score` DOUBLE NULL DEFAULT NULL
    ) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
