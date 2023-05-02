import { Fragment } from 'react';
import Head from 'next/head';

import { Router, useRouter } from 'next/router';
import NewMeetUpForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
   const router = useRouter();

   async function addMeetupHandler(enteredMeetupData) {
      const response = await fetch('/api/new-meetup',{
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
            <title>Add new meetup</title>
            <meta name="desciption" contento="Add new meetup"></meta>
         </Head>
         <NewMeetUpForm onAddMeetup={addMeetupHandler}/>
      </Fragment>
   )
};

export default NewMeetupPage;