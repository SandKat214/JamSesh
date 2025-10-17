from flask import jsonify
from ... import models


# Adapted from https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj
def get_instruments_controller():
    """Retrieve all instruments"""
    try:
        instrument_list = models.Instrument.query.order_by(models.Instrument.name).all()

        response = []
        for instrument in instrument_list:
            response.append(instrument.toDict())

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
