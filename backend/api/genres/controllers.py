from flask import request, jsonify
from ... import models, db

# Register controller logic based on this YouTube tutorial: https://www.youtube.com/watch?v=mjZIv4ey0ps&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=3
def register_controller():
    new_user = request.get_json()
    
    try:
        # unpack json into variables
        username = new_user['username']
        email = new_user['email']
        password = new_user['password']
        profile_pic = new_user['profile_pic']
        bio = new_user['bio']
        city = new_user['city']
        state = new_user['state']

        if models.User.query.filter_by(username=username).first():
            return jsonify({"error": "Username is already in use"}), 400
        if models.User.query.filter_by(email=email).first():
            return jsonify({"error": "Email is already in use"}), 400


    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400



def login_controller():
    pass