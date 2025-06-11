const { MongoClient } = require("mongodb");

const URL =
  "mongodb+srv://ashutoshverma557:gXoTablrYSvNIs8Q@cluster1.bdu7y.mongodb.net/";
const client = new MongoClient(URL);

const dbName = "HelloWorld";

async function main() {
  await client.connect();
  console.log("Connected Successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  //Read
  const result = await collection.find({}).toArray();
  console.log("Found documents", result);

//   const data = {
//     firstname:"Aman",
//     lastname: "Verma",
//     age: 23,
//     city:"BBk"
//   }

//   const insertResult = await collection.insertMany([data]);
//   console.log("Insert data",insertResult);
  //update
  const updateResult = await collection.updateOne({ firstname: "Ashutosh" },{ $set: { address: "3 Nassau St" }});
  console.log("Update data",updateResult)

  return "done"; 
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
