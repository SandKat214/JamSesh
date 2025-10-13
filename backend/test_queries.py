from flask import request, jsonify

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
            "username": "test_user_5",
            "email": "test_user_5@gmail.com",
            "password": "test_pass_5",
            "profile_pic": "test_url_5",
            "bio": "Hello, I am the fifth test user!",
            "city": "Austin",
            "state": "TX"
        }
        
        # Set the attributes on the user object
        for key, value in test_data.items():
            if hasattr(test_user, key):
                setattr(test_user, key, value)

        # Add user genres
        genre_names = ["classical", "folk"]
        for name in genre_names:
            # Query for genre in database
            genre = models.Genre.query.filter_by(name=name).first()
            if genre:
                test_user.genres.append(genre)

         # Add instruments with skill levels
        #instruments_with_skill = [
            #{"name": "violin", "skill_level": 3},
            #{"name": "piano", "skill_level": 5}
        #]
        
        #for item in instruments_with_skill:
            # Try to find the instrument in the database
            #instr = models.Instrument.query.filter_by(name=item["name"]).first()
            
            # Create the association object
            #user_instrument_assoc = models.User_Instrument(
                #user=test_user,
                #instrument=instr,
                #skill_level=item["skill_level"]
            #)
            #db.session.add(user_instrument_assoc)
        
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