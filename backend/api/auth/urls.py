from flask import request

from ...app import app
from .controllers import register_controller, login_controller

@app.route("/auth/register", methods=['POST'])
def register_user():
    if request.method == 'POST':
        return register_controller()
    else:
        return 'Method is Not Allowed'
    
@app.route("/auth/login", methods=['POST'])
def login_user():
    if request.method == 'POST':
        return login_controller()
    else:
        return 'Method is Not Allowed'