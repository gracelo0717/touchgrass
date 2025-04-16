import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ObjectInspection = () => {
  const { object } = useParams();
  const navigate = useNavigate();

  const [riddle, setRiddle] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchRiddle = async () => {
      setLoading(true);

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content:
                  'You are an assistant in an escape room game, generating riddles or puzzles for players.',
              },
              {
                role: 'user',
                content: `Generate a short riddle or puzzle related to a ${object} that involves its characteristics, usage, or context within the room, but do not directly reference the object. The player must solve the riddle to proceed. Provide the riddle and its solution in a "Solution:" format.`,
              },
            ],
            max_tokens: 100,
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

        const riddleText = response.data?.choices[0]?.message?.content?.trim();
      } catch (error) {
        console.error('Error fetching riddle from OpenAI:', error);
      }

      setLoading(false);
    };

    fetchRiddle();
  }, [object]);

  const handleSubmit = () => {
    if (
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
    ) {
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
