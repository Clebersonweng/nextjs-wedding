// api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(req,res) {
   if(req.method === "POST") {
      const data = req.body;
      alert('teste photos');
      const {title, image } = data;

      const client=  await MongoClient.connect('mongodb+srv://clebersonweng:MongoDb.010488@mongodb.de9az25.mongodb.net/MongoDb?retryWrites=true&w=majority');
      const db = client.db();

      const meetupsCollection = db.collection('wedding');

      const result= await meetupsCollection.insertOne(data);

      console.log(result);

      client.close();

      res.status(201).json({message:'Wedding inserted.'})
   }
}

export default handler;