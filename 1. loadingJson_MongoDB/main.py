import json
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
collection = client.usermanaged.transactions

# Drop existing collection
collection.drop()

def load_json(filename):
    """Load and validate JSON data as a list."""
    try:
        with open(filename, "r") as file:
            data = json.load(file)
            return data if isinstance(data, list) else []
    except json.JSONDecodeError as e:
        print(f"❌ Error in {filename}: {e}")
        return []

# Insert transactions.json data
if (data := load_json("transactions.json")):
    collection.insert_many(data)

# Upsert transactions_upsert.json data
for record in load_json("transactions_upsert.json"):
    if isinstance(record, dict) and "_id" in record:
        collection.update_one({"_id": record["_id"]}, {"$set": record}, upsert=True)

print(" Data loaded and upserted successfully.")

# this code will create a collection called transcations and it will import transactions.json which is in array format
#mongoimport --db usermanaged --collection transactions --file transactions.json --jsonArray

# This code will update and insert which is upsert the document with 
#mongoimport --db usermanaged --collection transactions --file transactions_upsert.json --jsonArray --mode upsert

# After running the above commands, check your MongoDB collection: 
# use usermanaged
# db.transactions.find().pretty()
