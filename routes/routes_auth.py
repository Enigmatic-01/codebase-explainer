from flask import Flask, redirect, url_for, flash,session,Blueprint
from flask_github import GitHub
from flask import request
from extensions import github
auth  = Blueprint("auth",__name__)

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

    session['github_oauth_token'] = oauth_token
    flash("You were successfully logged in with GitHub.")
    return redirect(next_url)

@github.access_token_getter
def get_github_oauth_token():
    return session.get('github_oauth_token')


@auth.route('/logout')
def logout():
    session.pop('github_oauth_token', None)
    return redirect('/index')
