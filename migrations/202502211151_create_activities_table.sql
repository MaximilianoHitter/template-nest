use inventory_back;
DROP TABLE IF EXISTS activities;

CREATE TABLE activities(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    entity varchar(255) COMMENT 'Nombre entidad',
    anterior JSON COMMENT 'Datos anteriores',
    posterior JSON COMMENT 'Datos posteriores',
    action VARCHAR(255) COMMENT 'Accion',
    created_at DATETIME COMMENT 'Create Time'
) COMMENT 'activities_table';