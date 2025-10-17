# Structure based on https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj

from flask import request

from ...app import app
from .controllers import get_genres_controller

@app.route("/genres", methods=['GET'])
def register_user():
    if request.method == 'GET':
        return get_genres_controller()
    else:
        return 'Method is Not Allowed'
