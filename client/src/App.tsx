import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StreamView from './pages/StreamView';
import Extension from './pages/Extension';
import DNSSetup from './pages/DNSSetup';
import PlatformURL from './pages/PlatformURL';
import GameCreator from './pages/GameCreator';
import Entertainment from './pages/Entertainment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stream/:id" element={<StreamView />} />
        <Route path="/browse" element={<Home />} />
        <Route path="/create" element={<GameCreator />} />
        <Route path="/extension" element={<Extension />} />
        <Route path="/setup-dns" element={<DNSSetup />} />
        <Route path="/platform-url" element={<PlatformURL />} />
        <Route path="/entertainment" element={<Entertainment />} />
      </Routes>
    </Router>
  );
}

export default App;
