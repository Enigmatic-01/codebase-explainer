import os 
from dotenv import load_dotenv
load_dotenv()
class AppConfig:
    SECRET_KEY = os.getenv("SECRET_KEY")
    GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
    GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
    GITHUB_CALLBACK_URL = os.getenv("GITHUB_CALLBACK_URL")