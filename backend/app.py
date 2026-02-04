from flask import Flask
from routes.routes_auth import auth
from routes.routes_dash import dash
from routes.routes_rag import rag
from routes.routes_chat import chat
from extensions import github
from config.app_config import AppConfig

def create_app():
    app = Flask(__name__)

    app.config.from_object(AppConfig)

    github.init_app(app)

    app.register_blueprint(auth)
    app.register_blueprint(dash)
    app.register_blueprint(rag)
    app.register_blueprint(chat)

    return app
