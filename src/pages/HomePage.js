import { useContext, useEffect, useState } from "react";
import Head from "../components/Head";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import ItemDisplay from "../components/ItemDisplay";
import Footer from "../components/Footer";
import { categories } from "../mocks/data";
import AppContext from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { search } = useContext(AppContext);
  const navigate = useNavigate();

  const getProducts = async () => {
    const result = await axios.get("http://localhost:3001/products");
    setProducts(result.data);
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <article>
          <SearchBar />
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
        <article className="flex justify-center mt-10 overflow-x-auto">
          {
            categories.map((category) => (
              <Category key={ category.id } name={ category.name } id={ category.id } />
            ))
          }
        </article>
        <article className="flex justify-start bg-white p-10 mt-10 overflow-x-auto">
          {
            products.map((product) => (
              <ItemDisplay key={ product.id } id={ product.id } title={ product.title } price={ product.price } />
            ))
          }
        </article>
      </section>
      <Footer />
    </main>
  )
}

export default HomePage;