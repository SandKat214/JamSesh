# Copied from https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from .config import config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_mode):
      app = Flask(__name__)
      app.config.from_object(config[config_mode])

      db.init_app(app)
      migrate.init_app(app, db)
      jwt.init_app(app)

      # Reflect the database tables after initializing the app
      with app.app_context():
            db.reflect()

      return app