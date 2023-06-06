import { useEffect,Fragment, useState } from "react";
import Image from "next/image";


function CarouselItem(props) {
   //const image = props.image;
   let styleClass = 'relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none carousel-item h-3/5 max-h-full';
   const oldProps =  {...props};
   let newProps = {...oldProps,'data-te-carousel-active':'active'}

   if(props.active!='true') {
      styleClass +=" hidden";
      newProps = {...oldProps}
   }

   return (
      <Fragment>
         {/*<!--First item-->*/}
         <div 
            className={styleClass} 
            data-te-carousel-item
            {...newProps}
         >
            <div className="flex bg-white md:bg-transparent  ">
               <img
                  src={props.image}
                  className="object-cover  object-contain"
                  alt="Wild Landscape" />
            </div>
         </div>
      </Fragment>
   )
}

export default CarouselItem;