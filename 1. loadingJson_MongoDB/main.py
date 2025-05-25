

# this code will create a collection called transcations and it will import transactions.json which is in array format
mongoimport --db usermanaged --collection transactions --file transactions.json --jsonArray

# This code will update and insert which is upsert the document with 
mongoimport --db usermanaged --collection transactions --file transactions_upsert.json --jsonArray --mode upsert

# After running the above commands, check your MongoDB collection: 
 use usermanaged
 db.transactions.find().pretty()
