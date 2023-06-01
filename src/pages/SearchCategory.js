import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Head from "../components/Head";
import ItemList from "../components/ItemList";
import axios from "../http";
import loading from "../media/loading.gif";

const SearchCategory = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const getProducts = async () => {
    setIsLoading(true);
    const result = await axios.get(`/products/${id}`);
    setProducts(result.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <main>
      <Head />
      { isLoading
        ? <div className="w-full h-64 flex justify-center">
            <img src={loading} alt="" className="place-self-center self-center" />
          </div>
        : <>
          <section className="p-10 bg-green-900">
            <h1 className="font-bold text-white text-xl">
              Categoria:
              {' '}
              <span className="font-bold">
                { products.length > 0 ? products[0].category.title : "" }
              </span>
            </h1>
          </section>
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

export default SearchCategory;