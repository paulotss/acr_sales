import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Head from "../components/Head";
import ItemShow from "../components/ItemShow";
import { products } from "../mocks/data";

const ItemPage = () => {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const result = products.find((prod) => prod.id === Number(id));
    setItem(result);
  }, [id]);

  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <h1 className="text-white font-bold text-xl">
          { item.title }
        </h1>
      </section>
      <section className="p-10">
        {
          Object.values(item).length > 0 &&
          <ItemShow
            title={ item.title }
            price={ item.price }
            seller={ item.seller }
          />
        }
          
      </section>
      <Footer />
    </main>
  );
};

export default ItemPage;