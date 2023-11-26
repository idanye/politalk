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

new_user_data = ('Jane Doe', 'Mathematics', 1, 'Another University')
cursor.execute('''
    INSERT INTO UserEducation 
    (Name,
    Education, 
    IsCurrentlyStudent, 
    WhereCurrentlyStudent) 
        VALUES (?, ?, ?, ?)'''
    , new_user_data)

# Commit the changes
connection.commit()

cursor.close()
connection.close()