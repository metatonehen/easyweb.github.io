from app import db
from models import *

def init_database():
    """Inicializa la base de datos con las tablas definidas en models.py"""
    print("Creando tablas de la base de datos...")
    db.create_all()
    print("Base de datos inicializada correctamente.")

if __name__ == "__main__":
    init_database()
