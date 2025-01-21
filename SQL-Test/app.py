from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins" : ["http://127.0.0.1:5500", "http://localhost:5500",
                     "http://127.0.0.1:5501", "http://localhost:5501"],
        "methods" : ["GET", "POST", "PUT", "DELETE"],
        "allow_headers" : ["Content-Type"]
    }
})

def get_db_connection():
    try:
        conn=pyodbc.connect(
            "Driver={ODBC Driver 17 for SQL Server};"
            "Server=(localdb)\\local:"
            "Database=ToDoList;"
            "Trusted_Connection=yes;"
        )
        print("Database connection successful")
        return conn
    except Exception as e:
        print(f"Database connection error: {str(e)}")
        raise

@app.route('/tasks', methods=['GET'])
def get_task():
    print("Get /tasks endpoint called")
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM dbo.ToDoList')
        tasks = []
        for row in cursor.fetchall():
            tasks.append({
                'id' :row.id,
                'title' : row.Title,
                'description' : row.Description,
                'deadline' : row.Deadline.isoformat() if row.Deadline else None,
                'completed' : bool(row.Completed)
            })
            conn.close()
            print(f"Returning {len(tasks)} tasks")
            return jsonify(tasks)
    except Exception as e:
        print(f"Error in get_tasks: {str(e)}")
        return jsonify({"error" :str(e)}), 500
    
@app.route('/task', methods =['POST'])
def add_task():
    print(f"POST /tasks endpoint called")
    try:
        data = request.json
        print(f"Recieved data: {data}")
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            '''INSERT INTO dbo.ToDoList (Title, Description, Deadline, Completed)
               OUTPUT INSERTED.id
               VALUES (?, ?, ?, ?)''',
            (data['title'], 
             datetime.fromisoformat(data['deadline']) if data['deadline'] else None,
             False)
        )
        
        new_id = cursor.fetchone()[0]
        conn.commit()
        conn.close()
        print()
