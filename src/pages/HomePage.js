import { useContext, useEffect, useState } from "react";
import Head from "../components/Head";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import ItemDisplay from "../components/ItemDisplay";
import Footer from "../components/Footer";
import AppContext from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "../http";
import loading from "../media/loading.gif";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useContext(AppContext);
  const navigate = useNavigate();

  const getProducts = async () => {
    setIsLoading(true);
    const result = await axios.get("/products?limit=16");
    setProducts(result.data);
    setIsLoading(false)
  }

  const getCategories = async () => {
    const result = await axios.get("/categories");
    setCategories(result.data);
  }

  useEffect(() => {
    getProducts();
    getCategories();
  }, [])

  return (
    <main>
      <Head />
      <section className="md:p-10 pt-10 bg-green-900">
        <article>
          <SearchBar products={products} />
        </article>
        {
          search.results.length > 0 &&
          <article className="pl-10 pr-10 w-full z-10 bg-green-900 absolute left-0 top-40">
            <div className="bg-white">
              {
                search.results.map((item) => (
                  <button
                    key={ item.id }
                    onClick={ () => navigate(`/item/${item.id}`) }
                    className="block w-full text-left text-sm p-4 cursor-pointer hover:bg-gray-300"
                  >
                    { item.title }
                  </button>
                ))
              }
            </div>
          </article>
        }
        <article className="flex md:justify-center mt-10 overflow-x-auto">
          {
            categories.map((category) => (
              <Category
                key={ category.id }
                title={ category.title }
                urlImage={ category.image }
                id={ category.id }
              />
            ))
          }
        </article>
        <article className="flex flex-wrap bg-white md:p-10 mt-10 justify-around md:justify-around md:rounded-lg">
          { isLoading
            ? <div className="w-full flex justify-center">
                <img src={loading} alt="" className="place-self-center self-center" />
              </div>
            :  products.map((product) => (
                <ItemDisplay
                  key={ product.id }
                  id={ product.id }
                  title={ product.title }
                  price={ product.price }
                  cover={ product.cover }
                />
              ))
          }
        </article>
      </section>
      <Footer />
    </main>
  )
}

export default HomePage;