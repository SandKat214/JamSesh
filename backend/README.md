## Initial "how to"

After cloning the repository, starting a virtual environment is an option to avoid installing the required packages globally. The related virtual environment directory should be added to your `.gitignore` file so that the reqiured packages aren't all uploaded back to GitHub!


A `.env` file will be required once a database connection is implemented in order to keep the credentials off of GitHub. The required contents of the file should be added to the tracked file `.env.example` in template format (without the secret credentials) at that time.

To install the project's required packages, run `pip3 install -r requirements.txt`.

If new required packages are added during development, update the requirements with `pip3 freeze > requirements.txt`.

Initial setup and file structure based on:

https://github.com/osu-cs340-ecampus/flask-starter-app

https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj