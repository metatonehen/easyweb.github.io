# Instrucciones para Desplegar METATONEHEN en Hosting

Este documento proporciona instrucciones para desplegar la aplicación METATONEHEN en un hosting web.

## Requisitos del Servidor

- Python 3.9 o superior
- Soporte para WSGI (Apache con mod_wsgi, uWSGI, Gunicorn)
- Base de datos PostgreSQL

## Opciones de Despliegue

### 1. Hosting Compartido con cPanel

1. Sube todos los archivos a tu hosting
2. Configura la aplicación como aplicación WSGI en cPanel
3. Configura la base de datos PostgreSQL
4. Crea las tablas usando el archivo init_db.py

### 2. VPS o Servidor Dedicado

1. Sube los archivos a tu servidor
2. Configura Nginx usando el archivo nginx.conf proporcionado
3. Configura Gunicorn para servir la aplicación
4. Configura la base de datos PostgreSQL

### 3. Plataformas PaaS (Heroku, etc.)

1. Sube los archivos a la plataforma
2. La configuración se realizará automáticamente con el Procfile

## Configuración de la Base de Datos

Ejecuta el siguiente comando para crear las tablas:
```
python init_db.py
```

## Solución de Problemas

Si encuentras errores, verifica:
- Conexión correcta a la base de datos
- Permisos adecuados en las carpetas
- Configuración correcta del servidor web
