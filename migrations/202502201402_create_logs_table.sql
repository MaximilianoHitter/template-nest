use inventory_back;
DROP TABLE IF EXISTS logs;

CREATE TABLE logs(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    level varchar(255) COMMENT 'Nivel',
    user_id INT NULL COMMENT 'User Id',
    message varchar(255) COMMENT 'Mensaje',
    stack decimal(10,2) COMMENT 'Stack',
    created_at DATETIME COMMENT 'Create Time'
) COMMENT 'logs_table';