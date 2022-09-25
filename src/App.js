import { BrowserRouter, BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SearchCategory from './pages/SearchCategory';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/search' element={ <SearchPage /> } />
        <Route path='/search/:id' element={ <SearchCategory /> } />
        <Route path='/' element={ <HomePage /> }  />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
