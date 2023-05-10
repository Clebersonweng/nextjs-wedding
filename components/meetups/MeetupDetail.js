import { Fragment } from "react";
import classes from './MeetupDetail.module.css';

function MeetupDetail(props){
   return (
      <Fragment>
         <section className={classes.detail}>
            <img src={props.image} alt="first meetup" />
         </section>
      </Fragment>
   )
};

export default MeetupDetail;