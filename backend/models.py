# Based on https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj#how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql

from sqlalchemy import inspect

# Import db from the current package
from . import db

class User(db.Model):
    __table__ = db.metadata.tables["Users"]
    ads = db.relationship('Ad', back_populates='poster', cascade="all, delete-orphan")
    media_uploads = db.relationship('Media', back_populates="uploader", cascade="all, delete-orphan")
    reviews_about = db.relationship('Review', foreign_keys = "Review.reviewee_id", back_populates="reviewee", cascade="all, delete-orphan")
    reviews_by = db.relationship('Review', foreign_keys = "Review.reviewer_id", back_populates="reviewer", cascade="all, delete-orphan")
    genres = db.relationship('Genre', secondary="User_Genres", back_populates="users")
    user_instruments = db.relationship('User_Instrument', back_populates="user", cascade="all, delete-orphan")

    def toDict(self):
          return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }

class User_Genre(db.Model):
    __table__ = db.metadata.tables["User_Genres"]

    def toDict(self):
          return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }

class User_Instrument(db.Model):
    __table__ = db.metadata.tables["User_Instruments"]
    user = db.relationship('User', back_populates="user_instruments")
    instrument = db.relationship('Instrument', back_populates="instrument_users")

    def toDict(self):
          return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }
 
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


