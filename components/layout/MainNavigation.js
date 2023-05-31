import Link from 'next/link';
import Image from 'next/image';

function MainNavigation() {

   return (
      <header>
         <nav className="relative bg-indigo-500 flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
            <div className="container px-4 mx-auto md:flex md:items-center">
               <div className="flex justify-between items-center">
                  <a href="#" className="flex items-center">
                     <Image src="https://res.cloudinary.com/cle-wengrzynek/image/upload/v1685493812/icons/ring_01.png" className="mr-3 h-6 sm:h-9" alt="Ring wedding" width={50} height={50} />
                     <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white font-sans">Kleica e Cleberson</span>
                  </a>
               </div>

               <ul className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0">
                  <li className='hover:-translate-y-0.5 transition motion-reduce:hover:translate-y-0 motion-reduce:transition-none'>
                     <Link className="" href='/'><a className="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600">Fotos</a></Link>
                  </li>
                  <li className='hover:-translate-y-0.5 transition motion-reduce:hover:translate-y-0 motion-reduce:transition-none invisible'>
                     <Link className="" href='/new-photo'><a className="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600">Nova foto</a></Link>
                  </li>
               </ul>
            </div>
         </nav>
      </header>
   );
}

export default MainNavigation;