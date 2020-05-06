import pymysql.cursors
import config
import hashlib

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
        finally:
            self.connection.close()
        return None
