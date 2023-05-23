import { Fragment } from 'react';
import Head from 'next/head';
import PhotoList from '../components/photos/PhotoList';

function HomePage(props) {

   const { photos } = props;

   if (!photos) {
      return <p>loading…</p>
   }

   return (
      <Fragment>
         <Head>
            <title>Kleica & Cleberson</title>
            <meta name="description" content="Casamento de Kleica e Cleberson"></meta>
         </Head>
         {photos && <PhotoList photos={photos} />}
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

      const newData = await resources?.map(photo => ({
         asset_id: photo.asset_id,
         public_id: photo.public_id,
         format: photo.format,
         url: photo.url,
         secure_url: photo.secure_url,
      }));

      console.log("resources show", newData);
      return newData;

   } catch (error) {
      console.error(error);
      throw new Error(error);
   }
};



export const getServerSideProps = async () => {
   const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image?max_results=20`, {
      method: "GET",
      headers: {
         Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')} }`
      },
   });
   const result = await results.json();
   const { resources } = result;

   const images = resources?.map((resource) => {
      const { width, height } = resource;
      return {
         id: resource.asset_id,
         title: resource.public_id,
         image: resource.secure_url,
         format: resource.format,
         width,
         height,
      };
   });

   return {
      props: {
         photos: images || null,
      },
   };
};

export default HomePage;