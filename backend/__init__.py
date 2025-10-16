# Copied from https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

from .config import config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

# Register JWT callback functions - both functions copied from https://flask-jwt-extended.readthedocs.io/en/stable/automatic_user_loading.html
@jwt.user_identity_loader
def user_identity_lookup(user):
      """Store user id as part of token"""
      return user.user_id

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
      identity = jwt_data["sub"]
      return User.query.filter_by(user_id=identity).one_or_none()

def create_app(config_mode):
      app = Flask(__name__)
      app.config.from_object(config[config_mode])
      app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

      db.init_app(app)
      migrate.init_app(app, db)
      jwt.init_app(app)

      # Reflect the database tables after initializing the app
      with app.app_context():
            db.reflect()

      return app