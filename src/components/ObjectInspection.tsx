import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ObjectInspection = () => {
  const { object } = useParams();
  const navigate = useNavigate();

  const [riddle, setRiddle] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRiddle('Input Riddle about Object or Room...');
      setLoading(false);
    }, 1000);
  }, [object]);

  const handleSubmit = () => {
    if (userAnswer.trim().toLowerCase() === answer.trim().toLowerCase()) {
      setIsCorrect(true);
      setTimeout(() => {
        console.log('navigate to the next room');
        navigate(`/next-room`);
      }, 1000);
    } else {
      setIsCorrect(false);
      setErrorMessage('Incorrect answer. Please try again.');
    }
  };

  return (
    <div className='inspection'>
      <h4>Inspecting {object}</h4>

      {loading ? (
        <p>Loading riddle...</p>
      ) : (
        <>
          <p>{riddle}</p>
          <input
            type='text'
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder='Enter your Answer'
          />
          <button onClick={handleSubmit}>Submit</button>
          {!isCorrect && errorMessage && <p>{errorMessage}</p>}{' '}
        </>
      )}
    </div>
  );
};

export default ObjectInspection;
