import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import PhotoList from '../components/photos/PhotoList';

function HomePage(props) {

   const { photos } = props
   if (!photos) {
      return <p>loading…</p>
   }

   const newPhotos = JSON.parse(photos)?.map(photo => ({
      title: photo.public_id,
      image: photo.secure_url,
      id: photo.asset_id,
      format: photo.format
   }))

   return (
      <Fragment>
         <Head>
            <title>Kleica & Cleberson</title>
            <meta name="description" content="Casamento de Kleica e Cleberson"></meta>
         </Head>
         {newPhotos && <PhotoList photos={newPhotos} />}
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

   try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image?max_results=10`, {
         method: "GET",
         headers: {
            Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')} }`
         },
      });

      const result = await response.json();
      const { resources } = result;
      
      const newData = resources?.map(photo => ({
         asset_id: photo.asset_id,
         public_id: photo.public_id,
         format: photo.format,
         url: photo.url,
         secure_url: photo.secure_url,
      }))
      console.log("resources show",newData);
      return newData;

   } catch (error) {
      console.error(error);
      throw new Error(error);
   }

};

//export async function getStaticProps() {
export async function getStaticProps() {

   //fetch data from an Api
   /*const client = await MongoClient.connect('mongodb+srv://clebersonweng:MongoDb.010488@mongodb.de9az25.mongodb.net/MongoDb?retryWrites=true&w=majority');
   const db = client.db();
   const photosCollection = db.collection('wedding');
   const photos = await photosCollection.find().toArray();
   console.log("photos", photos)
   client.close();*/


   /*let photos = [{
      asset_id:'Wedding/DSC_9601_pgl3lu',
      format:'jpg',
      title:'title',
      secure_url:'https://res.cloudinary.com/cle-wengrzynek/image/upload/v1684242206/Wedding/DSC_9601_pgl3lu.jpg',
      public_id:'dasdsadsa32432'
   }];*/
   let photos = await getPhotos();
   
   if( typeof photos == 'undefined' )
   {
      photos = [{
         asset_id:'Wedding/DSC_9601_pgl3lu',
         format:'jpg',
         title:'title',
         secure_url:'https://res.cloudinary.com/cle-wengrzynek/image/upload/v1684242206/Wedding/DSC_9601_pgl3lu.jpg',
         public_id:'dasdsadsa32432'
      }];
   }
   const allProfiles = JSON.stringify(photos)

   return {
      props: {
         photos: allProfiles,
      },
      revalidate: 5 // seconds
   }
}


export default HomePage;