import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetUpList from '../components/meetups/MeetupList';

function HomePage(props) {

   return (
      <Fragment>
         <Head>
            <title>React meetups</title>
            <meta name="description" content="List of all meetups"></meta>
         </Head>
         <MeetUpList meetups={props.meetups} />
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

export async function getStaticProps(){
   //fetch data from an Api
   const client =  await MongoClient.connect('mongodb+srv://clebersonweng:MongoDb.010488@mongodb.de9az25.mongodb.net/MongoDb?retryWrites=true&w=majority');
   const db = client.db();
   const meetupsCollection = db.collection('meetups');
   const meetups = await meetupsCollection.find().toArray();

   client.close();

   return {
      props:{
         meetups:meetups.map(meetup => ({
            title:meetup.title,
            address:meetup.title,
            image:meetup.image,
            description:meetup.description,
            id:meetup._id.toString()
         })),
         revalidate:2 // seconds
      }
   }
}
export default HomePage;