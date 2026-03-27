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
        <Route path="/shop" element={<Shop />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/monetization" element={<Monetization />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/challenges" element={<Challenges />} />
      </Routes>
    </Router>
  );
}

export default App;
