import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../http";
import Footer from "../components/Footer";
import Head from "../components/Head";
import ItemList from "../components/ItemList";
import loading from "../media/loading.gif";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const result = await axios.get(`/search?term=${searchParams.get("term")}`);
      setProducts(result.data);
      setIsLoading(false);
    }
    getProducts();
  }, [searchParams]);

  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <h1 className="text-white text-xl">
          Buscando por:
          {' '}
          <span className="font-bold">{ searchParams.get("term") }</span>
        </h1>
      </section>
      {isLoading 
        ? <div className="w-full flex justify-center m-5">
            <img src={loading} alt="" className="place-self-center self-center" />
          </div>
        :  <>
            <section className="p-10">
              {
                products.map((product) => (
                  <ItemList
                    key={ product.id }
                    id={ product.id }
                    title={ product.title }
                    price={ product.price }
                    description={ product.description }
                    cover={ product.cover }
                  />  
                ))
              }
            </section>
            <Footer />
          </>
      }
    </main>
  );
};

export default SearchPage;