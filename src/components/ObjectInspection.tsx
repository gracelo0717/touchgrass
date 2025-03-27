import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ObjectInspection = () => {
  const { object } = useParams();

  const [riddle, setRiddle] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRiddle('Input Riddle about Object or Room...');
      setLoading(false);
    }, 1000);
  }, [object]);

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
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder='Enter your Answer'
          />
        </>
      )}
    </div>
  );
};

export default ObjectInspection;
