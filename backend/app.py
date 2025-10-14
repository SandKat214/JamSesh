# Adapted from https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj

import os

# App Initialization
from . import create_app  # from __init__ file
app = create_app(os.getenv("CONFIG_MODE"))


# Return an informative string at the root directory.
@app.route('/')
def root():
    return "An API for the JamSesh application."


# Register test query routes
from . import test_queries

# Register instrument endpoint routes
from .api.instruments import urls

if __name__ == "__main__":
    app.run()
