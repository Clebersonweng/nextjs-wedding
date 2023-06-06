import { Fragment } from 'react';
import Head from 'next/head';
import PhotoList from '../components/photos/PhotoList';

import { search, mapImageResources, getFolders } from '../lib/cloudinary';

//import dynamic from "next/dynamic";
//const Carousel = dynamic(() => import("../components/photos/MyCarousel"), { ssr: false });


function HomePage(props) {

   const { photos,nextCursor } = props;
  
   if (!photos) {
      return <p>Loading…</p>
   }

   return (
      <Fragment>
         <Head>
            <title>Kleica & Cleberson</title>
            <meta name="description" content="Casamento de Kleica e Cleberson"></meta>
         </Head>
         <PhotoList photos={photos} />
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

export const getStaticProps = async () => {
   const folderName = "Wedding";
   
   const results = await search({
      max_results:400
   });

   const result = await results.json();
   const { resources,next_cursor: nextCursor } = result;

   //const resFolders = await getFolders();

   const images = mapImageResources(resources);

   let imagesWedding = images.filter((image) => {
      if (image.folder === folderName) {
         return true;
      }
      return false;
   })

   return {
      props: {
         photos: imagesWedding || null,
         nextCursor
      },
   };
};

export default HomePage;