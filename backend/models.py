# Based on https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj#how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql

from sqlalchemy import inspect
from datetime import datetime
from sqlalchemy.orm import validates

# Import db from the current package
from . import db

class User(db.Model):
    __table__ = db.metadata.tables["Users"]
    ads = db.relationship('Ad', back_populates='poster', cascade="all, delete-orphan")
    media_uploads = db.relationship('Media', back_populates="uploader", cascade="all, delete-orphan")
    reviews_about = db.relationship('Review', foreign_keys = "Review.reviewee_id", back_populates="reviewee", cascade="all, delete-orphan")
    reviews_by = db.relationship('Review', foreign_keys = "Review.reviewer_id", back_populates="reviewer", cascade="all, delete-orphan")
    genres = db.relationship('Genre', secondary="User_Genres", back_populates="users")
    instruments = db.relationship('Instrument', secondary="User_Instruments", back_populates="users")

class User_Genre(db.Model):
    __table__ = db.metadata.tables["User_Genres"]

class User_Instrument(db.Model):
    __table__ = db.metadata.tables["User_Instruments"]
 
class Ad(db.Model):
    __table__ = db.metadata.tables["Ads"]
    poster = db.relationship('User', back_populates='ads')
    instruments = db.relationship('Instrument', secondary="Ad_Instruments", back_populates="ads")

class Ad_Instrument(db.Model):
    __table__ = db.metadata.tables["Ad_Instruments"]

class Genre(db.Model):
    __table__ = db.metadata.tables["Genres"]
    users = db.relationship('User', secondary="User_Genres", back_populates="genres")

class Instrument(db.Model):
    __table__ = db.metadata.tables["Instruments"]
    users = db.relationship('User', secondary="User_Instruments", back_populates="instruments")
    ads = db.relationship('Ad', secondary="Ad_Instruments", back_populates="instruments")

class Media(db.Model):
    __table__ = db.metadata.tables["Media"]
    uploader = db.relationship('User', back_populates="media_uploads")

class Review(db.Model):
    __table__ = db.metadata.tables["Reviews"]
    reviewee = db.relationship('User', foreign_keys = "Review.reviewee_id", back_populates="reviews_about")
    reviewer = db.relationship('User', foreign_keys = "Review.reviewer_id", back_populates="reviews_by")


