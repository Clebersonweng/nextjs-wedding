import PhotoItem from './PhotoItem';

function PhotoList(props) {
   return (
      <div className="px-10 grid grid-cols-4 gap-4">
         {props.photos.map((photo) => (
            <PhotoItem
               key={photo.id}
               id={photo.id}
               image={photo.image}
               title={photo.title}
               format={photo.format}
            />
         ))}
      </div>
   );
}

export default PhotoList;