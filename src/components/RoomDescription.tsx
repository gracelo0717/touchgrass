import React from 'react';
import { useLocation } from 'react-router-dom';

interface Location {
  description: string;
}

const RoomDescription = () => {
  const location = useLocation();
  const { description } = location.state || { description: '' };

  console.log('Room Description State:', description);

  return (
    <div className='room-description'>
      <div className='room-description-content'>
        <h3>Room Description</h3>
        <p>{description ? description : 'No description available'}</p>
      </div>
    </div>
  );
};

export default RoomDescription;
