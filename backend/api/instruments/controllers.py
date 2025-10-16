from flask import jsonify
from ...models import Instrument


def list_all_instruments_controller():
    instruments = Instrument.query.all()
    instruments_list = [instrument.toDict() for instrument in instruments]  # Using the toDict method
    return jsonify(instruments_list)
