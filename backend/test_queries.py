from flask import request, jsonify

from .app import app
from . import models, db

@app.route('/test/users', methods=['GET'])
def get_users():
    users = models.User.query.all()
    users_list = [user.toDict() for user in users]  # Using the toDict method
    return jsonify(users_list)


@app.route('/test/users/<int:user_id>', methods=['GET', 'PATCH', 'DELETE'])
def get_edit_or_delete_user_by_id(user_id):
    user = models.User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if request.method == "GET":
        user_instruments = [ui.toDict() for ui in user.user_instruments]
        user_genres = [genre.toDict() for genre in user.genres]
        user_reviews = [review.toDict() for review in user.reviews_about]
        user_media = [media.toDict() for media in user.media_uploads]
        return jsonify({
            "user": user.toDict(),
            "instruments": user_instruments,
            "genres": user_genres,
            "reviews": user_reviews,
            "media": user_media
        })

    elif request.method == "PATCH":
        edit_data = {
            "bio": "THIS BIO HAS BEEN UPDATED! Jazz pianist and composer, always searching for the perfect chord progression.",
            "city": "Los Angeles",
            "state": "CA"
        }
        for key, value in edit_data.items():
            if hasattr(user, key):
                setattr(user, key, value)
        try:
            db.session.commit()
            return jsonify({
                "message": "User updated successfully",
                "user": user.toDict()
            }), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400

    elif request.method == "DELETE":
        username = user.username
        try:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": f"User {user_id}: {username} deleted successfully."}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400

@app.route('/test/create-test-user', methods=['POST'])
def create_test_user():
    try:
        # Create a new user with predefined test data
        test_user = models.User()
        
        # Set some test data (adjust these fields based on your Users table columns)
        test_data = {
            "username": "jazz_jane",
            "email": "jane.smooth@example.com",
            "password": "blueNote88",
            "profile_pic": "https://example.com/images/jane.jpg",
            "bio": "Jazz pianist and composer, always searching for the perfect chord progression.",
            "city": "Chicago",
            "state": "IL"
        }

        # Set the attributes on the user object
        for key, value in test_data.items():
            if hasattr(test_user, key):
                setattr(test_user, key, value)

        # Add user genres
        genre_names = ["jazz"]
        for name in genre_names:
            # Query for genre in database
            genre = models.Genre.query.filter_by(name=name).first()
            if genre:
                test_user.genres.append(genre)

        # Add instruments with skill levels
        instruments_with_skill = [
            {"name": "piano", "skill_level": 8}
        ]
        
        for item in instruments_with_skill:
            # Try to find the instrument in the database
            instr = models.Instrument.query.filter_by(name=item["name"]).first()
            
            # Create the association object
            user_instrument_assoc = models.User_Instrument(
                user=test_user,
                instrument=instr,
                skill_level=item["skill_level"]
            )
            db.session.add(user_instrument_assoc)
        
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
    
