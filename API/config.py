_DOCKER = True

FLASK_HOST = '0.0.0.0'
FLASK_PORT = 5000
FLASK_DEBUG = False
FLASK_THREADED = True

DB_HOST = 'localhost'
DB_PORT = 3306
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'trello'

if _DOCKER:
    DB_HOST = 'db'
    DB_PASSWORD = 'root'
    

SALT = 'zmeflzejZEFI'
