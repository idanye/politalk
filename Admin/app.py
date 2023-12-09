from flask import Flask, render_template, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from flask_cors import CORS
from flask import request

app = Flask(__name__, template_folder='templates')
app.config['SECRET_KEY'] = 'politalk1948'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///usersinfo.db'
db = SQLAlchemy(app)
CORS(app)  # Enable CORS for all routes

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    is_approved = db.Column(db.Boolean, default=False)

@app.route('/')
def home():
    return render_template('admin_dashboard.html')

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_data = [{'username': user.username, 'is_approved': user.is_approved} for user in users]
    return jsonify(user_data)

@app.route('/activity', methods=['POST'])
def receive_activity():
    activity_data = request.get_json()
    # Process and store the activity data as needed
    print('Received activity:', activity_data)
    return jsonify({'message': 'Activity received successfully'})

if __name__ == '__main__':
    # db.create_all()
    app.run(debug=True)
