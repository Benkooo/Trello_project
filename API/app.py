from flask import Flask, jsonify, request, session
from flask_cors import CORS

import config

import random
import string

import db

app = Flask(__name__)
app.config["SECRET_KEY"] = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(128))
CORS(app)

@app.route('/', methods=['GET'])
def home():
    if not session.get('logged_in'):
        return jsonify({'success': False, 'message': 'please log in'})
    return jsonify({'success': True})

@app.route('/register', methods=['POST'])
def register():
    if not all(_ in request.json for _ in ('password', 'username', 'email')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    print(request.json['password'])
    print(request.json['username'])
    print(request.json['email'])
    if db.Database().add_user(request.json['username'], request.json['email'], request.json['password']):
        session['logged_in'] = True
        session['username'] = request.json['username']
        return jsonify({'success': True, 'message': 'Registered successfully'})
    else:
        return jsonify({'success': False, 'message': 'The username or the email exists'})

@app.route('/login', methods=['POST'])
def login():
    if not all(_ in request.json for _ in ('password', 'email')):
        return jsonify({'success': False, 'message': 'please provide all informations'})
    print(request.json['email'])
    print(request.json['password'])
    my_db = db.Database()
    if my_db.check_password(request.json['email'], request.json['password']):
        session['logged_in'] = True
        session['username'] = db.Database().get_username_from_email(request.json['email'])
        return jsonify({'success': True, 'message': 'Successfully logged in'})
    else:
        return jsonify({'success': False, 'message': 'username or password is false'})

@app.route('/logout', methods=['POST'])
def logout():
    session['logged_in'] = False
    if 'username' in session:
        del session['username']
    return jsonify({'success': True, 'message': 'Successfully logged out'})

@app.route('/add_team', methods=['POST'])
def add_team():
    if not ('logged_in' in session and session['logged_in'] and 'username' in session):
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('team_name', 'team_members')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    if not db.Database().add_team(request.json['team_name'], [session['username']] + request.json['team_members']):
        return jsonify({'success': False, 'message': 'Verify team members spelling, or user already in team'})
    return jsonify({'success': True, 'message': 'Successfully added new team'})

@app.route('/add_team_members', methods=['POST'])
def add_team_members():
    if not ('logged_in' in session and session['logged_in'] and 'username' in session):
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('team_name', 'team_members')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    if not db.Database().team_name_exists(request.json['team_name']):
        return jsonify({'success': False, 'message': "The team name doesn't exists"})
    if not db.Database().add_team_members(request.json['team_name'], request.json['team_members'], session['username']):
        return jsonify({'success': False, 'message': 'Verify team members spelling, or user already in team'})
    return jsonify({'success': True, 'message': f"Successfully added new team member{'s' if len(request.json['team_members']) > 1 else ''}"})

"""
{
team_name: "my team"
}
"""
@app.route('/remove_team', methods=['POST'])
def remove_team():
    if not ('logged_in' in session and session['logged_in'] and 'username' in session):
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('team_name',)):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    ##verifier si la team existe
    return jsonify({'success': True, 'message': 'Successfully removed team'})

"""
{
team_name: "my team",
team_member: "jaques"
}
"""
@app.route('/remove_team_member', methods=['POST'])
def remove_team_member():
    if not ('logged_in' in session and session['logged_in'] and 'username' in session):
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('team_name', 'team_member')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    ##verifier si la team existe
    ##verifier si le username existe
    ##verifier si le username est dans la team
    return jsonify({'success': True, 'message': 'Successfully removed team member'})




"""
{
board_name: "test",
team_name: "" -> si chaine vide c'est une board perso, sinon en team
"""
@app.route('/add_board', methods=['POST'])
def add_board():
    if not ('logged_in' in session and session['logged_in'] and 'username' in session):
        return jsonify({'success': False, 'message': 'Please log in'})
    if not all(_ in request.json for _ in ('board_name', 'team_name')):
        return jsonify({'success': False, 'message': 'Please provide all informations'})
    print(session['username'])
    print(request.json['board_name'])
    print(request.json['team_name'])
    if (request.json['team_name'] != '') and (not db.Database().team_name_exists(request.json['team_name'])):
        return jsonify({'success': False, 'message': "The team name doesn't exists"})

    return jsonify({'success': True, 'message': 'Successfully added new board'})

@app.route('/<username>/boards', methods=['POST'])
def boards(username):
    print(username)
    if 'logged_in' in session and session['logged_in'] and 'username' in session:
        if username == session['username']:
            print('username in session!!!')
            return jsonify({'success': True, 'message': 'ok'})
        else:
            return jsonify({'success': False, 'message': 'Access not allowed'})
    print('not logged in!')
    return jsonify({'success': False, 'message': 'You are not logged in'})

@app.route('/add_list', methods=['POST'])
def add_list():
    print('adding list')
    return jsonify({'success': True, 'message': 'Successfully added list'})

"""
{
  members: ["alfred", "albert"],
  labels: [{color: "#FF00FF", text: "label text"}, {color: "#00FF00", text: "another label text"}],
  title: "This is a title",
  index: 0,//si plusieurs cartes l'index peut aller de 0 au nombre de cartes
  column_name: "First_column"
}
"""
@app.route('/add_card', methods=['POST'])
def add_card():
    print(request.json)
    return jsonify({'success': True, 'message': 'Successfully added card'})

@app.route('/<card_id>/modify_card', methods=['POST'])
def modify_card(card_id):
    print(card_id)
    print(request.json)
    return jsonify({'success': True, 'message': 'Successfully modified card'})

if __name__ == "__main__":
    app.run(host=config.FLASK_HOST,
            port=config.FLASK_PORT,
            debug=config.FLASK_DEBUG,
            threaded=config.FLASK_THREADED
    )
