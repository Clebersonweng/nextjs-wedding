import React from "react";
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid'

const sizes = {
   md: 'px-4 py-2 rounded-md text-base',
   lg: 'px-6 py-3 rounded-lg text-lg',
}

const colors = {
   primary: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
   secondary: 'bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded',
   cyan: 'shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded',
}

/*const loading = ()  => {
  <div class='flex items-center justify-center min-h-screen'>
    <button type="button" class="bg-indigo-400 h-max w-max rounded-lg text-white font-bold hover:bg-indigo-300 hover:cursor-not-allowed duration-[500ms,800ms]" disabled>
        <div class="flex items-center justify-center m-[10px]"> 
            <div class="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
            <div class="ml-2"> Processing... <div>
        </div>
    </button>
</div>
}*/

function Button({ color, size, styleClasses, type='submit',text, loading = false,disabled }) {
   let colorClasses = colors[color];
   let sizeClasses = sizes[size];
   let load = loading ?  <ArrowPathRoundedSquareIcon className="h-6 w-6  text-blue-500 animate-spin rounded-full" /> : '';
   return (
      <button type={type} className={`font-bold ${sizeClasses} ${styleClasses} ${colorClasses}`} disabled={disabled}>
        {!loading ? text :  load }
      </button>
   )
}

export default Button;