import { Fragment } from "react";

function PhotoDetail(props){
   return (
      <Fragment>
         <section className="">
            <img src={props.image} alt="first wedding" />
         </section>
      </Fragment>
   )
};

export default PhotoDetail;