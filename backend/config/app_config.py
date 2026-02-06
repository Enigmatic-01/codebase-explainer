import os 
from dotenv import load_dotenv
load_dotenv()
class AppConfig:
    SECRET_KEY = os.getenv("SECRET_KEY")
    GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
    GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
    GITHUB_CALLBACK_URL = os.getenv("GITHUB_CALLBACK_URL")

 
    # ✅ Required for cross-site login on Render
    SESSION_COOKIE_SAMESITE = "None"
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True

    # helps behind Render proxy
    PREFERRED_URL_SCHEME = "https"

