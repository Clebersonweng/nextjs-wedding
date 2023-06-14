import { useEffect, Fragment } from "react";

import { Carousel, initTE } from "tw-elements";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import CarouselItem from "./CarouselItem";
import { handleKeypress } from '../../helpers/utils';

function MyCarousel(props) {
   const { photos: images} = props;

   useEffect(() => {
      initTE({ Carousel });
   }, []);

   useEffect(() => {
      document.addEventListener('keydown', (event) => {
         handleKeypress(event,props);
      });

      return () => {
         document.removeEventListener('keydown', (event) => event)
      }
   }, [props.onOpen]);

   const carouselItems = images.map((photo, index) =>
      // Correct! Key should be specified inside the array.
      <CarouselItem
         key={photo.id}
         id={photo.id}
         image={photo.image}
         data-te-carousel-item
         active={photo.id === props.id ? 'true' : 'false'}
      />
   );

   return (
      <Fragment>
         <div
            id="myCarousel"
            className="absolute top-12 left-0 z-10 m-2  h-[calc(100vh-60px)] w-[calc(100vw-20px)]"
            data-te-carousel-init
            data-te-carousel-slide>

            {/*<!--Carousel items-->*/}
            <div className="relative overflow-hidden after:clear-both after:block after:content-['']">
               {carouselItems}
            </div>

            {/*<!--Carousel close icon-->*/}

            <div className="absolute bottom-0 right-1 top-1 z-10 h-10">
               <button className="bg-primary-200 hover:bg-blue-300 text-white font-bold py-2 px-2 rounded" onClick={props.onClose} href={props.title}><XMarkIcon className="h-6 w-6 text-blue-500" /></button>
            </div>

            {/*<!--Carousel controls - prev item-->*/}
            <button
               className="absolute bottom-0 left-0 top-0 z-[1] flex w-[10%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
               type="button"
               data-te-target="#myCarousel"
               data-te-slide="prev">
               <span className="inline-block h-8 w-8">
                  <ChevronLeftIcon className="h-6 w-6" />
               </span>
               <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
            </button>

            {/*<!--Carousel controls - next item-->*/}
            <button
               className="absolute bottom-0 right-0 top-0 z-[1] flex w-[10%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
               type="button"
               data-te-target="#myCarousel"
               data-te-slide="next">
               <span className="inline-block h-8 w-8">
                  <ChevronRightIcon className="h-6 w-6" />
               </span>
               <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
            </button>
         </div>
      </Fragment>
   )
}

export default MyCarousel;