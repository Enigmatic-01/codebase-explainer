from flask import Flask
from routes.auth import auth
from routes.dash import dash
from routes.rag import rag
from routes.chat import chat
from extensions import github
from config.config_app import AppConfig

def create_app():
    app = Flask(__name__)

    app.config.from_object(AppConfig)

    github.init_app(app)

    app.register_blueprint(auth)
    app.register_blueprint(dash)
    app.register_blueprint(rag)
    app.register_blueprint(chat)

    return app
