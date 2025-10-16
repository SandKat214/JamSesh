from flask import request, jsonify
from flask_jwt_extended import create_access_token, current_user, jwt_required, JWTManager
from ... import models, db
import bcrypt

# Register controller logic based on this YouTube tutorial: https://www.youtube.com/watch?v=mjZIv4ey0ps&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=3
def register_controller():
    """Register new user, encrypt their password, and generate access token to log them in 
    for the first time"""
    user_data = request.get_json()

    # unpack data into variables
    username = user_data['username']
    email = user_data['email']
    password = user_data['password']
    profile_pic = user_data['profile_pic']
    bio = user_data['bio']
    city = user_data['city']
    state = user_data['state']
    instruments = user_data['instruments']
    genres = user_data['genres']

    if not username or not email or not password or not profile_pic or not bio or not city or not state or not instruments or not genres:
        return jsonify({"error": "Required field missing"}), 400

    try:
        # error handling if email already in database
        if models.User.query.filter_by(email=email).one_or_none():
            return jsonify({"error": "Email is already in use"}), 400
        
        # encrypt user password and turn hashed password into string for database storage
        hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        hash = hash.decode('utf-8')
        
        # create new user and add associated genres and instrument skill levels
        new_user = create_new_user(username, email, hash, profile_pic, bio, city, state)
        add_user_genres(new_user, genres)
        db.session.add(new_user)
        add_user_instruments(new_user, instruments)

        # Save new user info to database and generate access token
        db.session.commit()
        token = create_access_token(identity=new_user)

        return jsonify({
            "message": "New user created successfully",
            "user": new_user.toDict(),
            "token": token
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
# Login controller adapated from: https://flask-jwt-extended.readthedocs.io/en/stable/automatic_user_loading.html   
def login_controller():
    """Logs user in"""
    email = request.json.get('email')
    password = request.json.get('password')

    user = models.User.query.filter_by(email=email).one_or_none()
    if not user:
        return jsonify({"error": "Invalid email"}), 401
    if not password or not user.password_is_valid(password):
        return jsonify({"error": "Invalid password"}), 401
    
    # Generate access token if user credentials are valid
    token = create_access_token(identity=user)
    return jsonify({
        "message": "User login successful",
        "token": token
    }), 200

# HELPER METHODS
def create_new_user(username, email, password, profile_pic, bio, city, state):
    """Set attributes of new user"""
    user = models.User()
    user.username = username
    user.email = email
    user.password = password
    user.profile_pic = profile_pic
    user.bio = bio
    user.city = city
    user.state = state

    return user

def add_user_genres(user, genre_list):
    """Add genres associated with given user"""
    for id in genre_list:
        genre = models.Genre.query.filter_by(genre_id=id).one_or_none()
        if genre:
            user.genres.append(genre)

def add_user_instruments(user, instrument_dict):
    """Add instruments and corresponding skill level associated with given user"""
    for instr_id, skill in instrument_dict.items():
        instrument = models.Instrument.query.filter_by(instrument_id=int(instr_id)).one_or_none()
        if instrument:
            user_instrument_skill = models.User_Instrument(
                user=user,
                instrument=instrument,
                skill_level=int(skill)
            )

            db.session.add(user_instrument_skill)
