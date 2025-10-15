from flask import request

from ...app import app
from .controllers import register_user_controller


@app.route("/auth/register", methods=['POST'])
def register():
    if request.method == 'POST':
        return register_user_controller()
