import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import RoomSelection from './components/RoomSelection';
import RoomDescription from './components/RoomDescription';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/room-selection' element={<RoomSelection />} />
        <Route path='/room-description' element={<RoomDescription />} />
      </Routes>
    </Router>
  );
}

export default App;
