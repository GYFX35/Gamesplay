import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StreamView from './pages/StreamView';
import Extension from './pages/Extension';
import DNSSetup from './pages/DNSSetup';
import PlatformURL from './pages/PlatformURL';
import GameCreator from './pages/GameCreator';
import Entertainment from './pages/Entertainment';
import Shop from './pages/Shop';
import Sports from './pages/Sports';
import Monetization from './pages/Monetization';
import Forums from './pages/Forums';
import Challenges from './pages/Challenges';
import Predictions from './pages/Predictions';
import Casino from './pages/Casino';
import AIContentCreator from './pages/AIContentCreator';
import Games from './pages/Games';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stream/:id" element={<StreamView />} />
        <Route path="/browse" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/create" element={<GameCreator />} />
        <Route path="/extension" element={<Extension />} />
        <Route path="/setup-dns" element={<DNSSetup />} />
        <Route path="/platform-url" element={<PlatformURL />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/monetization" element={<Monetization />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/casino" element={<Casino />} />
        <Route path="/ai-creator" element={<AIContentCreator />} />
      </Routes>
    </Router>
  );
}

export default App;
