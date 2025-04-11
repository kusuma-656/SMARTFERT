# db.py
from flask_pymongo import PyMongo

mongo = PyMongo()

def init_db(app):
    mongo.init_app(app)
    try:
        # Ping the MongoDB server to test connection
        mongo.cx.admin.command('ping')
        print("✅ Successfully connected to MongoDB!")
    except Exception as e:
        print(f"❌ MongoDB connection failed: {str(e)}")
