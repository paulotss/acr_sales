import { useContext } from 'react';
import { MagnifyingGlassIcon } from  '@heroicons/react/24/outline';
import AppContext from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = (props) => {
  const { products } = props;
  const { search, setSearch } = useContext(AppContext);
  const navigate = useNavigate();

  const searchProducts = ({ target }) => {
    const { value } = target;
    const regex = RegExp(value, 'i')
    const results = products.filter((product) => product.title.match(regex) && value !== "");
    setSearch((state) => ({
      ...state,
      term: value,
      results,
    }));
  };

  return (
    <section className="flex w-full">
      <input
        type="text"
        placeholder="Estou procurando por..."
        className="p-2 w-full outline-none border-2 border-white focus:border-gray-300"
        value={ search.term }
        onChange={ searchProducts }
      />
      <button
        className="p-2 bg-gray-300"
        onClick={() => navigate('/search')}
      >
        <MagnifyingGlassIcon className='h-6 w-6 text-green-900' />
      </button>
    </section>
  );
}

export default SearchBar;