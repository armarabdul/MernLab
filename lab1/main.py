import json
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client.usermanaged
collection = db.transactions

# Drop collection if it exists
collection.drop()

# Load transactions.json
with open("transactions.json", "r") as file:
    try:
        data = json.load(file)
        if isinstance(data, list):
            collection.insert_many(data)
        else:
            print("Error: transactions.json is not a list of objects.")
    except json.JSONDecodeError as e:
        print(f"JSON Decode Error in transactions.json: {e}")

# Upsert transactions_upsert.json
with open("transactions_upsert.json", "r") as file:
    try:
        upsert_data = json.load(file)
        print("DEBUG: Loaded upsert data ->", upsert_data)  # Debugging line
        
        if isinstance(upsert_data, list):  # Ensure it's a list
            for record in upsert_data:
                if isinstance(record, dict) and "_id" in record:
                    collection.update_one(
                        {"_id": record["_id"]},  # Use _id as unique identifier
                        {"$set": record},  
                        upsert=True  # Insert if not exists, update otherwise
                    )
                else:
                    print(f"Skipping invalid record: {record}")
        else:
            print("Error: transactions_upsert.json is not a valid list of objects.")

    except json.JSONDecodeError as e:
        print(f"JSON Decode Error in transactions_upsert.json: {e}")

print("Data loaded and upserted successfully.")
