import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/search' element={ <SearchPage /> } />
        <Route path='/' element={ <HomePage /> }  />
      </Routes>
    </Router>
  );
};

export default App;
