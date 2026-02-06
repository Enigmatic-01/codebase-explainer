from flask import Flask
from routes.routes_auth import auth
import os
from routes.routes_rag import rag
from routes.routes_chat import chat
from extensions import github
from config.app_config import AppConfig
from flask_cors import CORS # type: ignore


frontend_url = os.getenv("FRONT_API")
def create_app():
    app = Flask(__name__)

    app.config.from_object(AppConfig)

    github.init_app(app)
    CORS(
    app,
    supports_credentials=True,
    origins=[frontend_url]
)
    app.register_blueprint(auth)
 
    app.register_blueprint(rag)
    app.register_blueprint(chat)

    return app
