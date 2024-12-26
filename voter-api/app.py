from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

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
        # Connect to the MySQL database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)  # Use dictionary=True for dict-like rows
        
        # Execute SQL query
        query = "SELECT * FROM candidates"
        cursor.execute(query)
        results = cursor.fetchall()
        
        # Return data as JSON
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
        # Connect to the MySQL database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        
        # Execute SQL query with parameterized input
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
            
@app.route('/add_user', methods=['POST'])
def add_user():
    # Extract email and password from the request
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        # Connect to the MySQL database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Execute the INSERT SQL statement
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
            
@app.route('/users', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Search for the user in the database
        query = "SELECT name FROM users WHERE email = %s AND password_hash = %s"
        cursor.execute(query, (email, password))
        user = cursor.fetchone()

        if user:
            return jsonify({"success": True, "user": {"name": user["name"]}})
        else:
            return jsonify({"success": False, "message": "Invalid email or password"}), 401

    except mysql.connector.Error as err:
        print("Database error:", err)
        return jsonify({"success": False, "message": "Server error. Please try again later."}), 500

    finally:
        cursor.close()
        conn.close()
# Route to get a single user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    try:
        # Connect to the database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        # Execute the SQL query
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
            
@app.route('/add_vote', methods=['POST'])
def add_vote():
    data = request.json  # Extract JSON payload
    user_id = data.get('user_id')
    candidate_id = data.get('candidate_id')

    # Validate input
    if not user_id or not candidate_id:
        return jsonify({"error": "Both user_id and candidate_id are required"}), 400

    try:
        # Connect to the MySQL database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

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
            
@app.route('/votes/count', methods=['GET'])
def get_vote_count():
    try:
        # Connect to the database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        # Query to count votes for each candidate and join with candidates table to get their names
        query = """
        SELECT c.name, COUNT(*) AS vote_count
        FROM votes v
        JOIN candidates c ON v.candidate_id = c.id
        GROUP BY v.candidate_id
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
