from flask import (Flask,jsonify,request,g,session)
from .db import get_db, close_db
import os
import psycopg2
from werkzeug.security import generate_password_hash,check_password_hash
import cloudinary.uploader
app = Flask(__name__)

app.secret_key = os.environ.get('SECRET_KEY')

@app.before_request
def connect_to_db():
    get_db()


@app.after_request
def disconnevt_from_db(response):
    close_db()
    return response

@app.route('/teams')
def teams():
    query = 'SELECT * FROM teams;'
    g.db['cursor'].execute(query)
    teams = g.db['cursor'].fetchall()
    return jsonify(teams)

@app.route('/stadiums')
def stadiums():
    query = 'SELECT * FROM stadiums;'
    g.db['cursor'].execute(query)
    stadiums = g.db['cursor'].fetchall()
    return jsonify(stadiums)
@app.route('/users')
def users():
    query = 'SELECT * FROM users;'
    g.db['cursor'].execute(query)
    users = g.db['cursor'].fetchall()
    return jsonify(users)

@app.route('/activities')
def activities():
    query = 'SELECT * FROM activities;'
    g.db['cursor'].execute(query)
    activities = g.db['cursor'].fetchall()
    return jsonify(activities)

@app.route('/teams/<teamname>')
def show(teamname):
    cur = g.db['cursor']
    query = """
        SELECT * FROM teams
        WHERE teams.name = %s
    """
    cur.execute(query, (teamname,))
    team = cur.fetchone()
    return jsonify(team)
# New route
@app.route('/activities/new', methods=['POST'])
def new_activities():
    print(request.form)
    name = request.form['name']
    image = request.files['image']
    category= request.form['category']
    description = request.form['description']
    location = request.form['location']
    uploaded_image=cloudinary.uploader.upload(image)
    image_url=uploaded_image['url']
    user = session.get('user',None)
    if user is None:
        return jsonify(success=False,msg='You must be logged in ')
    query = """
        INSERT INTO activities
        (name, user_id,image,category,description,location)
        VALUES (%s, %s, %s,%s,%s,%s)
        RETURNING *
    """
    g.db['cursor'].execute(query, (name, user['id'],image_url,category,description,location))
    g.db['connection'].commit()
    activity = g.db['cursor'].fetchone()
    return jsonify(activity)

# delete route
@app.route('/activities/<activities_id>', methods=['DELETE'])
def delete_activities(activities_id):
    query = """
        DELETE FROM activities
        WHERE id = %s
        RETURNING *
    """
    cur = g.db['cursor']
    cur.execute(query, (activities_id,))
    g.db['connection'].commit()
    activity = cur.fetchone()
    return jsonify(activity)

# update route
@app.route('/activities/<activities_id>', methods=['PUT'])
def update(activities_id):
    name = request.form['name']
    image = request.files['image']
    category= request.form['category']
    description = request.form['description']
    location = request.form['location']
    uploaded_image=cloudinary.uploader.upload(image)
    image_url=uploaded_image['url']
    query = """
        UPDATE activities
        SET name = %s,
        category=%s,
        description=%s,
        location=%s,
        image=%s
        WHERE activities.id = %s
        RETURNING *
    """
    cur = g.db['cursor']
    cur.execute(query, (name,category,description,location,image_url,activities_id))
    g.db['connection'].commit()
    editedActivity = g.db['cursor'].fetchone()
    return jsonify(editedActivity)

# register route
@app.route('/register',methods=['POST'])
def register():
    username = request.json['username']
    password= request.json['password']
    password_hash= generate_password_hash(password)
    query="""
        INSERT INTO users
        (username,password_hash)
        VALUES(%s,%s)
        RETURNING id,username
    """
    cur = g.db['cursor']
    try:
        cur.execute(query,(username,password_hash))
    except psycopg2.IntegrityError:
        return jsonify(success=False,msg='Username already taken')
    g.db['connection'].commit()
    user = cur.fetchone()
    session['user'] = user
    return jsonify(success=True,user=user)


# login route
@app.route('/login',methods=['POST'])
def login():
    username = request.json['username']
    password= request.json['password']
    query="""
      SELECT * FROM users
      WHERE username=%s
    """
    cur = g.db['cursor']
    cur.execute(query,(username,))
    user = cur.fetchone()
    if user is None:
        return jsonify(success=False, msg='Username or password is incorrect')
    password_matches=check_password_hash(user['password_hash'],password)
    if not password_matches:
        return jsonify(success=False, msg='Username or password is incorrect')
    user.pop('password_hash')
    session['user']=user
    return jsonify(success=True,user=user)

# logout route
@app.route('/logout',methods=['POST'])
def logout():
    session.pop('user',None)
    return jsonify(success=True)

# authenticated route
@app.route('/is-authenticated')
def is_authenticated():
    user = session.get('user', None)
    if user:
        return jsonify(success=True, user=user)
    else:
        return jsonify(success=False, msg='User is not logged in')
