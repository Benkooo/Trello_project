import pymysql.cursors
import config
import hashlib

import random
import string

import json

class Database:
    def __init__(self):
        self.init_connection()

    def __del__(self):
        try:
            self.connection.close()
        except:
            pass

    def init_connection(self):
        self.connection = pymysql.connect(host=config.DB_HOST,
                                          user=config.DB_USER,
                                          password=config.DB_PASSWORD,
                                          db=config.DB_NAME,
                                          port=config.DB_PORT,
                                          charset='utf8mb4',
                                          cursorclass=pymysql.cursors.DictCursor
        )

    def _login_exists(self, unique_login):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT id FROM users WHERE unique_login=%s"
                cursor.execute(sql, (unique_login,))
                result = cursor.fetchone()
                return 'id' in result
        except:
            return False
        finally:
            self.connection.close()

    def _generate_unique_login(self):
        unique_login = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(25))
        while Database()._login_exists(unique_login):
            unique_login = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(25))
        return unique_login

    def get_username_from_unique_login(self, unique_login):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT username FROM users WHERE unique_login=%s"
                cursor.execute(sql, (unique_login,))
                result = cursor.fetchone()
                return result['username']
        except:
            return None
        finally:
            self.connection.close()

    def add_user(self, username, email, password):
        try:
            unique_login = self._generate_unique_login()
            with self.connection.cursor() as cursor:
                hashed = hashlib.sha256((password + config.SALT).encode('utf-8'))
                sql = "INSERT INTO users (username, email, password, unique_login) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (username, email, hashed.hexdigest(), unique_login))

            self.connection.commit()
            return True
        except:
            return False
        finally:
            self.connection.close()

    def update_username(self, old_username, new_username):
        try:
            with self.connection.cursor() as cursor:
                sql = "UPDATE users SET username=%s WHERE username=%s;"
                cursor.execute(sql, (new_username, old_username))
            self.connection.commit()
            return True
        except:
            return False
        finally:
            self.connection.close()

    def update_password(self, old_password, new_password, username):
        try:
            with self.connection.cursor() as cursor:
                hashed_old = hashlib.sha256((old_password + config.SALT).encode('utf-8'))
                hashed_new = hashlib.sha256((new_password + config.SALT).encode('utf-8'))
                sql = "UPDATE users SET password=%s WHERE username=%s AND password=%s;"
                cursor.execute(sql, (hashed_new.hexdigest(), username, hashed_old.hexdigest()))
            self.connection.commit()
            return True
        except:
            return False
        finally:
            self.connection.close()

    def update_email(self, old_email, new_email, username):
        try:
            with self.connection.cursor() as cursor:
                sql = "UPDATE users SET email=%s WHERE email=%s AND username=%s;"
                cursor.execute(sql, (new_email, old_email, username))
            self.connection.commit()
            return True
        except:
            return False
        finally:
            self.connection.close()

    def check_password(self, email, password):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT password FROM users WHERE email=%s"
                cursor.execute(sql, (email,))
                result = cursor.fetchone()
                hashed = hashlib.sha256((password + config.SALT).encode('utf-8'))
                if result and 'password' in result and result['password'] == hashed.hexdigest():
                    return True
        except:
            return False
        finally:
            self.connection.close()
        return False

    def get_username_unique_login_from_email(self, email):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT username, unique_login FROM users WHERE email=%s"
                cursor.execute(sql, (email,))
                result = cursor.fetchone()
                return result['username'], result['unique_login']
        except:
            return None, None
        finally:
            self.connection.close()

    def get_userid_from_username(self, username):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT id FROM users WHERE username=%s"
                cursor.execute(sql, (username,))
                result = cursor.fetchone()
                return result['id']
        except:
            return None
        finally:
            self.connection.close()
        return None

    def user_id_in_team(self, team_name, user_id):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT id FROM teams WHERE team_name=%s AND user_id=%s"
                cursor.execute(sql, (team_name, user_id))
                result = cursor.fetchone()
                return 'id' in result
        except:
            return False
        finally:
            self.connection.close()
        return False

    def _get_teams_unique_id(self, team_name, user_id):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT unique_id FROM teams WHERE team_name=%s AND user_id=%s"
                cursor.execute(sql, (team_name, user_id))
                result = cursor.fetchone()
                return result['unique_id']
        except:
            return None
        finally:
            self.connection.close()
        return None

    def team_name_exists(self, team_name):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT * FROM teams WHERE team_name=%s"
                cursor.execute(sql, (team_name,))
                result = cursor.fetchall()
                return result
        except:
            return None
        finally:
            self.connection.close()
        return None

    def add_team_members(self, team_name, team_members, username):
        try:
            user_id = Database().get_userid_from_username(username)
            with self.connection.cursor() as cursor:
                sql = "SELECT unique_id FROM teams WHERE team_name=%s AND user_id=%s"
                cursor.execute(sql, (team_name, user_id))
                result = cursor.fetchone()
                return Database().add_team(team_name, team_members, result['unique_id'])
        except:
            return False
        finally:
            self.connection.close()
        return False

    def add_team(self, team_name, team_members, unique_id=''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(200))):
        team_members = list(set(team_members))
        try:
            data = []
            for username in team_members:
                user_id = Database().get_userid_from_username(username)
                if user_id is None:
                    raise Exception('user id not found')
                if Database().user_id_in_team(team_name, user_id):
                    raise Exception('user already in team')
                data.append((team_name, user_id, unique_id))
            with self.connection.cursor() as cursor:
                sql = "INSERT INTO teams (team_name, user_id, unique_id) VALUES (%s, %s, %s)"
                cursor.executemany(sql, data)

            self.connection.commit()
            return True
        except:
            return False
        finally:
            self.connection.close()

    def get_board_ids_from_unique_id(self, unique_id):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT board_id FROM user_boards WHERE unique_id=%s"
                cursor.execute(sql, (unique_id,))
                result = cursor.fetchall()
                return result
        finally:
            self.connection.close()

    def remove_teams(self, team_name, username):
        try:
            user_id = Database().get_userid_from_username(username)
            unique_id = Database()._get_teams_unique_id(team_name, user_id)
            board_ids = [elem['board_id'] for elem in Database().get_board_ids_from_unique_id(unique_id)]
            with self.connection.cursor() as cursor:
                sql = "DELETE FROM boards WHERE id=%s"
                cursor.executemany(sql, board_ids)
                sql = "DELETE FROM labels WHERE board_id=%s"
                cursor.executemany(sql, board_ids)
                sql = "DELETE FROM user_boards WHERE unique_id=%s"
                cursor.execute(sql, (unique_id,))
                sql = "DELETE FROM teams WHERE unique_id=%s"
                cursor.execute(sql, (unique_id,))
            self.connection.commit()
            return True
        except:
            return False
        finally:
            self.connection.close()

    """
CREATE TABLE IF NOT EXISTS personal (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int(11) NOT NULL,
    unique_id varchar(255) COLLATE utf8_bin NOT NULL
);

CREATE TABLE IF NOT EXISTS user_boards (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    board_id int(11) NOT NULL,
    unique_id varchar(255) COLLATE utf8_bin NOT NULL,
    team BIT,
    starred BIT
);

CREATE TABLE IF NOT EXISTS boards (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    board_name varchar(255) COLLATE utf8_bin NOT NULL,
    bg_color varchar(255) COLLATE utf8_bin,
    url varchar(255) UNIQUE COLLATE utf8_bin NOT NULL
);

CREATE TABLE IF NOT EXISTS labels (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    color varchar(255) COLLATE utf8_bin NOT NULL,
    text varchar(255) COLLATE utf8_bin NOT NULL,
    board_id int(11) NOT NULL
);
"""

    def _get_board_id_from_urle(self, url, user_id):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT boards.id FROM boards JOIN user_boards ON user_boards.board_id = boards.id JOIN personal ON personal.unique_id = user_boards.unique_id WHERE boards.url=%s AND personal.user_id=%s"
                cursor.execute(sql, (url, user_id))
                result = cursor.fetchone()
                return result
        finally:
            self.connection.close()

    def remove_board(self, url, username):

        ##select id from boards where url=%s;
        ##rm id from labels where board_id=id;
        ##select unique_id from user_boards where board_id=id;
        ##rm boards unique_id
        ##rm personal unique_id
        try:
            #is_team = False if team_name == '' else True
            user_id = Database().get_userid_from_username(username)
            #unique_id = Database()._get_teams_unique_id(team_name, user_id)
            #board_ids = [elem['board_id'] for elem in Database().get_board_ids_from_unique_id(unique_id)]
            with self.connection.cursor() as cursor:
                ids = Database()._get_board_id_from_urle(url, user_id)
                print(ids)
                #sql = "DELETE FROM boards WHERE id=%s"
                #cursor.execute(sql, (board_id,))
                #sql = "DELETE FROM user_boards WHERE board_id=%s"
                #cursor.execute(sql, (board_id,))
                """sql = "DELETE FROM boards WHERE id=%s"
                cursor.executemany(sql, board_ids)
                sql = "DELETE FROM labels WHERE board_id=%s"
                cursor.executemany(sql, board_ids)
                sql = "DELETE FROM user_boards WHERE unique_id=%s"
                cursor.execute(sql, (unique_id,))
                sql = "DELETE FROM teams WHERE unique_id=%s"
                cursor.execute(sql, (unique_id,))
            self.connection.commit()"""
            return True
        except Exception as e:
            print(e)
            return False
        finally:
            self.connection.close()

    def get_usernames_from_teams_unique_id(self, unique_id):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT username FROM teams JOIN users ON users.id = teams.user_id WHERE unique_id=%s"
                cursor.execute(sql, (unique_id,))
                result = cursor.fetchall()
                return result
        except:
            return []
        finally:
            self.connection.close()

    def get_teams(self, username):
        try:
            user_id = Database().get_userid_from_username(username)
            with self.connection.cursor() as cursor:
                sql = "SELECT team_name, unique_id FROM teams WHERE user_id=%s"
                cursor.execute(sql, (user_id,))
                result = cursor.fetchall()
                for elem in result:
                    elem['usernames'] = Database().get_usernames_from_teams_unique_id(elem['unique_id'])
                    del elem['unique_id']
                    elem['usernames'] = [_['username'] for _ in elem['usernames']]
                return result
        except:
            return []
        finally:
            self.connection.close()
        return []

    def url_exists(self, url):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT id FROM boards WHERE url=%s"
                cursor.execute(sql, (url,))
                result = cursor.fetchone()
                return 'id' in result
        except:
            return False
        finally:
            self.connection.close()

    def generate_url(self):
        url = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
        while Database().url_exists(url):
            url = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
        return url

    def _new_board(self, board_name, bg_color):
        try:
            url = self.generate_url()
            board_id = 0
            with self.connection.cursor() as cursor:
                sql = "INSERT INTO boards (board_name, bg_color, url) VALUES (%s, %s, %s)"
                cursor.execute(sql, (board_name, bg_color, url))
                board_id = cursor.lastrowid

            self.connection.commit()
            return board_id
        finally:
            self.connection.close()

    def new_personal(self, user_id, unique_id):
        try:
            with self.connection.cursor() as cursor:
                sql = "INSERT INTO personal (user_id, unique_id) VALUES (%s, %s)"
                cursor.execute(sql, (user_id, unique_id))

            self.connection.commit()
            return True
        except:
            return False
        finally:
            self.connection.close()

    def board_exists(self, team_name, board_name, username):
        try:
            user_id = Database().get_userid_from_username(username)
            with self.connection.cursor() as cursor:
                sql = "SELECT boards.id FROM boards JOIN user_boards ON user_boards.board_id = boards.id JOIN personal ON personal.unique_id = user_boards.unique_id WHERE boards.board_name=%s AND personal.user_id=%s"
                cursor.execute(sql, (board_name, user_id))
                result = cursor.fetchone()
                return 'id' in result
        except:
            return False
        finally:
            self.connection.close()

    def _new_userboard(self, board_id, unique_id, team, starred):
        try:
            with self.connection.cursor() as cursor:
                sql = "INSERT INTO user_boards (board_id, unique_id, team, starred) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (board_id, unique_id, team, starred))

            self.connection.commit()
            return True
        except:
            return False
        finally:
            self.connection.close()

    def add_label(self, color, text, board_id):
        try:
            with self.connection.cursor() as cursor:
                sql = "INSERT INTO labels (color, text, board_id) VALUES (%s, %s, %s)"
                cursor.execute(sql, (color, text, board_id))

            self.connection.commit()
        finally:
            self.connection.close()

    def create_board(self, team_name, board_name, bg_color, username):
        try:
            board_id = Database()._new_board(board_name, bg_color)
            user_id = Database().get_userid_from_username(username)
            if team_name == '':
                unique_id = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(200))
                if not Database().new_personal(user_id, unique_id):
                    raise Exception("cannot create new personal field")
                if not Database()._new_userboard(board_id, unique_id, False, False):
                    raise Exception("cannot create new board")
            else:
                unique_id = Database()._get_teams_unique_id(team_name, user_id)###essayer!!!
                if not Database()._new_userboard(board_id, unique_id, True, False):
                    raise Exception("cannot create new board")
            labels = (
                {'color': 'green', 'text': ''},
                {'color': 'yellow', 'text': ''},
                {'color': 'orange', 'text': ''},
                {'color': 'red', 'text': ''},
                {'color': 'purple', 'text': ''},
                {'color': 'blue', 'text': ''},
                {'color': 'sky', 'text': ''},
                {'color': 'lime', 'text': ''},
                {'color': 'pink', 'text': ''},
                {'color': 'black', 'text': ''},
                {'color': '', 'text': ''}##no color
            )
            for label in labels:
                Database().add_label(label['color'], label['text'], board_id)
            return True
        except:
            return False
        finally:
            self.connection.close()

    def _get_personal_members(self, unique_id):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT username FROM personal JOIN users ON users.id = personal.user_id WHERE unique_id=%s"
                cursor.execute(sql, (unique_id,))
                result = cursor.fetchall()
                return [elem['username'] for elem in result]
        finally:
            self.connection.close()

    def _get_team_members(self, unique_id):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT username FROM teams JOIN users ON users.id = teams.user_id WHERE unique_id=%s"
                cursor.execute(sql, (unique_id,))
                result = cursor.fetchall()
                return [elem['username'] for elem in result]
        finally:
            self.connection.close()

    def _get_unique_ids_and_members(self, username, personal):
        try:
            user_id = Database().get_userid_from_username(username)
            with self.connection.cursor() as cursor:
                sql = "SELECT unique_id FROM personal WHERE user_id=%s" if personal else "SELECT unique_id, team_name FROM teams WHERE user_id=%s"
                cursor.execute(sql, (user_id,))
                result = cursor.fetchall()
                ret = []
                if personal:
                    for elem in result:
                        tmp = {'members': Database()._get_personal_members(elem['unique_id']), 'unique_id': elem['unique_id']}
                        ret.append(tmp)
                else:
                    for elem in result:
                        tmp = {'members': Database()._get_team_members(elem['unique_id']), 'unique_id': elem['unique_id'], 'team_name': elem['team_name']}
                        ret.append(tmp)
                return ret
        except:
            return []
        finally:
            self.connection.close()

    def _get_user_board_personal_from_unique_id(self, unique_id):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT starred, bg_color, board_name, url FROM user_boards JOIN boards ON boards.id = user_boards.board_id WHERE unique_id=%s AND team=%s"
                cursor.execute(sql, (unique_id, False))
                result = cursor.fetchone()
                return result
        finally:
            self.connection.close()

    def get_personal_boards(self, username):
        try:
            data = Database()._get_unique_ids_and_members(username, personal=True)
            ret = []
            for elem in data:
                res = Database()._get_user_board_personal_from_unique_id(elem['unique_id'])
                tmp = {
                    'members': elem['members'],
                    'starred': False if res['starred'] == b'\x00' else True,
                    'bg_color': res['bg_color'],
                    'board_name': res['board_name'],
                    'url': res['url']
                }
                ret.append(tmp)
            return ret
        except:
            return []

    def _get_user_board_team_from_unique_id(self, unique_id):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT starred, bg_color, board_name, url FROM user_boards JOIN boards ON boards.id = user_boards.board_id WHERE unique_id=%s AND team=%s"
                cursor.execute(sql, (unique_id, True))
                result = cursor.fetchall()
                return result
        finally:
            self.connection.close()

    def get_team_boards(self, username):
        try:
            data = Database()._get_unique_ids_and_members(username, personal=False)
            ret = []
            for elem in data:
                res = Database()._get_user_board_team_from_unique_id(elem['unique_id'])
                tmp = {
                    'members': elem['members'],
                    'boards': [
                        {
                            'starred': False if board['starred'] == b'\x00' else True,
                            'bg_color': board['bg_color'],
                            'url': board['url'],
                            'board_name': board['board_name']
                        } for board in res],
                    'team_name': elem['team_name']
                }
                ret.append(tmp)
            return ret
        except:
            return []

    def _get_board_id_from_url(self, url):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT id FROM boards WHERE url=%s"
                cursor.execute(sql, (url,))
                result = cursor.fetchone()
                return result['id']
        finally:
            self.connection.close()

    def _board_data_set_up(self, board_id):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT id FROM board_data WHERE board_id=%s"
                cursor.execute(sql, (board_id,))
                result = cursor.fetchone()
                return 'id' in result
        except:
            return False
        finally:
            self.connection.close()

    def change_board_data(self, url, _json):
        try:
            _json = json.dumps(_json)
            board_id = Database()._get_board_id_from_url(url)
            sql = "INSERT INTO board_data (json, board_id) VALUES (%s, %s)" if not Database()._board_data_set_up(board_id) else "UPDATE board_data SET json=%s WHERE board_id=%s;"
            with self.connection.cursor() as cursor:
                cursor.execute(sql, (_json, board_id))
            self.connection.commit()
            return True
        finally:
            self.connection.close()

    def get_board_data(self, url):
        try:
            board_id = Database()._get_board_id_from_url(url)
            with self.connection.cursor() as cursor:
                sql = "SELECT json FROM board_data WHERE board_id=%s"
                cursor.execute(sql, (board_id,))
                result = cursor.fetchone()
                return json.loads(result['json'])
        except:
            return []
        finally:
            self.connection.close()
