from flask import request

from ...app import app
from .controllers import list_all_instruments_controller


@app.route("/instruments", methods=['GET'])
def instruments():
    if request.method == 'GET':
        return list_all_instruments_controller()
