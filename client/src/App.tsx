import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StreamView from './pages/StreamView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stream/:id" element={<StreamView />} />
        <Route path="/browse" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
