from flask import Blueprint,session
from extensions import github
dash = Blueprint(import_name=__name__,name="dash")

@dash.route('/index')
def index():
    if 'github_oauth_token' in session:
        user = github.get('user')
        print(user)
        return f'Logged in as {user["login"]}. <a href="/logout">Logout</a>'
    return 'Not logged in. <a href="/login">Login with GitHub</a>'
