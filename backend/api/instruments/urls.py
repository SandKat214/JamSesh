# Structure based on https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj

from flask import request

from ...app import app
from .controllers import get_instruments_controller


@app.route("/instruments", methods=['GET'])
def get_instruments():
    if request.method == 'GET':
        return get_instruments_controller()
    else:
        return 'Method is Not Allowed'
