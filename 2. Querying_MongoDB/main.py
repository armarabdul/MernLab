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



# // Step 1: Use the database
# use usermanaged


# // Step 2: Ensure the collection exists
# if (!db.transactions.countDocuments()) {
#     print("❌ Collection 'transactions' does not exist or is empty.")
# } else {
#     print("✅ Collection 'transactions' exists. Proceeding with queries.")
# }

# // a) Find any record where Name is 'Somu'
# print("\n🔍 a) Finding a record where Name is 'Somu':")
# printjson(db.transactions.findOne({ Name: "Somu" }))

# // b) Find any record where total payment amount (Payment.Total) is 600
# print("\n🔍 b) Finding a record where Payment.Total is 600:")
# printjson(db.transactions.findOne({ "Payment.Total": 600 }))

# // c) Find records where price (Transaction.price) is between 300 and 500
# print("\n🔍 c) Finding records where Transaction.price is between 300 and 500:")
# db.transactions.find({ "Transaction.price": { $gte: 300, $lte: 500 } }).forEach(printjson)

# // d) Calculate the total transaction amount by summing Payment.Total
# print("\n📊 d) Calculating the total transaction amount:")
# let totalTransactionAmount = db.transactions.aggregate([
#     { $group: { _id: null, totalAmount: { $sum: "$Payment.Total" } } }
# ]).toArray()

# if (totalTransactionAmount.length > 0) {
#     print("💰 Total Transaction Amount:", totalTransactionAmount[0].totalAmount)
# } else {
#     print("❌ No transactions found.")
# }