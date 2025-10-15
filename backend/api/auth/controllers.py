from flask import request, jsonify
from ... import models, db
import bcrypt

# Register controller logic based on this YouTube tutorial: https://www.youtube.com/watch?v=mjZIv4ey0ps&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=3
def register_controller():
    user_data = request.get_json()
    
    try:
        # unpack json into variables
        username = user_data['username']
        email = user_data['email']
        password = user_data['password']
        profile_pic = user_data['profile_pic']
        bio = user_data['bio']
        city = user_data['city']
        state = user_data['state']
        instruments = user_data['instruments']
        genres = user_data['genres']

        # error handling if username and email already in database
        if models.User.query.filter_by(username=username).first():
            return jsonify({"error": "Username is already in use"}), 400
        if models.User.query.filter_by(email=email).first():
            return jsonify({"error": "Email is already in use"}), 400
        
        # encrypt user password
        hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        hash = hash.decode('utf-8')
        
        # create and stage new user
        new_user = create_new_user(username, email, hash, profile_pic, bio, city, state)
        db.session.add(new_user)

        # add new user info to database
        db.session.commit()

        return jsonify({
            "message": "New user created successfully",
            "user": new_user.toDict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    
    
def login_controller():
    pass

def create_new_user(username, email, password, profile_pic, bio, city, state):
    """ Set attributes of new user"""
    user = models.User()
    user.username = username
    user.email = email
    user.password = password
    user.profile_pic = profile_pic
    user.bio = bio
    user.city = city
    user.state = state

    return user
