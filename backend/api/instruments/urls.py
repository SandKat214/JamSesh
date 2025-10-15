from flask import request

from ...app import app
from .controllers import list_all_instruments_controller, add_instrument_controller


@app.route("/instruments", methods=['GET', 'POST'])
def instruments():
    if request.method == 'GET':
        return list_all_instruments_controller()
    if request.method == 'POST':
        return add_instrument_controller()
