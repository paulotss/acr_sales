import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SearchCategory from './pages/SearchCategory';
import ItemPage from './pages/ItemPage';
import Login from './pages/Login';
import NewUserForm from './pages/NewUserForm';
import ProfilePersonalData from './pages/Profile/ProfilePersonalData';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/search' element={ <SearchPage /> } />
        <Route path='/search/:id' element={ <SearchCategory /> } />
        <Route path='/item/:id' element={ <ItemPage /> } />
        <Route path='/profile' element={ <ProfilePersonalData /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <NewUserForm /> } />
        <Route path='/' element={ <HomePage /> }  />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
