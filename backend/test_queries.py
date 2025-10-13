from flask import request, jsonify
import uuid
from datetime import datetime

from .app import app
from . import models, db

@app.route('/test/users', methods=['GET'])
def get_users():
    users = models.User.query.all()
    users_list = [user.toDict() for user in users]  # Using the toDict method
    return jsonify(users_list)

@app.route('/test/create-test-user', methods=['POST'])
def create_test_user():
    try:
        # Create a new user with predefined test data
        test_user = models.User()
        
        # Set some test data (adjust these fields based on your Users table columns)
        test_data = {
            "user_id": 111,
            "username": "test_user_1",
            "email": "test_user_1@gmail.com",
            "password": "test_password",
            "profile_pic": "test_url",
            "bio": "Hello, I am a test user.",
            "city": "Portland",
            "state": "OR"
        }
        
        # Set the attributes on the user object
        for key, value in test_data.items():
            if hasattr(test_user, key):
                setattr(test_user, key, value)
        
        # Add and commit to database
        db.session.add(test_user)
        db.session.commit()
        
        return jsonify({
            "message": "Test user created successfully",
            "user": test_user.toDict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400