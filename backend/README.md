## How to initialize the backend for development

After cloning the repository, create a file named `.env` that follows the format of the provided `.env.example` file. Replace the text `<url goes here>` with the actual URL of your database, including login credentials. Be sure this file is added to your `.gitignore`

In your terminal, navigate to the `/backend` folder. Enter the command `pip3 install --user virtualenv` to install Python's virtual environment. Then run the command `python3 -m venv ./venv`. Add the folder `/venv` to your `.gitignore` file.

Activate the virtual environment by running `source ./venv/bin/activate`. Later, to deactivate the virtual environment, you can enter the command `deactivate`.

Next, install the project's required packages by running `pip3 install -r requirements.txt`.

If new required packages are added during development, you can update the requirements with `pip3 freeze > requirements.txt`.

To activate the Flask backend, enter the command `flask run -h localhost -p 5000`, optionally changing `5000` to a different port of your choice.


Initial setup and file structure based on:

https://github.com/osu-cs340-ecampus/flask-starter-app

https://dev.to/yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-2jjj