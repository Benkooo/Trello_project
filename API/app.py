from flask import Flask, jsonify, request
from flask_cors import CORS

import config

import random
import string

import db

import sys

app = Flask(__name__)
app.config["SECRET_KEY"] = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(128))
CORS(app)

@app.route('/', methods=['GET'])
def home():
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'please log in'})
    return jsonify({'success': True})

def get_username(header):
    if 'unique_login' not in header:
        return None
    return db.Database().get_username_from_unique_login(header['unique_login'])

def is_logged_in(header):
    if get_username(header) is None:
        return False
    return True

@app.route('/register', methods=['POST'])
def register():
    if not all(_ in request.json for _ in ('password', 'username', 'email')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    if db.Database().add_user(request.json['username'], request.json['email'], request.json['password']):
        return jsonify({'success': True, 'message': 'Registered successfully'})
    return jsonify({'success': False, 'message': 'The username or the email exists'})

@app.route('/login', methods=['POST'])
def login():
    if not all(_ in request.json for _ in ('password', 'email')):
        return jsonify({'success': False, 'message': 'please provide all informations'})
    if db.Database().check_password(request.json['email'], request.json['password']):
        username, unique_login = db.Database().get_username_unique_login_from_email(request.json['email'])
        return jsonify({'success': True, 'message': 'Successfully logged in', 'username': username, 'unique_login': unique_login})
    return jsonify({'success': False, 'message': 'username or password is false'})

@app.route('/logout', methods=['POST'])
def logout():
    return jsonify({'success': True, 'message': 'Successfully logged out'})

@app.route('/update_username', methods=['POST'])
def update_username():
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('old_username', 'new_username')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    if username != request.json['old_username']:
        return jsonify({'success': False, 'message': 'Incorrect username'})
    if request.json['old_username'] == request.json['new_username']:
        return jsonify({'success': False, 'message': 'Usernames are the same'})
    if db.Database().update_username(request.json['old_username'], request.json['new_username']):
        return jsonify({'success': True, 'message': 'Successfully updated username'})
    return jsonify({'success': False, 'message': "Could not update username"})

@app.route('/update_password', methods=['POST'])
def update_password():
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('old_password', 'new_password', 'username')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    if username != request.json['username']:
        return jsonify({'success': False, 'message': 'Incorrect username'})
    if request.json['old_password'] == request.json['new_password']:
        return jsonify({'success': False, 'message': 'Passwords are the same'})
    if db.Database().update_password(request.json['old_password'], request.json['new_password'], request.json['username']):
        return jsonify({'success': True, 'message': 'Successfully updated password'})
    return jsonify({'success': False, 'message': "Could not update password"})

@app.route('/update_email', methods=['POST'])
def update_email():
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('old_email', 'new_email', 'username')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    if username != request.json['username']:
        return jsonify({'success': False, 'message': 'Incorrect username'})
    if request.json['old_email'] == request.json['new_email']:
        return jsonify({'success': False, 'message': 'Emails are the same'})
    if db.Database().update_email(request.json['old_email'], request.json['new_email'], request.json['username']):
        return jsonify({'success': True, 'message': 'Successfully updated email'})
    return jsonify({'success': False, 'message': "Could not update email"})


@app.route('/add_team', methods=['POST'])
def add_team():
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('team_name', 'team_members')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    if not db.Database().add_team(request.json['team_name'], [username] + request.json['team_members']):
        return jsonify({'success': False, 'message': 'Verify team members spelling, or user already in team'})
    return jsonify({'success': True, 'message': 'Successfully added new team'})

@app.route('/add_team_members', methods=['POST'])
def add_team_members():
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('team_name', 'team_members')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    if not db.Database().team_name_exists(request.json['team_name']):
        return jsonify({'success': False, 'message': "The team name doesn't exists"})
    if not db.Database().add_team_members(request.json['team_name'], request.json['team_members'], username):
        return jsonify({'success': False, 'message': 'Verify team members spelling, or user already in team'})
    return jsonify({'success': True, 'message': f"Successfully added new team member{'s' if len(request.json['team_members']) > 1 else ''}"})

@app.route('/get_teams', methods=['GET'])
def get_teams():
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    return jsonify({'success': True, 'message': 'ok', 'data': db.Database().get_teams(username)})

@app.route('/remove_team', methods=['POST'])
def remove_team():
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('team_name',)):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    if not db.Database().team_name_exists(request.json['team_name']):
        return jsonify({'success': False, 'message': "The team name doesn't exists"})
    if not db.Database().remove_teams(request.json['team_name'], username):
        return jsonify({'success': False, 'message': "Failed to remove team"})
    return jsonify({'success': True, 'message': 'Successfully removed team'})

"""
{
team_name: "my team",
team_member: "jaques"
}
"""
@app.route('/remove_team_member', methods=['POST'])
def remove_team_member():
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('team_name', 'team_member')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    ##verifier si la team existe
    ##verifier si le username existe
    ##verifier si le username est dans la team
    return jsonify({'success': True, 'message': 'Successfully removed team member'})


@app.route('/add_board', methods=['POST'])
def add_board():
    print(request.json, file=sys.stderr)
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('board_name', 'team_name', 'bg_color')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    if (request.json['team_name'] != '') and (not db.Database().team_name_exists(request.json['team_name'])):
        return jsonify({'success': False, 'message': "The team name doesn't exists"})
    if db.Database().board_exists(request.json['team_name'], request.json['board_name'], username):
        return jsonify({'success': False, 'message': "There is already a board with the same name"})
    if not db.Database().create_board(request.json['team_name'], request.json['board_name'], request.json['bg_color'], username):
        return jsonify({'success': False, 'message': "Could not create new board"})
    return jsonify({'success': True, 'message': 'Successfully added new board'})

@app.route('/remove_board', methods=['POST'])
def remove_board():
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('url',)):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    if not db.Database().url_exists(request.json['url']):
        return jsonify({'success': False, 'message': "The board doesn't exists"})
    if not db.Database().remove_board(request.json['url'], username):
        return jsonify({'success': False, 'message': "Failed to remove board"})
    return jsonify({'success': True, 'message': 'Successfully removed board'})


@app.route('/get_personal_boards', methods=['GET'])
def get_personal_boards():
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    return jsonify({'success': True, 'message': 'ok', 'data': db.Database().get_personal_boards(username)})

@app.route('/get_team_boards', methods=['GET'])
def get_team_boards():
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    return jsonify({'success': True, 'message': 'ok', 'data': db.Database().get_team_boards(username)})

@app.route('/<url>/change_board_data', methods=['POST'])
def change_board_data(url):
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('json',)):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    if not db.Database().change_board_data(url, request.json['json']):
        return jsonify({'success': False, 'message': "Could not change board informations"})
    return jsonify({'success': True, 'message': 'Successfully changed board informations'})

@app.route('/<url>/get_board_data', methods=['POST'])
def get_board_data(url):
    username = get_username(request.headers)
    if username is None:
        return jsonify({'success': False, 'message': 'Please log in'})
    return jsonify({'success': True, 'message': 'ok', 'data': db.Database().get_board_data(url)})

if __name__ == "__main__":
    app.run(host=config.FLASK_HOST,
            port=config.FLASK_PORT,
            debug=config.FLASK_DEBUG,
            threaded=config.FLASK_THREADED
    )
