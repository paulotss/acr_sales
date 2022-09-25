import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Head from "../components/Head";
import ItemList from "../components/ItemList";
import { products, categories } from '../mocks/data';

const SearchCategory = () => {
  const [ items, setItems ] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const result = products.filter((prod) => prod.category === Number(id));
    setItems(result);
  }, [id]);

  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <h1 className="font-bold text-white text-xl">
          Categoria:
          {' '}
          <span className="font-bold">{ categories.find((cat) => cat.id === Number(id)).name }</span>
        </h1>
      </section>
      <section className="p-10">
        {
          items.map((product) => (
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

export default SearchCategory;