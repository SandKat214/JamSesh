# Adapted from https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj

import os
from flask_cors import CORS

# App Initialization
from . import create_app  # from __init__ file
app = create_app(os.getenv("CONFIG_MODE"))
cors = CORS(app, origins=["http://127.0.0.1:5173", "http://localhost:5173"])

# Hello World!
@app.route('/')
def hello():
    return "Hello World!"


# Register routes
from .api.auth import urls
from .api.genres import urls

if __name__ == "__main__":
    app.run()