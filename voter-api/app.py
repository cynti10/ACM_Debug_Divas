from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# MySQL database configuration
db_config = {
    'host': 'votervault-db.mysql.database.azure.com',
    'user': 'Sanjana',
    'password': 'HelloKitty123',
    'database': 'VV_DB'
}

# Route to retrieve all candidates
@app.route('/candidates', methods=['GET'])
def get_candidates():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)  # Use dictionary=True for dict-like rows
        
        query = "SELECT * FROM candidates"
        cursor.execute(query)
        results = cursor.fetchall()
        
        return jsonify(results)
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals() and connection.is_connected():
            connection.close()

# Route to retrieve a candidate by ID
@app.route('/candidates/<int:id>', methods=['GET'])
def get_candidate_by_id(id):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        
        query = "SELECT * FROM candidates WHERE id = %s"
        cursor.execute(query, (id,))
        result = cursor.fetchone()
        
        if result:
            return jsonify(result)
        else:
            return jsonify({"error": "Candidate not found"}), 404
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals() and connection.is_connected():
            connection.close()

# Route to add a new user
@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        query = "INSERT INTO users (email, password_hash) VALUES (%s, %s)"
        cursor.execute(query, (email, password))
        connection.commit()

        return jsonify({"message": "User added successfully", "user_id": cursor.lastrowid}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals() and connection.is_connected():
            connection.close()

# Route to retrieve all users
@app.route('/users', methods=['GET'])
def get_all_users():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM users"
        cursor.execute(query)
        users = cursor.fetchall()

        return jsonify(users), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals() and connection.is_connected():
            connection.close()

# Route to get a single user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM users WHERE id = %s"
        cursor.execute(query, (user_id,))
        user = cursor.fetchone()

        if user:
            return jsonify(user), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals() and connection.is_connected():
            connection.close()

# Route to add a vote
@app.route('/add_vote', methods=['POST'])
def add_vote():
    data = request.json  # Extract JSON payload
    user_id = data.get('user_id')
    candidate_id = data.get('candidate_id')

    # Validate input
    if not user_id or not candidate_id:
        return jsonify({"error": "Both user_id and candidate_id are required"}), 400

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Check if the user exists
        cursor.execute("SELECT id FROM users WHERE id = %s", (user_id,))
        user_exists = cursor.fetchone()
        if not user_exists:
            return jsonify({"error": "User not found"}), 404

        # Check if the candidate exists
        cursor.execute("SELECT id FROM candidates WHERE id = %s", (candidate_id,))
        candidate_exists = cursor.fetchone()
        if not candidate_exists:
            return jsonify({"error": "Candidate not found"}), 404

        # Insert vote into the table
        query = "INSERT INTO votes (user_id, candidate_id) VALUES (%s, %s)"
        cursor.execute(query, (user_id, candidate_id))
        connection.commit()

        return jsonify({"message": "Vote added successfully", "vote_id": cursor.lastrowid}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals() and connection.is_connected():
            connection.close()

# Route to get vote count for each candidate
@app.route('/votes/count', methods=['GET'])
def get_vote_count():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT candidate_id, COUNT(*) AS vote_count
        FROM votes
        GROUP BY candidate_id
        ORDER BY vote_count DESC
        """
        cursor.execute(query)
        results = cursor.fetchall()

        return jsonify(results), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals() and connection.is_connected():
            connection.close()

if __name__ == '__main__':
    app.run(debug=True)
