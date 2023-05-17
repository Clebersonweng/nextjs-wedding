import PhotoItem from './PhotoItem';

function PhotoList(props) {
   return (
      <div className="px-10 grid grid-cols-4 gap-4">
         {props.meetups.map((meetup) => (
            <PhotoItem
               key={meetup.id}
               id={meetup.id}
               image={meetup.image}
               title={meetup.title}
               address={meetup.address}
            />
         ))}
      </div>
   );
}

export default PhotoList;