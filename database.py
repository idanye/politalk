import sqlite3

# Connect to a database (or create a new one if it doesn't exist)
connection = sqlite3.connect('example.db')

# Create a cursor object
cursor = connection.cursor()

# Example: Create a table
cursor.execute('''
    CREATE TABLE UsersInfo (
        ProfileID INTEGER PRIMARY KEY,
        Name TEXT,
        Education TEXT,
        IsCurrentlyStudent INTEGER,
        WhereCurrentlyStudent TEXT 
    );
''')

# /////

# Commit the changes
connection.commit()

cursor.close()
connection.close()