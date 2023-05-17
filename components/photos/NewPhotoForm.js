import { useRef, useState } from 'react';

import Button from '../ui/Button';

function NewPhotoForm(props) {

	const [showLoader, setShowLoader] = useState(false)
	
	const titleInputRef = useRef();
	const imageInputRef = useRef();
	

	function submitHandler(event) {
		event.preventDefault();

		const enteredTitle = titleInputRef.current.value;
		const enteredImage = imageInputRef.current.value;
		console.log("imageInputRef",enteredImage)
		
		const photoData = {
			title: enteredTitle,
			image: enteredImage,
		};

		props.onAddPhoto(photoData);
	}

	

	return (
		<div className="flex">
			<div className="w-1/5  "></div>
			<div className="w-3/5 bg-blue-100 rounded h-50 mt-2 p-2">
				<form className="w-full max-w-sm" onSubmit={submitHandler}>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
								Titulo :
							</label>
						</div>
						<div className="md:w-2/3">
							<input className="bg-white-200 appearance-none border-2 border-white-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" ref={titleInputRef} />
						</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
								Foto :
							</label>
						</div>
						<div className="md:w-2/3">
							<input
								className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								id='image'
								name='image[]'
								type="url"
								placeholder=""
								ref={imageInputRef}
								required
							/>
						</div>
					</div>

					<div className="md:flex md:items-center">
						<div className="md:w-1/3"></div>
						<div className="md:w-2/3">
							<Button color="secondary" size="md" styleClasses="m-1" type="reset" text="Cancelar" />
							<Button color="cyan" size="md" styleClasses="m-1" loading={showLoader} disabled={showLoader} text="Guardar" />
						</div>
					</div>
				</form>
			</div >
			<div className="w-1/5 "></div>
		</div >
	);
}

export default NewPhotoForm;