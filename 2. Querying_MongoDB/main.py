



// Step 1: Use the database
use usermanaged


// Step 2: Ensure the collection exists
if (!db.transactions.countDocuments()) {
    print("❌ Collection 'transactions' does not exist or is empty.")
} else {
    print("✅ Collection 'transactions' exists. Proceeding with queries.")
}

// a) Find any record where Name is 'Somu'
print("\n🔍 a) Finding a record where Name is 'Somu':")
printjson(db.transactions.findOne({ Name: "Somu" }))

// b) Find any record where total payment amount (Payment.Total) is 600
print("\n🔍 b) Finding a record where Payment.Total is 600:")
printjson(db.transactions.findOne({ "Payment.Total": 600 }))

// c) Find records where price (Transaction.price) is between 300 and 500
print("\n🔍 c) Finding records where Transaction.price is between 300 and 500:")
db.transactions.find({ "Transaction.price": { $gte: 300, $lte: 500 } }).forEach(printjson)

// d) Calculate the total transaction amount by summing Payment.Total
print("\n📊 d) Calculating the total transaction amount:")
let totalTransactionAmount = db.transactions.aggregate([
    { $group: { _id: null, totalAmount: { $sum: "$Payment.Total" } } }
]).toArray()

if (totalTransactionAmount.length > 0) {
    print("💰 Total Transaction Amount:", totalTransactionAmount[0].totalAmount)
} else {
    print("❌ No transactions found.")
}