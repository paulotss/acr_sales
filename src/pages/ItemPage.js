import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Head from "../components/Head";
import ItemShow from "../components/ItemShow";
import axios from "../http";

const ItemPage = () => {
  const [product, setProduct] = useState({});
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { id } = useParams();

  const getProduct = async () => {
    const result = await axios.get(`/product/${id}`);
    setProduct(result.data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <h1 className="text-white font-bold text-xl">
          { product.title }
        </h1>
      </section>
      <section className="md:p-10 p-2">
        {
          Object.values(product).length > 0 &&
          <ItemShow
            userId={ product.user.id }
            productId={ product.id }
            title={ product.title }
            price={ product.price }
            amount={ product.amount }
            description={ product.description }
            cover={ product.cover }
            userName={ `${product.user.firstName} ${product.user.lastName}` }
            userEmail={ product.user.email }
          />
        }
      </section>
      <Footer />
    </main>
  );
};

export default ItemPage;