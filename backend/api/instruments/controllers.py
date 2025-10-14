from flask import request, jsonify

from ... import db
from ...models import Instrument


def list_all_instruments_controller():
    instruments = Instrument.query.all()
    instruments_list = [instrument.toDict() for instrument in instruments]  # Using the toDict method
    return jsonify(instruments_list)


# Current app design will not require the ability to add instruments via api.
# This is for testing purposes.
def add_instrument_controller():
    # Retrieve the data elements and put them in a dictionary
    instrument_to_add = request.json

    # Create a database object to put the data elements in
    new_instrument = Instrument()

    # Add the data elements to the new database object
    for key, value in instrument_to_add.items():
        if hasattr(new_instrument, key):
            setattr(new_instrument, key, value)

    # Add and commit to database
    db.session.add(new_instrument)
    db.session.commit()

    return jsonify({
            "message": "Instrument added",
            "instrument": new_instrument.toDict()
        }), 201
