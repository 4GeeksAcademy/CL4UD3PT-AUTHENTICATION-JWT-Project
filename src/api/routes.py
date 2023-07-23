"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import datetime


api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def user_signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg": "Bad username or password"}), 400
    
    new_user = User(
        email=email,
        password=password,
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()
    response_body = {"msg": "User created successfully"}

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"msg": "Bad username or password"}), 400

    access_token = create_access_token(
        identity=user.email, expires_delta=datetime.timedelta(hours=1))

    return jsonify({'access_token': access_token}), 200



@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({"msg": "hello"})
