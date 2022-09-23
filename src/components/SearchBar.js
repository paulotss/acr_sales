import { useContext } from 'react';
import { MagnifyingGlassIcon } from  '@heroicons/react/24/outline';
import AppContext from '../contexts/AppContext';
import { products } from '../mocks/data';

const SearchBar = () => {
  const { search, setSearch } = useContext(AppContext);

  const serachProducts = ({ target }) => {
    const { value } = target;
    const results = products.filter((product) => product.title.includes(value) && value !== "");
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
        onChange={ serachProducts }
      />
      <button className="p-2 bg-gray-300">
        <MagnifyingGlassIcon className='h-6 w-6 text-green-900' />
      </button>
    </section>
  );
}

export default SearchBar;