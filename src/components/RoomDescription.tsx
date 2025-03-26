import { useLocation, useNavigate } from 'react-router-dom';
import ObjectInspection from './ObjectInspection';

const RoomDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { description, objects } = location.state || {};

  const handleOnClick = (object: string) => {
    navigate(`/inspect/${object}`);
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
