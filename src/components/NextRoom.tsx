import { useNavigate } from 'react-router-dom';

const NextRoom = () => {
  const navigate = useNavigate();

  return (
    <div className='next-room'>
      <h2>Congrats!</h2>
      <p>
        You've successfully solved the riddle, you can proceed to the next room!
      </p>
      <button onClick={() => navigate('/next-step')}>
        Proceed to Next Step
      </button>
    </div>
  );
};

export default NextRoom;
