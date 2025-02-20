## Template de NestJs

### Descripción

Este template es una aplicación de ejemplo para el uso del framework de NestJs. De momento posee solamente el método de autenticación propio.

### Instalación

Para utilizar el template se debe poseer una base de datos MySQL y Redis.
Para instalar el template de NestJs, sigue los siguientes pasos:

1. Clonar el repositorio:

```
git clone https://github.com/nestjs/template-nest.git
```

2. Instalar las dependencias:

```
npm install
```

3. Duplicar el archivo .env.example y renombrarlo a .env

4. Modificar los valores de la base de datos y Redis en el archivo .env

5. Ejecutar las migraciones en el orden en que se encuentran en la carpeta /migrations

6. Ejecutar el servidor de NestJs:

```
npm run start:dev
```

### Uso de la colección de Postman

Se debe utilizar un enviroment que posea la variable token

### Author

- [Maximiliano Ariel Hitter](https://github.com/MaximilianoHitter)
