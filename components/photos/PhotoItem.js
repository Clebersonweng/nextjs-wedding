import { useRouter } from 'next/router';
import Image from 'next/image';
import { ArrowDownIcon } from '@heroicons/react/24/solid'

import { lowerCase,cleanCharacters } from '../../helpers/utils';

function PhotoItem(props) {
	const router = useRouter();

	function showDetailsHandler() {
		router.push('/' + props.id);
	}	
	
	function modalHandler() {
		console.log("click for modal");
	}

	const download = e => {

		let elementIcon = e.target;
		let elementButton = elementIcon.parentElement;
		console.log("elementButton", elementButton.getAttribute('href'));

		let imageName = cleanCharacters(lowerCase(elementButton.getAttribute('href')));

		fetch(`https://res.cloudinary.com/cle-wengrzynek/image/upload/v1684242202/${imageName}`, {
			method: "GET",
			headers: {}
		})
		.then(response => {
			response.arrayBuffer().then(function (buffer) {
				const url = window.URL.createObjectURL(new Blob([buffer]));
				const link = document.createElement("a");
				
				link.href = url;
				link.setAttribute("download", imageName+'.jpg'); //or any other extension
				document.body.appendChild(link);
				link.click();
			});
		})
		.catch(err => {
			console.error(err);
		});
	};


	return (
		<div className='relative m-1 col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col items-center'>
			<Image className="mx-auto object-cover h-48 w-96 max-w-full rounded-lg " width={200} height={300} loading="lazy" loader={() => props.image} src={props.image} alt={props.title} quality={50} onClick={modalHandler}/>
			<div className="rounded-lg -mt-2 w-64 text-center">
				<button className="bg-primary-200 hover:bg-blue-300 text-white font-bold py-2 px-2 rounded absolute bottom-0" onClick={e => download(e)} href={props.title}><ArrowDownIcon className="h-6 w-6 text-blue-500" /></button>
			</div>
		</div>
	);
}

export default PhotoItem;