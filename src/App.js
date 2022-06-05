import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import { TasKManagerProvider } from './context/TaskManagerProvider';
import client from './graphql/apolloConfig';

const App = () => (
  <ApolloProvider client={client}>
    <TasKManagerProvider>
      <Router>
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </TasKManagerProvider>
  </ApolloProvider>
);

export default App;
