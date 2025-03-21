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

  const handleRoomSelect = async (roomId: number) => {
    setLoading(true);

    try {
      const roomName = rooms.find((room) => room.id === roomId)?.name;
      if (!roomName) {
        return;
      }

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant in a virtual escape room game.',
            },
            {
              role: 'user',
              content: `You are in a ${roomName} in a house. Describe the room in fun, engaging, and detailed sentences. Limit the description to a maximum of 100 tokens and make sure the description is complete without fragments or incomplete sentences. Mention 3 key objects the player can interact with that can be further investigated. For example, for a bedroom, it could be a bookshelf, drawers, or something under the bed.`,
            },
          ],
          max_tokens: 125,
          temperature: 0.3,
        },
        {
          headers: {
            Authorization:
              'Bearer ' + `${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response:', response);
      if (
        response.data?.choices?.length > 0 &&
        response.data.choices[0].message?.content
      ) {
        const roomDescription = response.data.choices[0].message.content.trim();
        navigate('/room-description', {
          state: { description: roomDescription },
        });
      } else {
        console.error('No valid choices or content found in API response');
      }
    } catch (error) {
      console.error('Error fetching room description:', error);
    }

    setLoading(false);
  };

  return (
    <div className='room-selection'>
      <h2>Select a Room:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='button-container'>
          <button className='room-button' onClick={() => handleRoomSelect(1)}>
            <span>Kitchen</span>
          </button>
          <button className='room-button' onClick={() => handleRoomSelect(2)}>
            <span>Bathroom</span>
          </button>
          <button className='room-button' onClick={() => handleRoomSelect(3)}>
            <span>Bedroom</span>
          </button>
          <button className='room-button' onClick={() => handleRoomSelect(4)}>
            <span>Living Room</span>
          </button>
          <button className='room-button' onClick={() => handleRoomSelect(5)}>
            <span>Basement</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomSelection;
