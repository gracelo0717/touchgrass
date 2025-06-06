import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import RoomSelection from './components/RoomSelection';
import RoomDescription from './components/RoomDescription';
import ObjectInspection from './components/ObjectInspection';
import NextRoom from './components/NextRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/room-selection' element={<RoomSelection />} />
        <Route path='/room-description' element={<RoomDescription />} />
        <Route path='/inspect/:object' element={<ObjectInspection />} />
        <Route path='/next-room' element={<NextRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
