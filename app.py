from flask import Flask, redirect, url_for, flash,session
from flask_github import GitHub
from flask import request
from routes.auth import auth
app = Flask(__name__)
from extensions import github
from config.config_app import AppConfig



app.config.from_object(AppConfig)


github.init_app(app)
app.register_blueprint(auth)
@app.route('/index')
def index():
    if 'github_oauth_token' in session:
        user = github.get('user')
        print(user)
        return f'Logged in as {user["login"]}. <a href="/logout">Logout</a>'
    return 'Not logged in. <a href="/login">Login with GitHub</a>'


if __name__ == '__main__':
    app.run(debug=True)