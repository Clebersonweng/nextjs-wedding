import { useRef,useState } from 'react';

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

function NewMeetupForm(props) {
   const [postImage, setPostImage] = useState({
      myFile: "",
    });
   const titleInputRef = useRef();
   const imageInputRef = useRef();
   const addressInputRef = useRef();
   const descriptionInputRef = useRef();

   function submitHandler(event) {
      event.preventDefault();

      const enteredTitle = titleInputRef.current.value;
      const enteredImage = imageInputRef.current.value;
      const enteredAddress = addressInputRef.current.value;
      const enteredDescription = descriptionInputRef.current.value;
      console.log("image",postImage.myFile)
      const meetupData = {
         title: enteredTitle,
         image: postImage.myFile,
         address: enteredAddress,
         description: enteredDescription,
      };

      props.onAddMeetup(meetupData);
   }

   const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
         const fileReader = new FileReader();
         fileReader.readAsDataURL(file);
         fileReader.onload = () => {
            resolve(fileReader.result);
         };
         fileReader.onerror = (error) => {
            reject(error);
         };
      });
   };
   const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setPostImage({ ...postImage, myFile: base64 });
   };
   return (
      <Card>
         <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
               <label htmlFor='title'>Meetup Title</label>
               <input type='text' required id='title' ref={titleInputRef} />
            </div>
            <div className={classes.control}>
               <label htmlFor='image'>Meetup Image</label>
               <input
                  type="file"
                  label="Image"
                  name="image"
                  id='image'
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleFileUpload(e)}
                  ref={imageInputRef}
                  required
               />
            </div>
            <div className={classes.control}>
               <label htmlFor='address'>Address</label>
               <input type='text' required id='address' ref={addressInputRef} />
            </div>
            <div className={classes.control}>
               <label htmlFor='description'>Description</label>
               <textarea
                  id='description'
                  required
                  rows='5'
                  ref={descriptionInputRef}
               ></textarea>
            </div>
            <div className={classes.actions}>
               <button>Add Meetup</button>
            </div>
         </form>
      </Card>
   );
}

export default NewMeetupForm;