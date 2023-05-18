from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    user_type_id = db.Column(db.Integer, db.ForeignKey(
        'user_type.id'), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "user_type": self.user_type
            # do not serialize the password, its a security breach
        }


class UserType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, unique=True, nullable=False)
    user_types = db.relationship("User", backref="type")
