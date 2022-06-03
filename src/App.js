import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
