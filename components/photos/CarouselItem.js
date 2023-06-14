import { Fragment } from "react";
import Image from "next/image";

function CarouselItem(props) {
   let styleClass = 'relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none carousel-item';
   const oldProps =  {...props};
   let newProps = {...oldProps,'data-te-carousel-active':'active'}

   if(props.active!='true') {
      styleClass +=" hidden";
      newProps = {...oldProps}
   }

   return (
      <Fragment>
         <div 
            className={styleClass} 
            data-te-carousel-item
            {...newProps}
         >
            <div className="rounded flex flex-col items-center">
               <img
                  src={props.image}
                  className="rounded object-contain max-w-screen-sm max-w-screen-md max-w-screen-lg max-w-screen-xl max-w-screen-2xl h-[calc(100vh-74px)]"
                  alt="Wild Landscape" />
            </div>
         </div>
      </Fragment>
   )
}

export default CarouselItem;