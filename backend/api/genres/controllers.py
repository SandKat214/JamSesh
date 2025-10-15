from flask import request

# Register controller logic based on this YouTube tutorial: https://www.youtube.com/watch?v=mjZIv4ey0ps&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=3
def register_controller():
    new_user = request.get_json()

    # unpack json into variables
    username = new_user.get('username')
    email = new_user.get('email')
    password = new_user.get('password')
    profile_pic = new_user.get('profile_pic')
    bio = new_user.get('bio')
    city = new_user['city']
    state = new_user['state']


def login_controller():
    pass