from flask import Flask, redirect, url_for, flash,session
from flask_github import GitHub
from flask import request
from routes.auth import auth
app = Flask(__name__)
from extensions import github
from config.config_app import AppConfig
from routes.dash import dash


app.config.from_object(AppConfig)


github.init_app(app)
app.register_blueprint(auth)
app.register_blueprint(dash)

if __name__ == '__main__':
    app.run(debug=True)