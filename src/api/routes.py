"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, UserType
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def user_signup():
    body = request.json
    new_user = User(
        email=body["email"],
        password=body["password"],
        is_active=body["is_active"],
        type_id=body["user_type"]
    )
    db.session.add(new_user)
    db.session.commit()
    response_body = {"Users": "User created successfully"}

    return jsonify(response_body), 200


@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({"msg": "hello"})
