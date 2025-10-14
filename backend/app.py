# Copied from https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj

import os

# App Initialization
from . import create_app  # from __init__ file
app = create_app(os.getenv("CONFIG_MODE"))


# Hello World!
@app.route('/')
def hello():
    return "Hello World!"


# Register test query routes
from . import test_queries

if __name__ == "__main__":
    app.run()