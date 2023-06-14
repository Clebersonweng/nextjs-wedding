import PhotoItem from './PhotoItem';

function PhotoList(props) {

   return (
      <div className="px-4 grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-2 ">
         {props.photos.map((photo) => (
            <PhotoItem
               key={photo.id}
               id={photo.id}
               image={photo.image}
               title={photo.title}
               format={photo.format}
               onClickModal={props.onClickModal}
            />
         ))}
      </div>
   );
}

export default PhotoList;