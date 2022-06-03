import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import { TasKManagerProvider } from './context/TaskManagerProvider';

const App = () => {
  return (
    <TasKManagerProvider>
      <Router>
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </TasKManagerProvider>
  );
};

export default App;
