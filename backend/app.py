# Adapted from https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj

import os
from flask_cors import CORS

# App Initialization
from . import create_app  # from __init__ file
app = create_app(os.getenv("CONFIG_MODE"))
cors = CORS(app, origins="http://127.0.0.1:5173")


# Return an informative string at the root directory.
@app.route('/')
def root():
    return "An API for the JamSesh application."


# Register routes
from .api.auth import urls
from .api.genres import urls
from .api.instruments import urls

if __name__ == "__main__":
    app.run()
