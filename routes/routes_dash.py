from flask import Blueprint,session,render_template
from extensions import github
dash = Blueprint(import_name=__name__,name="dash")

@dash.route('/index')
def index():
    if 'github_oauth_token' in session:
        user = github.get('user')
        print(user)
        return render_template("dash.html")
    return render_template("dash.html")
