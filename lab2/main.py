from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["usermanaged"]
collection = db["users"]

# a) Find any record where Name is 'Somu'
name_query = collection.find_one({"Name": "Somu"})
print("a) Record where Name is 'Somu':", name_query)

# b) Find any record where total payment amount (Payment.Total) is 600
payment_query = collection.find_one({"Payment.Total": 600})
print("b) Record where Payment.Total is 600:", payment_query)

# c) Find records where price (Transaction.price) is between 300 and 500
price_query = list(collection.find({"Transaction.price": {"$gte": 300, "$lte": 500}}))
print("c) Records where Transaction.price is between 300 and 500:", price_query)

# d) Calculate the total transaction amount by summing Payment.Total
total_transaction_amount = collection.aggregate([
    {"$group": {"_id": None, "totalAmount": {"$sum": "$Payment.Total"}}}
])

# Extract result
total_amount = next(total_transaction_amount, {}).get("totalAmount", 0)
print("d) Total transaction amount:", total_amount)