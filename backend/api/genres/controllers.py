from flask import request, jsonify
from ... import models, db

# Adapted from https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj
def get_genres_controller():
    """Retrieve all music genres"""
    try:
        genre_list = models.Genre.query.order_by(models.Genre.name).all()

        response = []
        for genre in genre_list:
            response.append(genre.toDict())
    
        return jsonify(response), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500