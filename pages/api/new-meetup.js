import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://saddam:UsXMhrsZ6ype7MEP@cluster0.b89jm15.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    console.log("result: ", result);

    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;