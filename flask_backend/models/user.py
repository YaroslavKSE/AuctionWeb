from flask_login import UserMixin


class User(UserMixin):
    def __init__(self, user):
        self.id = str(user['_id'])
        self.email = user['email']
        self.name = user['name']
        self.surname = user['surname']
        self.password = user['password']
