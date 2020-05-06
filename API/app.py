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
    if not all(_ in request.form for _ in ('password', 'username', 'email')):
        return jsonify({'success': False, 'message': 'Please fill the form'})
    print(request.form['password'])
    print(request.form['username'])
    print(request.form['email'])
    my_db = db.Database()
    my_db.add_user(request.form['username'], request.form['email'], request.form['password'])
    session['logged_in'] = True
    session['username'] = request.form['username']
    return jsonify({'success': True, 'message': 'Registered successfully'})

@app.route('/login', methods=['POST'])
def login():
    if not all(_ in request.form for _ in ('password', 'username')):
        return jsonify({'success': False, 'message': 'please fill the form'})
    print(request.form['username'])
    print(request.form['password'])
    my_db = db.Database()
    if my_db.check_password(request.form['username'], request.form['password']):
        session['logged_in'] = True
        session['username'] = request.form['username']
        return jsonify({'success': True, 'message': 'Successfully logged in'})
    else:
        return jsonify({'success': False, 'message': 'username or password is false'})

@app.route('/logout', methods=['POST'])
def logout():
    session['logged_in'] = False
    if 'username' in session:
        del session['username']
    return jsonify({'success': True, 'message': 'Successfully logged out'})

@app.route('/<username>/boards', methods=['POST', 'GET'])
def boards(username):
    #session['logged_in'] = False
    print(username)
    if 'logged_in' in session and session['logged_in'] and 'username' in session:
        if username == session['username']:
            print('username in session!!!')
            return jsonify({'success': True, 'message': 'ok'})
        else:
            return jsonify({'success': False, 'message': 'Access not allowed'})
    print('not logged in!')
    return jsonify({'success': False, 'message': 'You are not logged in'})

if __name__ == "__main__":
    app.run(host=config.FLASK_HOST,
            port=config.FLASK_PORT,
            debug=config.FLASK_DEBUG,
            threaded=config.FLASK_THREADED
    )
