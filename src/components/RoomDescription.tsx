import { useLocation } from 'react-router-dom';

const RoomDescription = () => {
  const location = useLocation();
  const { description, objects } = location.state || {};

  const handleOnClick = (object: string) => {
    console.log(`Inspect this ${object}`);
  };

  return (
    <div className='room-description'>
      <h3>Room Description</h3>
      <p>{description}</p>

      <div className='objects'>
        <h4>Objects to Inspect:</h4>
        <div className='button-container'>
          {objects && objects.length > 0 ? (
            objects.map((object: string, index: number) => (
              <button key={index} onClick={() => handleOnClick(object)}>
                Inspect {object}
              </button>
            ))
          ) : (
            <p>No objects available to inspect.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDescription;
