from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["usermanaged"]
collection = db["users"]

# Sample Data (Drop if exists and insert new)
collection.drop()
collection.insert_many([
    {"Name": "Somu", "Payment": {"Total": 600}, "Transaction": {"price": 400}},
    {"Name": "Ravi", "Payment": {"Total": 700}, "Transaction": {"price": 350}},
    {"Name": "Anu", "Payment": {"Total": 500}, "Transaction": {"price": 450}}
])

# Queries
print("a.", collection.find_one({"Name": "Somu"}))  
print("b.", collection.find_one({"Payment.Total": 600}))
print("c.", collection.find_one({"Transaction.price": {"$gte": 300, "$lte": 500}}))
print("d. Total Payment:", collection.aggregate([{"$group": {"_id": None, "Total": {"$sum": "$Payment.Total"}}}]).next()["Total"])
