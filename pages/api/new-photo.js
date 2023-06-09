// api/new-meetup
import { MongoClient } from 'mongodb';
// necesary stay before handler to change the size image
export const config = {
   api: {
      bodyParser: {
         sizeLimit: '25mb' // Set desired value here } 
      }
   }
};

async function handler(req,res) {
   if(req.method === "POST") {
      const data = req.body;

      const {title, image , address, description } = data;

      const client=  await MongoClient.connect('mongodb+srv://clebersonweng:MongoDb.010488@mongodb.de9az25.mongodb.net/MongoDb?retryWrites=true&w=majority');
      const db = client.db();

      const meetupsCollection = db.collection('wedding');

      const result= await meetupsCollection.insertOne(data);

      console.log(result);

      client.close();

      res.status(201).json({message:'Wedding Image inserted.'})
   }
}

export default handler;