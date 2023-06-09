import { Fragment, useState } from 'react';
import Head from 'next/head';

import PhotoList from '../components/photos/PhotoList';
import Backdrop from '../components/ui/Backdrop';

import { search, mapImageResources } from '../lib/cloudinary';
import dynamic from "next/dynamic";
const Carousel = dynamic(() => import("../components/photos/MyCarousel"), { ssr: false });


function HomePage(props) {
   const [modal, setModal] = useState(false);
   const [imageCarousel,setImageCarousel] = useState('');
   const { photos, nextCursor } = props;

   if (!photos) {
      return <p>Loading…</p>
   }

   function openCarousel(e) {
      const imageId = e.target.id;
      setImageCarousel(imageId);
      setModal(true);
   };

   function closeCarousel() {
      setModal(false);
   };

   return (
      <Fragment>
         <Head>
            <title>Kleica & Cleberson</title>
            <meta name="description" content="Casamento de Kleica e Cleberson"></meta>
         </Head>
         <PhotoList photos={photos} onClickModal={openCarousel} />
         {modal && <Backdrop/>}
         {modal && <Carousel photos={photos} onOpen={modal} onClose={closeCarousel} id={imageCarousel}/>}
      </Fragment>
   )
};

export const getStaticProps = async () => {
   const folderName = "wedding";

   const results = await search({
      max_results: 14
   });

   const result = await results.json();
   const { resources, next_cursor: nextCursor } = result;

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