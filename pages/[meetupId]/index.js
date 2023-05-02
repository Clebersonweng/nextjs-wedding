import { Fragment } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { MongoClient,ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';
//our-domain.com/news/something-important

function DetailPage(props){
   const router = useRouter();

   const newsId = router.query.newsId;

   //send a request to the backend API
   // to fetch the news item with newsId
   return (
      <Fragment>
         <Head>
            <title>{props.meetupData.title}</title>
            <meta name="desciption" contento={props.meetupData.description}></meta>
         </Head>
         <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
         />
      </Fragment>
   )
};

export async function getStaticPaths() {

   const client = await MongoClient.connect('mongodb+srv://clebersonweng:MongoDb.010488@mongodb.de9az25.mongodb.net/MongoDb?retryWrites=true&w=majority');
   const db = client.db();
   const meetupsCollection = db.collection('meetups');
   const meetups = await meetupsCollection.find({},{ _id:1}).toArray();

   client.close();

   return {
      fallback:false,
      paths: meetups.map((meetup)=> ({params: {meetupId: meetup._id.toString() } })),
   }
};

export async function getStaticProps(context) {
   const meetupId = context.params.meetupId;

   //fetch
   const client = await MongoClient.connect('mongodb+srv://clebersonweng:MongoDb.010488@mongodb.de9az25.mongodb.net/MongoDb?retryWrites=true&w=majority');
   const db = client.db();
   const meetupsCollection = db.collection('meetups');

   const selectedMeetup = await meetupsCollection.findOne({ _id:new ObjectId(meetupId)});


   client.close();
   console.log('selectedMeetup',selectedMeetup);

   return {
      props: {
         meetupData:{
            id: selectedMeetup._id.toString(),
            image:selectedMeetup.image,
            title:selectedMeetup.title,
            address:selectedMeetup.address,
            description:selectedMeetup.description
         }
      }
   }
};

export default DetailPage;