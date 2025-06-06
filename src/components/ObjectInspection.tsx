import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ObjectInspection = () => {
  const { object } = useParams();
  const location = useLocation();
  const { description, objects } = location.state || {};
  const navigate = useNavigate();

  const maxAttempts = 4;

  const [riddle, setRiddle] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [hint, setHint] = useState<string>('');

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
        if (riddleText) {
          const [riddlePart, solutionPart] = riddleText.split(/Solution:/i);

          setRiddle(riddlePart?.trim() || 'No riddle found.');
          setCorrectAnswer(solutionPart?.trim() || '');
        }
      } catch (error) {
        console.error('Error fetching riddle from OpenAI:', error);
      }

      setLoading(false);
    };

    fetchRiddle();
  }, [object]);

  const fetchHint = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are an assistant in an escape room game, helping players who are stuck.',
            },
            {
              role: 'user',
              content: `Give a short and simple hint for this riddle: "${riddle}". The answer is "${correctAnswer}". Don't give away the answer but guide the player toward it. Make sure there are no incomplete sentences.`,
            },
          ],
          max_tokens: 50,
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
      const hintText = response.data?.choices[0]?.message?.content?.trim();
      setHint(hintText || 'No hint available.');
    } catch (error) {
      console.error('Error fetching hint:', error);
    }
  };

  const handleSubmit = () => {
    const answer = userAnswer.trim().toLowerCase();
    const solution = correctAnswer.trim().toLowerCase();

    if (!answer) {
      setErrorMessage('Please enter an answer before submitting!');
      return;
    }

    if (answer === solution) {
      setIsCorrect(true);

      const solved = JSON.parse(localStorage.getItem('solved') || '[]');
      const updated = [...new Set([...solved, object])];
      localStorage.setItem('solved', JSON.stringify(updated));

      const allSolved = objects.every((obj: string) => updated.includes(obj));
      if (allSolved) {
        const completedRooms = JSON.parse(
          localStorage.getItem('completedRooms') || '[]'
        );
        const currentRoom = localStorage.getItem('currentRoom');

        if (currentRoom && !completedRooms.includes(currentRoom)) {
          completedRooms.push(currentRoom);
          localStorage.setItem(
            'completedRooms',
            JSON.stringify(completedRooms)
          );
        }
      }

      setTimeout(() => {
        navigate('/next-room');
      }, 1000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setIsCorrect(false);
      setErrorMessage('Incorrect answer. Please try again.');

      if (newAttempts === 3 && !hint) {
        fetchHint();
      }

      if (newAttempts >= maxAttempts) {
        setErrorMessage(`The correct answer was: "${correctAnswer}".`);
      } else {
        setErrorMessage('Incorrect answer. Please try again.');
      }
    }
  };

  return (
    <div className='inspection'>
      <h4>Inspecting {object}</h4>

      {loading ? (
        <p>Loading riddle...</p>
      ) : (
        <>
          <p className='riddle-text'>{riddle}</p>
          <input
            type='text'
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder='Enter your Answer'
            disabled={attempts >= maxAttempts || isCorrect}
          />
          <button
            onClick={handleSubmit}
            disabled={attempts >= maxAttempts || isCorrect}
          >
            Submit
          </button>
          {attempts < 3 && !isCorrect && (
            <p className='attempts-left'>
              You have {3 - attempts} attempt
              {3 - attempts !== 1 ? 's' : ''} remaining before hint.
            </p>
          )}
          {attempts === 3 && hint && !isCorrect && (
            <div className='hint'>
              <p>
                <strong>Hint:</strong> {hint}
              </p>
            </div>
          )}
          {attempts >= maxAttempts && !isCorrect && (
            <div>
              <p>
                You've used all attempts. The correct answer was:
                <strong>{correctAnswer}</strong>.
              </p>
              <button
                onClick={() =>
                  navigate('/next-room', {
                    state: {
                      description,
                      objects: objects.filter((obj: string) => obj !== object),
                    },
                  })
                }
              >
                Try another object
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ObjectInspection;
