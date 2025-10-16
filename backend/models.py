# toDict method based on https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj#how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql
# Relationship definitions derived from https://docs.sqlalchemy.org/en/20/orm/basic_relationships.html
# Schema definitions derived from https://marshmallow-sqlalchemy.readthedocs.io/en/latest/ 

from sqlalchemy import inspect
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields
from . import db
import bcrypt

class User(db.Model):
    __table__ = db.metadata.tables["Users"]
    ads = db.relationship('Ad', back_populates='poster', cascade="all, delete-orphan")
    media_uploads = db.relationship('Media', back_populates="uploader", cascade="all, delete-orphan")
    reviews_about = db.relationship('Review', foreign_keys = "Review.reviewee_id", back_populates="reviewee", cascade="all, delete-orphan")
    reviews_by = db.relationship('Review', foreign_keys = "Review.reviewer_id", back_populates="reviewer", cascade="all, delete-orphan")
    genres = db.relationship('Genre', secondary="User_Genres", back_populates="users")
    user_instruments = db.relationship('User_Instrument', back_populates="user", cascade="all, delete-orphan")

    def toDict(self):
          """Return dictionary of User attributes (excluding password) for serialization into JSON"""
          return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs if c.key != 'password' }
    
    def password_is_valid(self, provided_password):
         """Return true if provided password matches the hashed password stored in the
         database, else return false"""
         hash = self.password.encode('utf-8')
         return bcrypt.checkpw(provided_password.encode('utf-8'), hash)
    
class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True

    username = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True)
    profile_pic = fields.Str(required=True)
    bio = fields.Str(required=True)
    city = fields.Str(required=True)
    state = fields.Str(required=True)
    instruments = fields.Dict(keys=fields.Int(), values=fields.Int(), required=True)
    genres = fields.List(fields.Int(), required=True)

class User_Genre(db.Model):
    __table__ = db.metadata.tables["User_Genres"]

    def toDict(self):
          return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }

class User_Instrument(db.Model):
    __table__ = db.metadata.tables["User_Instruments"]
    user = db.relationship('User', back_populates="user_instruments")
    instrument = db.relationship('Instrument', back_populates="instrument_users")

    def toDict(self):
          return {
               "user_instruments_id": self.user_instruments_id,
               "instrument_id": self.instrument_id,
               "user_id": self.user_id,
               "skill_level": self.skill_level,
               "name": self.instrument.name if self.instrument else None
          }
 
class Ad(db.Model):
    __table__ = db.metadata.tables["Ads"]
    poster = db.relationship('User', back_populates='ads')
    instruments = db.relationship('Instrument', secondary="Ad_Instruments", back_populates="ads")

    def toDict(self):
          return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }

class Ad_Instrument(db.Model):
    __table__ = db.metadata.tables["Ad_Instruments"]

    def toDict(self):
          return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }

class Genre(db.Model):
    __table__ = db.metadata.tables["Genres"]
    users = db.relationship('User', secondary="User_Genres", back_populates="genres")

    def toDict(self):
          return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }

class Instrument(db.Model):
    __table__ = db.metadata.tables["Instruments"]
    instrument_users = db.relationship('User_Instrument', back_populates="instrument", cascade="all, delete-orphan")
    ads = db.relationship('Ad', secondary="Ad_Instruments", back_populates="instruments")

    def toDict(self):
          return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }

class Media(db.Model):
    __table__ = db.metadata.tables["Media"]
    uploader = db.relationship('User', back_populates="media_uploads")

    def toDict(self):
          return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }

class Review(db.Model):
    __table__ = db.metadata.tables["Reviews"]
    reviewee = db.relationship('User', foreign_keys = "Review.reviewee_id", back_populates="reviews_about")
    reviewer = db.relationship('User', foreign_keys = "Review.reviewer_id", back_populates="reviews_by")

    def toDict(self):
          return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }


