from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# MySQL database configuration
db_config = {
    'host': 'localhost',
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

if __name__ == '__main__':
    app.run(debug=True)
