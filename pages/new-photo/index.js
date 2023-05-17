import { Fragment } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';
import NewPhotoForm from '../../components/photos/NewPhotoForm';

function NewPhotoPage() {
   const router = useRouter();

   async function addPhotoHandler(enteredMeetupData) {
      const response = await fetch('/api/new-photo',{
         method:'POST',
         body:JSON.stringify(enteredMeetupData),
         headers:{'Content-type':'application/json'}
      });

      const data = await response.json();

      console.log(data);

      router.push('/');
   };

   return (
      <Fragment>
         <Head>
            <title>Add new photo</title>
            <meta name="description" content="Add new photo"></meta>
         </Head>
         <NewPhotoForm onAddPhoto={addPhotoHandler}/>
      </Fragment>
   )
};

export default NewPhotoPage;