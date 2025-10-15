from flask import request, jsonify
from flask_jwt_extended import create_access_token
import bcrypt

from ... import db
from ...models import User


def register_user_controller():
    # Retrieve the data elements from the registration request
    user_to_add = request.json

    # Retrieve the password separately to encrypt it
    password = request.json.get("password")
    password = password.encode('utf-8')  # Convert to byte array for bcrypt

    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

    # Create a database object to put the data elements in
    new_user = User()

    # Add the data elements to the new database object
    for key, value in user_to_add.items():
        if hasattr(new_user, key):
            setattr(new_user, key, value)
    
    # Replace the plain password with the encrypted password
    setattr(new_user, 'password', hashed_password)

    # Add and commit to database
    db.session.add(new_user)
    db.session.commit()

    token = create_access_token(identity=user_to_add["email"])

    return jsonify({
            "message": "New user registered!",
            "email": user_to_add["email"],
            "token": token
        }), 201
