import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StreamView from './pages/StreamView';
import Extension from './pages/Extension';
import DNSSetup from './pages/DNSSetup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stream/:id" element={<StreamView />} />
        <Route path="/browse" element={<Home />} />
        <Route path="/extension" element={<Extension />} />
        <Route path="/setup-dns" element={<DNSSetup />} />
      </Routes>
    </Router>
  );
}

export default App;
