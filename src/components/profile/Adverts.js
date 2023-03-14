import { useState, useEffect, useContext } from "react";
import ItemProfile from "../ItemProfile";
import axios from "axios";
import { Link } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

const Adverts = () => {
  const [products, setProducts] = useState([]);
  const { setActProfile } = useContext(AppContext);

  const getProducts = async () => {
    const result = await axios.get("http://localhost:3001/products");
    setProducts(result.data);
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <section>
      <article className="flex justify-between mb-5">
        <h1 className="text-green-900 font-bold text-2xl">Anúncios</h1>
        <button
          type="button"
          className="font-bold w-10 h-10 rounded-full flex justify-center items-center bg-green-900"
          onClick={ () => setActProfile(3) }
        >
          <span className="text-white text-2xl">+</span>
        </button>
      </article>
      <article>
        {
          products.map((product) => (
            <ItemProfile
              key={ product.id }
              id={ product.id }
              title={ product.title }
              cover={ product.cover }
            />
          ))
        }
      </article>
    </section>
  )
}

export default Adverts;