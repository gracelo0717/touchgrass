import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Room {
  id: number;
  name: string;
}

const RoomSelection = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const roomOptions: Room[] = [
      { id: 1, name: 'Kitchen' },
      { id: 2, name: 'Bathroom' },
      { id: 3, name: 'Bedroom' },
      { id: 4, name: 'Living Room' },
      { id: 5, name: 'Basement' },
    ];
    setRooms(roomOptions);
  }, []);

  return (
    <div className='room-selection'>
      <h2>Select a Room:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='button-container'>
          <button className='room-button'>
            <span>Kitchen</span>
          </button>
          <button className='room-button'>
            <span>Bathroom</span>
          </button>
          <button className='room-button'>
            <span>Bedroom</span>
          </button>
          <button className='room-button'>
            <span>Living Room</span>
          </button>
          <button className='room-button'>
            <span>Basement</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomSelection;
