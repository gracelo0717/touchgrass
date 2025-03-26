import { useParams } from 'react-router-dom';

const ObjectInspection = () => {
  const { object } = useParams();

  return (
    <div className='inspection'>
      <h4>Inspecting {object}</h4>
    </div>
  );
};

export default ObjectInspection;
