import { useContext } from "react";
import Footer from "../components/Footer";
import Head from "../components/Head";
import ItemList from "../components/ItemList";
import AppContext from "../contexts/AppContext";

const SearchPage = () => {
  const { search } = useContext(AppContext);

  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <h1 className="text-white text-xl">
          Buscando por:
          {' '}
          <span className="font-bold">{ search.term }</span>
        </h1>
      </section>
      <section className="p-10">
        {
          search.results.map((product) => (
            <ItemList
              key={ product.id }
              id={ product.id }
              title={ product.title }
              price={ product.price }
              description={ product.description }
            />  
          ))
        }
      </section>
      <Footer />
    </main>
  );
};

export default SearchPage;