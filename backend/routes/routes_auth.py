from flask import redirect, flash, session, Blueprint, request
from extensions import github
from config.supabase_config import supabase

auth = Blueprint("auth", __name__)


@auth.route('/login')
def login():
    return github.authorize(scope='user')


@auth.route('/github-callback')
@github.authorized_handler
def authorized(oauth_token):
    next_url = request.args.get('next') or '/index'

    if oauth_token is None:
        flash("Authentication failed.")
        return redirect(next_url)

    # Save token
    session['github_oauth_token'] = oauth_token

    # 🔥 Fetch GitHub user
    github_user = github.get('/user')

    user_data = {
        "id": github_user["id"],
        "name": github_user.get("name") or github_user["login"],
        "email": github_user.get("email"),
        "login": github_user["login"]
    }
    session["user"] = user_data

    # 🔥 Insert / Upsert into Supabase
    supabase.table("users").upsert(
        user_data,
        on_conflict="id"
    ).execute()

    # Optional: store user info in session
    session["user"] = {
        "id": github_user["id"],
        "login": github_user["login"],
        "name": user_data["name"]
    }

    flash("You were successfully logged in with GitHub.")
    return redirect(next_url)


@github.access_token_getter
def get_github_oauth_token():
    
    return session.get('github_oauth_token')


@auth.route('/logout')
def logout():
    session.clear()
    return redirect('/index')
