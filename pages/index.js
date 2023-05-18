import { Fragment } from 'react';
import Head from 'next/head';
import PhotoList from '../components/photos/PhotoList';

function HomePage(props) {

   return (
      <Fragment>
         <Head>
            <title>Kleica & Cleberson</title>
            <meta name="description" content="Casamento de Kleica e Cleberson"></meta>
         </Head>
         <PhotoList photos={props.photos} />
      </Fragment>
   )
};

/** Roda somente no servidor , para cada requisicao ele gera os dados estaticos novamente para caso de dados mudarem constantementes,
 * a funcao renderizara previamente com os dados devolvidos sendo sempre em json.
 */
/*export async function getServerSideProps(context) {

   const req = context.req;
   const res = context.res;

   //fetch data from an API
   return {
      props:{
         meetups:DUMMY_LIST
      }
   }
};*/

const getPhotos = async () => {
   let results = {};
   try {
      results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image?max_results=10`, {
      method: "GET",
      headers: {
         Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')} }`
      },

   }).then(r => r.json())
   } catch (error) {
      console.error(error);
   }

   const { resources } = await results;

   const data = resources;
   return data;
  
};

export async function getStaticProps() {
   //fetch data from an Api
   /*const client = await MongoClient.connect('mongodb+srv://clebersonweng:MongoDb.010488@mongodb.de9az25.mongodb.net/MongoDb?retryWrites=true&w=majority');
   const db = client.db();
   const photosCollection = db.collection('wedding');
   const photos = await photosCollection.find().toArray();
   console.log("photos", photos)
   client.close();*/

   
   const resources = await getPhotos();
   
   return {
      props: {
         photos: resources?.map(photo => ({
            title: photo.public_id,
            image: photo.secure_url,
            id: photo.asset_id
         })),
         revalidate: 1 // seconds
      }
   }
}

export default HomePage;