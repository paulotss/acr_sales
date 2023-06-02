import { useState } from 'react';
import { MagnifyingGlassIcon } from  '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`search/?term=${search}`);
  }

  return (
    <form onSubmit={ handleSubmit } className="flex w-full">
      <input
        type="text"
        placeholder="Estou procurando por..."
        className="p-2 w-full outline-none border-2 border-white focus:border-gray-300"
        value={ search }
        onChange={ handleChange }
      />
      <button
        type="submit"
        className="p-2 bg-gray-300"
      >
        <MagnifyingGlassIcon className='h-6 w-6 text-green-900' />
      </button>
    </form>
  );
}

export default SearchBar;