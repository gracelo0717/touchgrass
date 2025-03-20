import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/room-selection');
  };

  return (
    <div className='welcome'>
      <h1>Escape Room: Touch Grass</h1>
      <p>
        Ready to escape? Start by choosing a room and let the story take you
        away!
      </p>
      <button onClick={handleOnClick}>START GAME</button>
    </div>
  );
};

export default Welcome;
