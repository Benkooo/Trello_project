import pymysql.cursors
import config
import hashlib

import random
import string

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

    def add_user(self, username, email, password):
        try:
            with self.connection.cursor() as cursor:
                hashed = hashlib.sha256((password + config.SALT).encode('utf-8'))
                sql = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
                cursor.execute(sql, (username, email, hashed.hexdigest()))

            self.connection.commit()

            with self.connection.cursor() as cursor:
                # Read a single record
                sql = "SELECT id, password FROM users WHERE email=%s"
                cursor.execute(sql, (email,))
                result = cursor.fetchone()
                print(result)
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

    def get_username_from_email(self, email):
        try:
            with self.connection.cursor() as cursor:
                sql = "SELECT username FROM users WHERE email=%s"
                cursor.execute(sql, (email,))
                result = cursor.fetchone()
                return result['username']
        except:
            return None
        finally:
            self.connection.close()
        return None

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
        print(team_members)
        team_members = list(set(team_members))
        try:
            data = []
            ##ajouter une boucle pour le random
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
